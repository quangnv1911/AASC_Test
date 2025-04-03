import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ContactForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [formValues, setFormValues] = useState({
    NAME: initialValues?.NAME || '',
    LAST_NAME: initialValues?.LAST_NAME || '',
    EMAIL: initialValues?.EMAIL || [{ VALUE: '', TYPE_ID: 'WORK' }],
    PHONE: initialValues?.PHONE || [{ VALUE: '', TYPE_ID: 'WORK' }],
    WEB: initialValues?.WEB || [{ VALUE: '', TYPE_ID: 'WORK' }],
    address: initialValues?.address || [{ ADDRESS_1: '', CITY: '', REGION: '' }],
    bankInfo: initialValues?.bankInfo || [{ RQ_BANK_NAME: '', RQ_ACC_NUM: '', ENTITY_ID: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    setFormValues(prev => {
      const newArray = [...prev[field]];
      newArray[index] = {
        ...newArray[index],
        [key]: value
      };
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field, defaultItem) => {
    setFormValues(prev => ({
      ...prev,
      [field]: [...prev[field], defaultItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormValues(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card mb-4">
        <h2 className="fs-lg fw-bold mb-4">Basic Information</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="NAME" className="form-label">First Name</label>
            <input
              type="text"
              id="NAME"
              name="NAME"
              className="form-control"
              value={formValues.NAME}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="LAST_NAME" className="form-label">Last Name</label>
            <input
              type="text"
              id="LAST_NAME"
              name="LAST_NAME"
              className="form-control"
              value={formValues.LAST_NAME}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="field-array-header">
          <h2 className="fs-lg fw-bold">Email Addresses</h2>
          <button 
            type="button" 
            className="btn btn-sm btn-outline"
            onClick={() => addArrayItem('EMAIL', { VALUE: '', TYPE_ID: 'WORK' })}
          >
            <FaPlus />
            <span>Add Email</span>
          </button>
        </div>
        
        {formValues.EMAIL.map((email, index) => (
          <div key={index} className="field-array-item">
            <div className="field-array-item-content">
              <div className="form-group mb-2">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email.VALUE}
                  onChange={(e) => handleArrayChange('EMAIL', index, 'VALUE', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-control"
                  value={email.TYPE_ID}
                  onChange={(e) => handleArrayChange('EMAIL', index, 'TYPE_ID', e.target.value)}
                >
                  <option value="WORK">Work</option>
                  <option value="HOME">Home</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            
            {formValues.EMAIL.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger btn-icon"
                onClick={() => removeArrayItem('EMAIL', index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="card mb-4">
        <div className="field-array-header">
          <h2 className="fs-lg fw-bold">Phone Numbers</h2>
          <button 
            type="button" 
            className="btn btn-sm btn-outline"
            onClick={() => addArrayItem('PHONE', { VALUE: '', TYPE_ID: 'WORK' })}
          >
            <FaPlus />
            <span>Add Phone</span>
          </button>
        </div>
        
        {formValues.PHONE.map((phone, index) => (
          <div key={index} className="field-array-item">
            <div className="field-array-item-content">
              <div className="form-group mb-2">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone.VALUE}
                  onChange={(e) => handleArrayChange('PHONE', index, 'VALUE', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-control"
                  value={phone.TYPE_ID}
                  onChange={(e) => handleArrayChange('PHONE', index, 'TYPE_ID', e.target.value)}
                >
                  <option value="WORK">Work</option>
                  <option value="MOBILE">Mobile</option>
                  <option value="HOME">Home</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            
            {formValues.PHONE.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger btn-icon"
                onClick={() => removeArrayItem('PHONE', index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="card mb-4">
        <div className="field-array-header">
          <h2 className="fs-lg fw-bold">Websites</h2>
          <button 
            type="button" 
            className="btn btn-sm btn-outline"
            onClick={() => addArrayItem('WEB', { VALUE: '', TYPE_ID: 'WORK' })}
          >
            <FaPlus />
            <span>Add Website</span>
          </button>
        </div>
        
        {formValues.WEB.map((web, index) => (
          <div key={index} className="field-array-item">
            <div className="field-array-item-content">
              <div className="form-group mb-2">
                <label className="form-label">Website URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={web.VALUE}
                  onChange={(e) => handleArrayChange('WEB', index, 'VALUE', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-control"
                  value={web.TYPE_ID}
                  onChange={(e) => handleArrayChange('WEB', index, 'TYPE_ID', e.target.value)}
                >
                  <option value="WORK">Work</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            
            {formValues.WEB.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger btn-icon"
                onClick={() => removeArrayItem('WEB', index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="card mb-4">
        <div className="field-array-header">
          <h2 className="fs-lg fw-bold">Addresses</h2>
          
        </div>
        
        {formValues.address.map((address, index) => (
          <div key={index} className="field-array-item">
            <div className="field-array-item-content">
              <div className="form-group mb-2">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address.ADDRESS_1}
                  onChange={(e) => handleArrayChange('address', index, 'ADDRESS_1', e.target.value)}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address.CITY}
                    onChange={(e) => handleArrayChange('address', index, 'CITY', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Region/State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address.REGION}
                    onChange={(e) => handleArrayChange('address', index, 'REGION', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {formValues.address.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger btn-icon"
                onClick={() => removeArrayItem('address', index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="card mb-4">
        <div className="field-array-header">
          <h2 className="fs-lg fw-bold">Bank Information</h2>
          <button 
            type="button" 
            className="btn btn-sm btn-outline"
            onClick={() => addArrayItem('bankInfo', { RQ_BANK_NAME: '', RQ_ACC_NUM: '' })}
          >
            <FaPlus />
            <span>Add Bank Info</span>
          </button>
        </div>
        
        {formValues.bankInfo.map((bank, index) => (
          <div key={index} className="field-array-item">
            <div className="field-array-item-content">
              <div className="form-group mb-2">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={bank.RQ_BANK_NAME}
                  onChange={(e) => handleArrayChange('bankInfo', index, 'RQ_BANK_NAME', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={bank.RQ_ACC_NUM}
                  onChange={(e) => handleArrayChange('bankInfo', index, 'RQ_ACC_NUM', e.target.value)}
                />
              </div>
            </div>
            
            {formValues.bankInfo.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger btn-icon"
                onClick={() => removeArrayItem('bankInfo', index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="spinner spinner-sm"></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Contact</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;