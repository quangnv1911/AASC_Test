import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import { contactService } from '../services/api';

const CreateContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await contactService.createContact(formData);
      navigate('/contacts');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <Link to="/contacts" className="btn btn-outline mb-3">
            <FaArrowLeft />
            <span>Back to Contacts</span>
          </Link>
          <h1 className="page-title">Create New Contact</h1>
          <p className="page-description mb-4">Add a new contact to your Bitrix24 account</p>
        </div>

        <ContactForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateContactPage;