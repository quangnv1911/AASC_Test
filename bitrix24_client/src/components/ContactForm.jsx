import { useState, useEffect } from 'react'
import './ContactForm.css'
import { contactService } from '../services/contacts'
import { useNavigate } from 'react-router-dom';
import { bankDetailService } from '../services/bankDetail';

function ContactForm({ contact , bankDetail}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NAME: '',
    LAST_NAME: '',
    ADDRESS: '',
    PHONE: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    EMAIL: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    WEB: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    BANKING_DETAILS: {
      BANK_NAME: '',
      ACCOUNT_NUMBER: ''
    }
  })
  const [error, setError] = useState(null)

  useEffect(() => {

    if (contact) {
      // Transform contact data to match form structure
      const transformedContact = {
        NAME: contact.NAME || '',
        LAST_NAME: contact.LAST_NAME || '',
        ADDRESS: contact.ADDRESS || '',
        PHONE: contact.PHONE && contact.PHONE.length > 0 
          ? contact.PHONE 
          : [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        EMAIL: contact.EMAIL && contact.EMAIL.length > 0 
          ? contact.EMAIL 
          : [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        WEB: contact.WEB && contact.WEB.length > 0 
          ? contact.WEB 
          : [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        BANKING_DETAILS: {
          BANK_NAME: bankDetail?.RQ_ACC_NAME || '',
          ACCOUNT_NUMBER: bankDetail?.RQ_ACC_NUM || ''
        }
      }
      
      setFormData(transformedContact)
    }
  }, [contact])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else if (name === 'PHONE') {
      setFormData(prev => ({
        ...prev,
        PHONE: [{ VALUE: value, VALUE_TYPE: 'WORK' }]
      }))
    } else if (name === 'EMAIL') {
      setFormData(prev => ({
        ...prev,
        EMAIL: [{ VALUE: value, VALUE_TYPE: 'WORK' }]
      }))
    } else if (name === 'WEB') {
      setFormData(prev => ({
        ...prev,
        WEB: [{ VALUE: value, VALUE_TYPE: 'WORK' }]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const onBack = () => {
     navigate('/contacts')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Transform form data to match API expectations
      const apiData = {
        NAME: formData.NAME,
        LAST_NAME: formData.LAST_NAME,
        ADDRESS: formData.ADDRESS,
        PHONE: formData.PHONE,
        EMAIL: formData.EMAIL,
        WEB: formData.WEB,
      }

      if (contact) {
        await contactService.updateContact(contact?.ID, apiData)
        if(bankDetail){
          await handleUpdateBank() 
        }else{
          await handleCreateBank(contact?.ID) 
        }
      }else{
        await handleCreateContactAndBank(apiData)
      }
      
      onBack()
    } catch (err) {
      setError(err.message)
    } 
  }

  const handleCreateContactAndBank = async (apiData) => {
    await contactService.createContact(apiData).then(async (res) => {
     await handleCreateBank(res?.result)
    })
  }

  const handleCreateBank = async (entityId) => {
    await bankDetailService.createBankDetail({
      NAME: formData.BANKING_DETAILS.BANK_NAME,
      RQ_ACC_NAME: formData.BANKING_DETAILS.BANK_NAME,
      RQ_ACC_NUM: formData.BANKING_DETAILS.ACCOUNT_NUMBER,
      ENTITY_ID: entityId,
      ACTIVE: "Y",
    })
  }

  const handleUpdateBank = async () => {
    await bankDetailService.updateByContactId(bankDetail.ID, {
      NAME: formData.BANKING_DETAILS.BANK_NAME,
      RQ_ACC_NAME: formData.BANKING_DETAILS.BANK_NAME,
      RQ_ACC_NUM: formData.BANKING_DETAILS.ACCOUNT_NUMBER,
    })
  }

  return (
    <div className="contact-form-container">
      <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="NAME">First Name:</label>
          <input
            type="text"
            id="NAME"
            name="NAME"
            value={formData.NAME}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="LAST_NAME">Last Name:</label>
          <input
            type="text"
            id="LAST_NAME"
            name="LAST_NAME"
            value={formData.LAST_NAME}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="ADDRESS">Address:</label>
            <input
              type="text"
              id="ADDRESS"
              name="ADDRESS"
              value={formData.ADDRESS}
              onChange={handleChange}
            />
          </div>
    
        </div>
        
        <div className="form-group">
          <label htmlFor="PHONE">Phone Number:</label>
          <input
            type="tel"
            id="PHONE"
            name="PHONE"
            value={formData.PHONE[0].VALUE}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="EMAIL">Email:</label>
          <input
            type="email"
            id="EMAIL"
            name="EMAIL"
            value={formData.EMAIL[0].VALUE}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="WEB">Website:</label>
          <input
            type="url"
            id="WEB"
            name="WEB"
            value={formData.WEB[0].VALUE}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-section">
          <h3>Bank Details</h3>
          
          <div className="form-group">
            <label htmlFor="BANKING_DETAILS.BANK_NAME">Bank Name:</label>
            <input
              type="text"
              id="BANKING_DETAILS.BANK_NAME"
              name="BANKING_DETAILS.BANK_NAME"
              value={formData.BANKING_DETAILS.BANK_NAME}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="BANKING_DETAILS.ACCOUNT_NUMBER">Account Number:</label>
            <input
              type="text"
              id="BANKING_DETAILS.ACCOUNT_NUMBER"
              name="BANKING_DETAILS.ACCOUNT_NUMBER"
              value={formData.BANKING_DETAILS.ACCOUNT_NUMBER}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onBack} className="back-button">
            Back
          </button>
          <button type="submit" className="save-button">
          Save Contact
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm