import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contactService } from '../services/contacts';
import ContactForm from '../components/ContactForm';
import './ContactDetailPage.css';
import { bankDetailService } from '../services/bankDetail';

function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [bankDetail, setBankDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankDetail = async (id) => {
      try {
        const data = await bankDetailService.getByContactId(id);
        setBankDetail(data.result[0]);
        console.log(bankDetail)
        setError(null);
      } catch (err) {
        setError(`Failed to load contact: ${err.message}`);
      } 
    };

    const fetchContact = async () => {
      try {
        const data = await contactService.getContact(id);
        console.log(data)
        await fetchBankDetail(data.result.ID)
        setContact(data.result);
      } catch (err) {
        setError(`Failed to load contact: ${err.message}`);
      }
    };
  

    if (id) {
      fetchContact();
    }
  }, [id]);


  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/contacts')} className="back-button">
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="contact-detail-page">
      <h2>Contact Details</h2>
      {contact ? (
        <ContactForm 
          contact={contact} 
          bankDetail={bankDetail} 
        />
      ) : (
        <div className="not-found">Contact not found</div>
      )}
    </div>
  );
}

export default ContactDetailPage;