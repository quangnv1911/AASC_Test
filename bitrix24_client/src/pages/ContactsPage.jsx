import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaPen, FaTrash, FaInbox } from 'react-icons/fa';
import { useContacts } from '../hooks/useContacts';

const ContactsPage = () => {
  const { contacts, loading, deleteContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.NAME} ${contact.LAST_NAME}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(id);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div>
            <h1 className="page-title">Contacts</h1>
            <p className="page-description">Manage your business contacts</p>
          </div>
          <Link to="/contacts/new" className="btn">
            <FaPlus />
            <span>New Contact</span>
          </Link>
        </div>

        <div className="card mb-4">
          <div className="form-group mb-0">
            <div className="d-flex align-items-center">
              <FaSearch className="text-muted" style={{ marginRight: '10px' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', padding: '0.5rem 0' }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaInbox />
            </div>
            <h3 className="empty-state-title">No contacts found</h3>
            <p className="empty-state-description">
              {searchTerm ? 'Try adjusting your search term' : 'Get started by creating your first contact'}
            </p>
            {!searchTerm && (
              <Link to="/contacts/new" className="btn">
                <FaPlus />
                <span>New Contact</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.ID}>
                    <td>
                      <div className="fw-medium">{contact.NAME} {contact.LAST_NAME}</div>
                    </td>
                    <td>
                        <div className="text-muted">{contact.HAS_EMAIL}</div>
                    </td>
                    <td>
                        <div className="text-muted">{contact.HAS_PHONE}</div>
                    </td>
                    <td>
                      {contact.address?.map((addr, index) => (
                        <div key={index} className="text-muted">
                          {[addr.ADDRESS_1, addr.CITY, addr.REGION]
                            .filter(val => val)
                            .join(', ')}
                        </div>
                      ))}
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/contacts/${contact.ID}`} className="btn btn-sm btn-outline btn-icon" title="View">
                          <FaEye />
                        </Link>
                        <Link to={`/contacts/${contact.ID}/edit`} className="btn btn-sm btn-primary btn-icon" title="Edit">
                          <FaPen />
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger btn-icon" 
                          title="Delete"
                          onClick={() => handleDelete(contact.ID)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;