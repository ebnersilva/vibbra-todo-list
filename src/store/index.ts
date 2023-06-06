import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/appSlice';
import counterReducer from './counter/counterSlice';
import todosSlice from './todos/todosSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    todos: todosSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch