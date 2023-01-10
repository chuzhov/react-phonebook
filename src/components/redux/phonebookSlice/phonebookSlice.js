import { createSlice, nanoid } from '@reduxjs/toolkit';
import {
  addContactOp,
  fetchContactsOp,
  deleteContactOp,
  updateContactOp,
} from '../operations/phonebookOps';

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
    addContact(state, { payload }) {
      // need to remove!
      const { name, number } = payload;
      const id = nanoid();

      if (state.contacts.find(contact => contact.name === name)) {
        alert('This contact is already exist in your contact list');
        return state;
      }
      const isNumberSaved = state.contacts.find(
        contact => contact.number === number
      );
      if (isNumberSaved) {
        alert(
          `This number is already saved in your contact list to ${isNumberSaved.name}`
        );
        return state;
      }
      const newContact = { id, name, number, isFavorite: false };
      state.contacts.push(newContact);
    },
    deleteContact(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    toggleIsFavorite(state, { payload }) {
      const indexOfToggled = state.contacts.findIndex(
        contact => contact.id === payload
      );
      state.contacts[indexOfToggled].isFavorite =
        !state.contacts[indexOfToggled].isFavorite;
    },
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
      .addCase(deleteContactOp.rejected, onRejectRoutine)
      .addCase(updateContactOp.pending, pendingRoutine)
      .addCase(updateContactOp.fulfilled, (state, { payload }) => {
        const index = state.contacts.items.findIndex(
          item => item.id === payload.id
        );
        state.contacts.items[index] = payload;
      })
      .addCase(updateContactOp.rejected, onRejectRoutine),
});

export default phonebookSlice.reducer;
export const { addContact, deleteContact, toggleIsFavorite, updateFilter } =
  phonebookSlice.actions;
