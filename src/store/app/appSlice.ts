import { createSlice } from '@reduxjs/toolkit';

export interface IApp  {
  isSidebarOpened: boolean;
  isAddTodoModalOpened: boolean;
  isViewTodoModalOpened: boolean;
}

interface TodoState {
  data: IApp;
}

const initialState: TodoState = {
  data: {
    isSidebarOpened: true,
    isAddTodoModalOpened: false,
    isViewTodoModalOpened: false,
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
    toggleViewTodoModalOpened(state) {
      state.data.isViewTodoModalOpened = !state.data.isViewTodoModalOpened;
    }
  }
});


export const { toggleSidebar, toggleAddTodoModalOpened, toggleViewTodoModalOpened } = appSlice.actions;

export default appSlice.reducer

