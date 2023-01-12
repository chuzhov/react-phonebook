import AddContact from 'components/AddContact/AddContact';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
const ContactsPage = () => {
  return (
    <>
      <h1>Contacts:</h1>
      <AddContact />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
};

export default ContactsPage;
