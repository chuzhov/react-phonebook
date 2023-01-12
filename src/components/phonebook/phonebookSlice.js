import { createSlice } from '@reduxjs/toolkit';
import {
  addContactOp,
  fetchContactsOp,
  deleteContactOp,
  // updateContactOp,
} from './phonebookOps';

const pendingRoutine = state => {
  state.contacts.isLoading = true;
};

const onRejectRoutine = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: { items: [], isLoading: false, error: null },
    filter: '',
  },
  reducers: {
    updateFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(addContactOp.pending, pendingRoutine)
      .addCase(addContactOp.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(payload);
      })
      .addCase(addContactOp.rejected, onRejectRoutine)
      .addCase(fetchContactsOp.pending, pendingRoutine)
      .addCase(fetchContactsOp.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(fetchContactsOp.rejected, onRejectRoutine)
      .addCase(deleteContactOp.pending, pendingRoutine)
      .addCase(deleteContactOp.fulfilled, (state, { payload: { id } }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== id
        );
      })
      .addCase(deleteContactOp.rejected, onRejectRoutine),
});
export default phonebookSlice.reducer;
export const { updateFilter } = phonebookSlice.actions;
