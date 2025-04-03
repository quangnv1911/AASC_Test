import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPen, FaTrash, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';
import { useContact } from '../hooks/useContacts';
import { contactService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ContactDetailsPage = () => {
  const { id } = useParams();
  const { contact, loading } = useContact(id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await contactService.deleteContact(id);
      navigate('/contacts');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <Link to="/contacts" className="btn btn-outline mb-3">
              <FaArrowLeft />
              <span>Back to Contacts</span>
            </Link>
            <h1 className="page-title">Contact Not Found</h1>
            <p className="page-description">The contact you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <Link to="/contacts" className="btn btn-outline mb-3">
            <FaArrowLeft />
            <span>Back to Contacts</span>
          </Link>
          
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="page-title">{contact.NAME} {contact.LAST_NAME}</h1>
            <div className="d-flex gap-2">
              <Link to={`/contacts/${id}/edit`} className="btn btn-primary">
                <FaPen />
                <span>Edit</span>
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="fs-lg fw-bold mb-4">Contact Information</h2>
          
          <div className="d-flex flex-column gap-4">
            {contact.EMAIL && contact.EMAIL.length > 0 && (
              <div>
                <h3 className="fs-md fw-medium d-flex align-items-center gap-2 mb-2">
                  <FaEnvelope className="text-primary" />
                  <span>Email Addresses</span>
                </h3>
                <div className="d-flex flex-column gap-2">
                  {contact.EMAIL.map((email, index) => (
                    <div key={index} className="card" style={{ padding: '0.75rem', backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{email.VALUE}</span>
                        <span className="badge">{email.TYPE_ID || 'Primary'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {contact.PHONE && contact.PHONE.length > 0 && (
              <div>
                <h3 className="fs-md fw-medium d-flex align-items-center gap-2 mb-2">
                  <FaPhone className="text-primary" />
                  <span>Phone Numbers</span>
                </h3>
                <div className="d-flex flex-column gap-2">
                  {contact.PHONE.map((phone, index) => (
                    <div key={index} className="card" style={{ padding: '0.75rem', backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{phone.VALUE}</span>
                        <span className="badge">{phone.TYPE_ID || 'Primary'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {contact.WEB && contact.WEB.length > 0 && (
              <div>
                <h3 className="fs-md fw-medium d-flex align-items-center gap-2 mb-2">
                  <FaGlobe className="text-primary" />
                  <span>Websites</span>
                </h3>
                <div className="d-flex flex-column gap-2">
                  {contact.WEB.map((web, index) => (
                    <div key={index} className="card" style={{ padding: '0.75rem', backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <a href={web.VALUE} target="_blank" rel="noopener noreferrer">{web.VALUE}</a>
                        <span className="badge">{web.TYPE_ID || 'Primary'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {contact.address && contact.address.length > 0 && (
              <div>
                <h3 className="fs-md fw-medium d-flex align-items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>Addresses</span>
                </h3>
                <div className="d-flex flex-column gap-2">
                  {contact.address.map((addr, index) => (
                    <div key={index} className="card" style={{ padding: '0.75rem', backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                      <div>
                        {addr.ADDRESS_1 && <div>{addr.ADDRESS_1}</div>}
                        {(addr.CITY || addr.REGION) && (
                          <div>
                            {[addr.CITY, addr.REGION].filter(Boolean).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {contact.bankInfo && contact.bankInfo.length > 0 && (
              <div>
                <h3 className="fs-md fw-medium d-flex align-items-center gap-2 mb-2">
                  <FaUniversity className="text-primary" />
                  <span>Bank Information</span>
                </h3>
                <div className="d-flex flex-column gap-2">
                  {contact.bankInfo.map((bank, index) => (
                    <div key={index} className="card" style={{ padding: '0.75rem', backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                      <div>
                        {bank.RQ_BANK_NAME && <div><strong>Bank:</strong> {bank.RQ_BANK_NAME}</div>}
                        {bank.RQ_ACC_NUM && <div><strong>Account:</strong> {bank.RQ_ACC_NUM}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsPage;