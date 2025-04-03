import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const contactService = {
  // Get all contacts
  getContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Get a single contact
  getContact: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  // Create a new contact
  createContact: async (data) => {
    const response = await api.post('/contact', { data });
    toast.success('Contact created successfully');
    return response.data;
  },

  // Update a contact
  updateContact: async (id, data) => {
    const response = await api.put(`/contact`, { id, data });
    toast.success('Contact updated successfully');
    return response.data;
  },

  // Delete a contact
  deleteContact: async (contactId) => {
    const response = await api.delete('/contact', { data: { contactId } });
    toast.success('Contact deleted successfully');
    return response.data;
  },
};