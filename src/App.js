import React, { Component } from 'react';

//const people = [
//  { name: 'Michael'},
//  { name: 'Ryan'},
//  { name: 'Tyler'},
//]


class ContactList extends React.Component {
  render() {
    const people = this.props.contacts
    
    return <ol>
      { people.map(person => (
        <li key={person.name}>{ person.name }!</li>
      ))}
    </ol>
  }
}

//class App extends Component {
//  render() {
//    return (
//      <div className="App">
//        <ContactList/>
//      </div>
//    );
//  }
//}

// passing props into components
class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[ 
 	  { name: 'Michael'},
 	  { name: 'Ryan'},
  	  { name: 'Tyler'}
	]}/>
        <ContactList contacts={[ 
 	  { name: 'Panda'},
 	  { name: 'Bear'},
  	  { name: 'Kaola'}
	]}/>

      </div>
    );
  }
}


export default App;
