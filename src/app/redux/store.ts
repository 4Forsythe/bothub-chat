import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import authReducer from '@/entities/auth/slice';
import sidebarReducer from '@/entities/sidebar/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
