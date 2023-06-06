import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IApp  {
  isSidebarOpened: boolean;
}

interface TodoState {
  data: IApp;
}

const initialState: TodoState = {
  data: {
    isSidebarOpened: true
  }
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    toggleSidebar(state) {
      state.data.isSidebarOpened = !state.data.isSidebarOpened;
    }
  }
});


export const { toggleSidebar } = appSlice.actions;

export default appSlice.reducer

