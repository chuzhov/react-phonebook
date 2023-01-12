import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `https://connections-api.herokuapp.com/users`;
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/users';

export const registerUserOp = createAsyncThunk(
  'auth/RegisterUser',
  async ({ email, password, name }, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL + `/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUserOp = createAsyncThunk(
  'auth/LoginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL + `/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserOp = createAsyncThunk(
  'auth/GetUser',
  async (_, { getState, thunkAPI }) => {
    try {
      const {
        auth: { token },
      } = getState();

      if (!token) {
        return thunkAPI.rejectWithValue();
      }

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
      await axios.post(`/logout`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
