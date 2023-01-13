import AddContact from 'components/AddContact/AddContact';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
const ContactsPage = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Add contact:</h2>
      <AddContact />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
