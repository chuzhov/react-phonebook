import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import AddContact from './AddContact/AddContact';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const TEST_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', favorite: false },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12', favorite: false },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79', favorite: false },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26', favorite: false },
];
const LOCAL_STORAGE_KEY_CONTACTS = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CONTACTS)) ??
      TEST_CONTACTS
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    if (contacts.find(el => el.name === name)) {
      alert(`The contact ${name} is already exist`);
      return;
    }

    const checkNumber = contacts.find(el => el.number === number);
    if (checkNumber) {
      alert(
        `This number is already assigned to another contact: ${checkNumber.name}`
      );
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
      favorite: false,
    };
    setContacts(contacts => [...contacts, newContact]);
  };

  const handleDeleteContact = event => {
    const id = event.currentTarget.id;

    setContacts(contacts.filter(el => el.id !== id));
  };

  const getNameFromFilter = name => {
    setFilter(prevFilter => (prevFilter !== name ? name.trim() : prevFilter));
  };

  const filteredContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <h1>Phonebook</h1>
      <AddContact onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter searchString={filter} getName={getNameFromFilter} />
      <ContactList
        contacts={filteredContacts()}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
