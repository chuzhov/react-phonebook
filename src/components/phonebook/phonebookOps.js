import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSnackbar } from 'components/snackbar/snackbarOps';

//axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const addContactOp = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.post(
        'https://connections-api.herokuapp.com/contacts',
        contact
      );
      thunkAPI.dispatch(
        setSnackbar(
          true,
          'success',
          `Contact ${contact.name} is successfully added`
        )
      );
      return data;
    } catch (error) {
      thunkAPI.dispatch(
        setSnackbar(true, 'error', `Failed. Server responce: ${error.message}`)
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchContactsOp = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        'https://connections-api.herokuapp.com/contacts/'
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContactOp = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${id}`
      );
      thunkAPI.dispatch(
        setSnackbar(
          true,
          'success',
          `Contact ${contact.name} is successfully deleted`
        )
      );
      return data;
    } catch (error) {
      thunkAPI.dispatch(
        setSnackbar(true, 'error', `Failed. Server responce: ${error.message}`)
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);
