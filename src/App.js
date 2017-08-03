import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
//const contacts = [
//  {
//    "id": "ryan",
//    "name": "Ryan Florence",
//    "email": "ryan@reacttraining.com",
//    "avatarURL": "http://localhost:5001/ryan.jpg"
//  },
//  {
//    "id": "michael",
//    "name": "Michael Jackson",
//    "email": "michael@reacttraining.com",
//    "avatarURL": "http://localhost:5001/michael.jpg"
//  },
//  {
//    "id": "tyler",
//    "name": "Tyler McGinnis",
//    "email": "tyler@reacttraining.com",
//    "avatarURL": "http://localhost:5001/tyler.jpg"
//  },
//]

//initializing state within component
class App extends Component {
  state = {
    screen: 'list', // list, create
    contacts: []
  }
  
  //this is a lifecycle event method that fetches data after the component has mounted
  //technically the first time it mounted, there should have displayed no contacts
  //then the fetch occurs and the setState calls the re-render
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  //function that gets passed into ListContacts as a prop
  //receives the contact prop from ListContacts 
    //calls the current state; looks at the contacts property
    //filters through each item in contacts that satisfies the filter
    //merges the new contacts into the current state 
    //also removes the contact from the database via ContactsAPI.remove
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }))

    ContactsAPI.remove(contact)
  }
  //onDeleteContact is invoke in the ListContact component
  render() {
    return (
      <div className ='app'>
        {this.state.screen === 'list' && (
          <ListContacts 
           onDeleteContact={this.removeContact} 
           contacts={this.state.contacts} 
           onNavigate={() => {
             this.setState({ screen: 'create' })
           }}
          />
        )}  
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    )
  }
}


export default App;
