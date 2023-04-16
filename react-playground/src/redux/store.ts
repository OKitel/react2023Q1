import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { homeReducer } from './home/reducers';
import { formReducer } from './form/reducers';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    form: formReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
