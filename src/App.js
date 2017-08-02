import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

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
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }))
  }
  //onDeleteContact is invoke in the ListContact component
  render() {
    return (
      <div>  
        <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts} 
        />
      </div>
    );
  }
}


export default App;
