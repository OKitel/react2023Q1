import { rest } from 'msw';
import { resList, resPhoto } from './res';

export const handlers = [
  rest.get('https://api.unsplash.com/search/photos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resList));
  }),
  rest.get('https://api.unsplash.com/photos/ZJIwrGrQb2Y', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resPhoto));
  }),
];
