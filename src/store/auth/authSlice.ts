import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface PayloadSetUserLoggedIn {
  data: User | null;
}

export interface IAuth {
  userLoggedIn: User | null;
  isAuthChecked: boolean;
}

interface TodoState {
  data: IAuth;
}

const initialState: TodoState = {
  data: {
    userLoggedIn: null,
    isAuthChecked: false,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUserLoggedIn(state, action: PayloadAction<PayloadSetUserLoggedIn>) {
      state.data.userLoggedIn = action.payload.data;
    },
    setIsAuthChecked(state, action: PayloadAction<boolean>) {
      state.data.isAuthChecked = action.payload;
    },
  }
});


export const { setUserLoggedIn, setIsAuthChecked } = authSlice.actions;

export default authSlice.reducer

