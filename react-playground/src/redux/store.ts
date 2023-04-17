import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { homeReducer } from './home/reducers';
import { formReducer } from './form/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  form: formReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware);
    },
  });
};
// export const store = configureStore({
//   reducer: {
//     home: homeReducer,
//     form: formReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(apiSlice.middleware);
//   },
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
