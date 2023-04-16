import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { photosReducer } from './reducers';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
