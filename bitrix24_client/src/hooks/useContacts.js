import { useState, useEffect } from 'react';
import { contactService } from '../services/api';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
 
  const deleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter(contact => contact.ID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    contacts,
    loading,
    error,
    refetch: fetchContacts,
    deleteContact
  };
};

export const useContact = (id) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContact = async () => {
    if (!id) {
      setContact(null);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await contactService.getContact(id);
      setContact(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch contact');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  return {
    contact,
    loading,
    error,
    refetch: fetchContact
  };
};