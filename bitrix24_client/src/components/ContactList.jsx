import { useState } from 'react'
import './ContactList.css'
import { contactService } from '../services/contacts';

function ContactList({contacts, onEdit ,fetchContacts}) {
   const [error, setError] = useState(null)
  
   const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }
    
    try {
      await contactService.deleteContact(id);
      // Refresh contacts list
      fetchContacts();
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };
  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  if (contacts?.length === 0) {
    return <div className="no-contacts">No contacts found. Add a new contact to get started.</div>
  }

  console.log(contacts)
  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map(contact => (
            <tr key={contact.ID}>
              <td>{contact.NAME} {contact.LAST_NAME}</td>
              <td>{contact.PHONE && contact.PHONE.length > 0 ? contact.PHONE[0].VALUE : 'N/A'}</td>
              <td>{contact.EMAIL && contact.EMAIL.length > 0 ? contact.EMAIL[0].VALUE : 'N/A'}</td>
              <td className="actions">
                <button 
                  className="edit-button" 
                  onClick={() => onEdit(contact)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteContact(contact.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList