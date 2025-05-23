import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
