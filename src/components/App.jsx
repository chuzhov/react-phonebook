import { Component } from 'react';
import { nanoid } from 'nanoid';
import AddContact from './AddContact/AddContact';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = (name, number) => {
    if (this.state.contacts.find(el => el.name === name)) {
      alert(`The contact ${name} is already exist`);
      return;
    }

    const checkNumber = this.state.contacts.find(el => el.number === number);
    if (checkNumber) {
      alert(
        `This number is already assigned to another contact: ${checkNumber.name}`
      );
      return;
    }

    this.setState(() => {
      return {
        contacts: [...this.state.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  handleDeleteContact = event => {
    const id = event.currentTarget.id;
    const contacts = this.state.contacts;

    this.setState(() => {
      return { contacts: contacts.filter(el => el.id !== id) };
    });
  };

  getNameFromFilter = name => {
    this.setState(prevState => {
      if (prevState !== name) {
        return { filter: name.trim() };
      }
    });
  };

  filteredContacts = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    return (
      <div
        style={{
          padding: '1rem',
        }}
      >
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          searchString={this.state.filter}
          getName={this.getNameFromFilter}
        />
        <ContactList
          contacts={this.filteredContacts()}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
