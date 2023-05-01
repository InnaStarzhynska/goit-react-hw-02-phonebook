import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';


export class App extends Component {
state = {
  contacts: [],
  filter: ''
  }
  
  handleAddContact = (contact) => {
    if (this.state.contacts.some(item => item.name === contact.name)
    ) {
      Notiflix.Notify.failure(`${contact.name} is already in contacts`);
      return true
    }
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact]
      }
    })
    return false
  }

  handleDeleteContact = (id) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })
  }

  handleChangeFilter = (evt) => {
    this.setState({filter: evt.target.value})
  }

  handleFilterContacts = () => {
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase().trim()))
  }

  render() {
    return (
      <div>
        <h1 className='titleForm'>Phonebook</h1>
        <PhonebookForm addContact={this.handleAddContact} />
        <h2 className='titleContacts'>Contacts</h2>
        <Filter value={this.state.filter} handleChange={this.handleChangeFilter}/>
        <ContactsList contacts={this.handleFilterContacts()} deleteContact={this.handleDeleteContact} />
      </div>
    )
  }
}

