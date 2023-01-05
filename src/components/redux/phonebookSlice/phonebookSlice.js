import { createSlice, nanoid } from '@reduxjs/toolkit';

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact(state, { payload }) {
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
      const newContact = { id, name, number, isfavorite: false };
      state.contacts.push(newContact);
    },
    deleteContact(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    updateFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export default phonebookSlice.reducer;
export const { addContact, deleteContact, updateFilter } =
  phonebookSlice.actions;
