import Init from './Init/Init';
import AddContact from './AddContact/AddContact';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Init />
      <h1>Phonebook</h1>
      <AddContact />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
