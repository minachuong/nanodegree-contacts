import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


// stateless functional component
//invokes onDeleteContact prop in parent App component
//function ListContacts (props) {
//  return (
//    <ol className='contact-list'>
//      {props.contacts.map((contact) => (
//        <li key={contact.id} className='contact-list-item'>
//          <div className='contact-avatar' style={{
//            backgroundImage: `url(${contact.avatarURL})`
//          }}/>
//          <div className='contact-details'>
//            <p>{contact.name}</p>
//            <p>{contact.email}</p>
//          </div> 
//          <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
//            Remove
//          </button> 
//        </li>  
//      ))}
//    </ol>    
//  )
//}

// .isRequired make sure that a warning is shown if the prop isn't provided
//ListContacts.propTypes = {
//  contacts: PropTypes.array.isRequired,
//  onDeleteContact: PropTypes.func.isRequired
//}

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  
  clearQuery = () => {
    this.setState({ query: '' })
  }

  // if there's a query, use the query as a regex to match over contact names and store matches into showingContacts
  // match is the regex, match.test yields boolean
  // escapeRegExp sanitizes special characters and allows flags
  // no query? provide all contacts
  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts 
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))  
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>  
        <div className='list-contacts-top'>
          <input 
            className='search-contacts' 
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        { showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div> 
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button> 
            </li>  
          ))}
        </ol>    
      </div>  
    )
  }
}

export default ListContacts
