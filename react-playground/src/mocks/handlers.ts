import 'whatwg-fetch';
import { rest } from 'msw';
import { resList, resPhoto } from './res';

export const handlers = [
  rest.get('http://localhost:5173/api/search/photos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resList));
  }),
  rest.get('http://localhost:5173/api/photos/ZJIwrGrQb2Y', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resPhoto));
  }),
];
