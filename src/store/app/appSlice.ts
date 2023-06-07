import { createSlice } from '@reduxjs/toolkit';

export interface IApp  {
  isSidebarOpened: boolean;
  isAddTodoModalOpened: boolean;
}

interface TodoState {
  data: IApp;
}

const initialState: TodoState = {
  data: {
    isSidebarOpened: false,
    isAddTodoModalOpened: false,
  }
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    toggleSidebar(state) {
      state.data.isSidebarOpened = !state.data.isSidebarOpened;
    },
    toggleAddTodoModalOpened(state) {
      state.data.isAddTodoModalOpened = !state.data.isAddTodoModalOpened;
    },
  }
});


export const { toggleSidebar, toggleAddTodoModalOpened } = appSlice.actions;

export default appSlice.reducer

