// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: any;
  password: string;
}

const initialState: AuthState = {
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearCredentials: (state) => {
      state.email = '';
      state.password = '';
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
