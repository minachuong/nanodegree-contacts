import React, { Component } from 'react';

const people = [
  { name: 'Michael'},
  { name: 'Ryan'},
  { name: 'Tyler'},
]

class ContactList extends React.Component {
  render() {
    return <ol>
      { people.map(person => (
        <li key={person.name}>{ person.name }!</li>
      ))}
    </ol>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList/>
      </div>
    );
  }
}

export default App;
