import api from './axiosInterceptor';


export const contactService = {
    // Get all contacts
    getContacts: async () => {
        return await api.post('/rest/crm.contact.list.json', {
            "order": {
                "DATE_CREATE": "ASC"
            },
            "filter": {
                "TYPE_ID": "CLIENT"
            },
            "select": [
                "ID",
                "NAME",
                "SECOND_NAME",
                "LAST_NAME",
                "ADDRESS",
                "PHONE",
                "EMAIL",
                "WEB",
                "COMPANY_ID",
            ],
        })
    }
    ,

    // Get a single contact by ID
    getContact: async (id) => {
        return await api.post(`/rest/crm.contact.get.json`, {
            id
        });
    },

    // Create a new contact
    createContact: async (fields) => {
        return await api.post(`/rest/crm.contact.add.json`, {
            fields: {
                ...fields
            }
        });
    },

    // Update an existing contact
    updateContact: async (id, fields) => {
        return await api.post(`/rest/crm.contact.update.json`, {
            id,
            fields: {
                ...fields
            }
        })
    },

    // Delete a contact
    deleteContact: async (id) => {
        return await api.post(`/rest/crm.contact.delete.json`, {
            id
        });
    }
};