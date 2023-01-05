import { useSelector } from 'react-redux';
//import { deleteContact } from 'components/redux/phonebookSlice/phonebookSlice';
import StarBtn from 'components/StarBtn/StarBtn';
import DeleteContactBtn from 'components/DeleteContactBtn/DeleteContactBtn';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.phonebook.contacts);
  const query = useSelector(state => state.phonebook.filter);
  const filteredContacts =
    query.length === 0
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(query.toLowerCase())
        );

  return filteredContacts.length ? (
    <ul className={css['list']}>
      {filteredContacts.map(el => (
        <li key={'li' + el.id} className={css['item']}>
          <StarBtn id={el.id} isFavorite={el.isFavorite} />
          <p>
            <span className={css['name']}>{el.name}</span>
            <span className={css['phone-number']}>{el.number}</span>
          </p>
          <DeleteContactBtn id={el.id} />
        </li>
      ))}
    </ul>
  ) : contacts.length === 0 ? (
    <p>Your contact list is empty</p>
  ) : (
    <p>There aren't contacts matching Your query</p>
  );
};

export default ContactList;
