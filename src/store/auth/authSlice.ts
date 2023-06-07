import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IUserLoggedIn {
  uid: string;
  email: string;
}
export interface PayloadSetUserLoggedIn {
  data: IUserLoggedIn | null;
}
export interface IAuth {
  userLoggedIn: IUserLoggedIn | null;
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

