import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSnackbar } from 'components/snackbar/snackbarOps';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/users';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUserOp = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const { data } = await axios.post('/signup', newUser);
      token.set(data.token);
      return data;
    } catch (error) {
      thunkAPI.dispatch(
        setSnackbar(true, 'error', `Failed. Server responce: ${error.message}.`)
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserOp = createAsyncThunk(
  'auth/logIn',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post('/login', user);
      token.set(data.token);
      return data;
    } catch (error) {
      const errorCode = error?.response?.status;
      const serverErrorMsg = error?.response?.statusText;
      thunkAPI.dispatch(
        setSnackbar(
          true,
          'error',
          `Failed. Server responce: ${serverErrorMsg}. Error code: ${errorCode}`
        )
      );
      //saving error in auth.state for possible additional handling
      return thunkAPI.rejectWithValue({ serverErrorMsg });
    }
  }
);

export const getUserOp = createAsyncThunk(
  'auth/GetUser',
  async (_, thunkAPI) => {
    try {
      const presistedToken = thunkAPI.getState().auth.token;

      if (!presistedToken) {
        return thunkAPI.rejectWithValue();
      }

      token.set(presistedToken);
      const { data } = await axios.get(`/current`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUserOp = createAsyncThunk(
  'auth/LogOut',
  async (_, thunkAPI) => {
    try {
      token.set(thunkAPI.getState().auth.token);
      await axios.post(`/logout`);
      token.unset();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
