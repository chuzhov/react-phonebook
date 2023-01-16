import { useDispatch, useSelector } from 'react-redux';
import DeleteContactBtn from 'components/DeleteContactBtn/DeleteContactBtn';
import css from './ContactList.module.css';
import {
  selectPhonebookFilter,
  selectPhonebookItems,
} from 'components/redux/phonebook/phonebookSelectors';
import { useEffect } from 'react';
import { fetchContactsOp } from 'components/redux/phonebook/phonebookOps';

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsOp());
  }, [dispatch]);

  const contacts = useSelector(selectPhonebookItems);
  const query = useSelector(selectPhonebookFilter);
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
