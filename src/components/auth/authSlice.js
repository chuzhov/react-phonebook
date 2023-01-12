import { createSlice } from '@reduxjs/toolkit';
import {
  getUserOp,
  loginUserOp,
  logoutUserOp,
  registerUserOp,
} from './authOps';

const setPendingRoutines = state => {
  state.isLoading = true;
};

const setErrorRoutines = (state, { payload }) => {
  state.isLoading = false;
  state.isLogged = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    isLoading: false,
    error: null,
    name: '',
    email: '',
    token: '',
  },
  extraReducers: builder => {
    builder
      .addCase(registerUserOp.pending, setPendingRoutines)
      .addCase(registerUserOp.rejected, setErrorRoutines)
      .addCase(registerUserOp.fulfilled, (state, responce) => {
        state.token = responce.payload.token;
        state.name = responce.payload.user.name;
        state.email = responce.payload.user.email;
        state.isLoading = false;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(loginUserOp.pending, setPendingRoutines)
      .addCase(loginUserOp.rejected, setErrorRoutines)
      .addCase(loginUserOp.fulfilled, (state, responce) => {
        state.token = responce.payload.token;
        state.name = responce.payload.user.name;
        state.email = responce.payload.user.email;
        state.isLoading = false;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(getUserOp.pending, setPendingRoutines)
      .addCase(getUserOp.rejected, setErrorRoutines)
      .addCase(getUserOp.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(logoutUserOp.pending, setPendingRoutines)
      .addCase(logoutUserOp.rejected, setErrorRoutines)
      .addCase(logoutUserOp.fulfilled, state => {
        state.token = '';
        state.name = '';
        state.email = '';
        state.isLoading = false;
        state.isLogged = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
