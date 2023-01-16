import { createSlice } from '@reduxjs/toolkit';
import {
  getUserOp,
  loginUserOp,
  logoutUserOp,
  registerUserOp,
} from './authOps';

const setPendingRoutines = state => {
  state.isLoading = true;
  state.error = '';
};

const setErrorRoutines = (state, { payload }) => {
  state.isLoading = false;
  state.isLogged = false;
  state.error = payload;
  state.token = '';
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
      .addCase(registerUserOp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = payload;
        state.token = '';
      })
      .addCase(registerUserOp.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.name = payload.user.name;
        state.email = payload.user.email;
        state.isLoading = false;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(loginUserOp.pending, setPendingRoutines)
      .addCase(
        loginUserOp.rejected,
        (state, { payload: { serverErrorMsg } }) => {
          state.isLoading = false;
          state.isLogged = false;
          state.error = serverErrorMsg;
          state.token = '';
        }
      )
      .addCase(loginUserOp.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.name = payload.user.name;
        state.email = payload.user.email;
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
