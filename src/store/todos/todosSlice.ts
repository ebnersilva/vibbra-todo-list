import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITodoBody {
  task: string;
  subTask: string;
}

export interface ITodo extends ITodoBody {
  id: string;
}

interface TodoState {
  data: ITodo[];
}

const initialState: TodoState = {
  data: []
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    setData(state, action: PayloadAction<ITodo[]>) {
      state.data = action.payload;
    }
  }
});


export const { setData } = todosSlice.actions;

export default todosSlice.reducer

