import { createSlice } from '@reduxjs/toolkit';

export interface IApp  {
  isSidebarOpened: boolean;
  isAddTodoModalOpened: boolean;
  isAddSubTodoModalOpened: boolean;
}

interface TodoState {
  data: IApp;
}

const initialState: TodoState = {
  data: {
    isSidebarOpened: false,
    isAddTodoModalOpened: false,
    isAddSubTodoModalOpened: false
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

    toggleAddSubTodoModalOpened(state) {
      state.data.isAddSubTodoModalOpened = !state.data.isAddSubTodoModalOpened;
    },
  }
});


export const { toggleSidebar, toggleAddTodoModalOpened, toggleAddSubTodoModalOpened } = appSlice.actions;

export default appSlice.reducer

