import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorage } from '@/features/helpers';
import type { AuthUserType } from './types';

type UserType = {
  login: string | null;
  tokens: number;
};

interface AuthState {
  user: UserType;
  isSigned: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    login: getLocalStorage<AuthUserType>('auth')?.login || null,
    tokens: Number(getLocalStorage<string>('tokens')) || 9012,
  },
  isSigned: !!getLocalStorage<AuthUserType>('auth'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUserType>) => {
      state.user.login = action.payload.login;
      state.isSigned = true;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user.login = null;
      state.isSigned = false;
      localStorage.removeItem('auth');
    },
    subtractTokens: (state, action: PayloadAction<number>) => {
      state.user.tokens = state.user.tokens - action.payload;
      localStorage.setItem('tokens', JSON.stringify(state.user.tokens));
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, subtractTokens, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
