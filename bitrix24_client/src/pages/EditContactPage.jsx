import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import { useContact } from '../hooks/useContacts';
import { contactService } from '../services/api';

const EditContactPage = () => {
  const { id } = useParams();
  const { contact, loading } = useContact(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const updatedContact = {
        ...formData,
        requisiteId: contact.requisiteId,
      };
    //   updatedContact.address.map(item => ({
    //     ...item,
    //     TYPE_ID: newRequisiteId
    // }));
      await contactService.updateContact(id, updatedContact);
      navigate(`/contacts/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
            <p className="page-description">The contact you're trying to edit doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <Link to={`/contacts/${id}`} className="btn btn-outline mb-3">
            <FaArrowLeft />
            <span>Back to Contact</span>
          </Link>
          <h1 className="page-title">Edit Contact</h1>
          <p className="page-description mb-4">Update information for {contact.NAME} {contact.LAST_NAME}</p>
        </div>

        <ContactForm 
          initialValues={contact}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditContactPage;