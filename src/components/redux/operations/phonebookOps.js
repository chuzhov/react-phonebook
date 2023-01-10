import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://63bc64f0fa38d30d85c6cc3f.mockapi.io/api/v1/';

export const addContactOp = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await fetch(
        'https://63bc64f0fa38d30d85c6cc3f.mockapi.io/api/v1/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        }
      );
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchContactsOp = createAsyncThunk(
  'contacts/fetchContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await fetch(
        'https://63bc64f0fa38d30d85c6cc3f.mockapi.io/api/v1/contacts'
      );
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactOp = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const data = await fetch(
        `https://63bc64f0fa38d30d85c6cc3f.mockapi.io/api/v1/contacts/` + id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await data.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContactOp = createAsyncThunk(
  'contacts/udateContact(isFavorite)',
  async ({ id, isFavorite }, thunkAPI) => {
    const contacts = thunkAPI.getState().phonebook.contacts.items;
    const index = contacts.findIndex(contact => contact.id === id);

    try {
      const data = await fetch(
        `https://63bc64f0fa38d30d85c6cc3f.mockapi.io/api/v1/contacts/` + id,
        {
          method: 'PUT', //mockip doesn't supports PATCH method
          body: JSON.stringify({
            ...contacts[index],
            isFavorite: !isFavorite,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await data.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
