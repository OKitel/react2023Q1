import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

server.printHandlers();

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
