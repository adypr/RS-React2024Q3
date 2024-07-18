import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { api } from '../services/api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools:
    process.env.NODE_ENV !== 'production'
      ? {
          name: 'MyAstonomicalStore',
          trace: true,
          traceLimit: 25,
        }
      : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
