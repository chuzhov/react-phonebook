export const selectPhonebookItems = state => {
  return state.phonebook.contacts.items;
};
export const selectPhonebookFilter = state => {
  return state.phonebook.filter;
};
