import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorage } from '@/features/helpers';
import type { AuthUserType } from './types';

interface AuthState {
  user: string | null;
  isSigned: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: getLocalStorage<AuthUserType>('auth')?.login || null,
  isSigned: !!getLocalStorage<AuthUserType>('auth'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUserType>) => {
      state.user = action.payload.login;
      state.isSigned = true;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isSigned = false;
      localStorage.removeItem('auth');
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
