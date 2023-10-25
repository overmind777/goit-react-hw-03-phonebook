import { Component } from 'react';
import { Filter } from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Global } from './StyledGlobal';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = this.readContactsFromLocalStorage();
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const items = this.state.contacts;
      this.addContactsToLocalStorage(items);
    }
  }

  addContactsToLocalStorage(item) {
    window.localStorage.setItem('contacts', JSON.stringify(item));
  }

  readContactsFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('contacts'));
  }

  handleAddContacts = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleOnFindInputChange = e => {
    const value = e.target.value;
    this.setState({ filter: value.toLowerCase() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleClickDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => {
        return contact.id !== id;
      }),
      filter: '',
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Global>
        <h1>Phonebook</h1>
        <ContactForm
          handleAddContacts={this.handleAddContacts}
          contacts={contacts}
        />

        <h2>Contacts</h2>
        <Filter
          value={filter}
          handleOnFindInputChange={this.handleOnFindInputChange}
        />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.handleClickDelete}
        />
      </Global>
    );
  }
}
