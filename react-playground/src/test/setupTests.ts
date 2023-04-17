import 'whatwg-fetch';
import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupStore } from '../redux/store';
import { apiSlice } from '../redux/api';

const store = setupStore({});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());
