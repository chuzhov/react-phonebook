import { Component } from "react";
import { nanoid } from 'nanoid'
import AddContact from "./AddContact/AddContact";
import ContactList from "./ContactList/ContactList";

export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  handleAddContact = (event) => {
    event.preventDefault();
    
    const name  = event.target[0].value;
    const number  = event.target[1].value;
    
    this.setState(prevState =>{
      debugger
      if (prevState.contacts.find(el => el.name === name)) {
        alert(`The contact ${name} is already exist`);
        return
      }
      debugger
      const checkNumber = prevState.contacts.find(el => el.number === number)
      if ( checkNumber) {
        alert(`This number is already assigned to another contact: ${checkNumber.name}`);
        return
      }
      
      return {
        contacts: [...prevState.contacts, {id: nanoid(), name, number}]
      }
    })
  }

  render() {
    return (
      <div
        style={{
          padding: '1rem'
        }}
      >
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.handleAddContact}/>
        <h2>Contacts</h2>
        <ContactList contacts={this.state.contacts}/>
      </div>
    );
  }
};

export default App;
