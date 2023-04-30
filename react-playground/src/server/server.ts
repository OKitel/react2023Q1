import express from 'express';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.VITE_SERVER_PORT || 8080;

const createServer = async () => {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const template = fs.readFileSync(path.resolve(__dirname, '../..', 'index.html'), 'utf-8');
      const transformedIndex = await vite.transformIndexHtml(url, template);
      const [start, end] = transformedIndex.split('<div id="root"></div>');
      const { render } = await vite.ssrLoadModule('/src/server/entry-server.tsx');

      const { pipe } = await render(url, {
        onShellReady() {
          res.statusCode = 200;
          res.setHeader('Content-type', 'text/html');
          res.write(start);
          res.write('<div id="root">');
          pipe(res);
        },
        onAllReady() {
          res.write('</div>');
          res.write(end);
          res.end();
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

createServer();
