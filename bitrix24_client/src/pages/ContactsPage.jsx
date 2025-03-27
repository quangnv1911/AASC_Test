import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { contactService } from '../services/contacts';
import ContactList from '../components/ContactList';
import './ContactsPage.css';

function ContactsPage() {
  const { memberId, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      const data = await contactService.getContacts()
      console.log(data)
      setContacts(data.result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } 
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddNew = () => {
    navigate('/contacts/new');
  };

  const handleEditContact = (contact) => {
    navigate(`/contacts/${contact.ID}`);
  };

  return (
    <div className="contacts-page">
      <div className="header-bar">
        <div className="user-info">
          <span>Member ID: {memberId}</span>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </div>
      
      <div className="actions-bar">
        <button className="add-button" onClick={handleAddNew}>
          Add New Contact
        </button>
      </div>
      
      { error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <ContactList 
        contacts={contacts} 
          onEdit={handleEditContact} 
          fetchContacts={fetchContacts}
        />
      )}
    </div>
  );
}

export default ContactsPage;