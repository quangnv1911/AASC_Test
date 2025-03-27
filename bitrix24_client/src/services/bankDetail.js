import api from "./axiosInterceptor";

export const bankDetailService = {
    // Get all
    createBankDetail: async (fields) => {
        return await api.post(`/rest/crm.requisite.bankdetail.add.json`, {
            fields: {
                ...fields
            }
        });
    },
    getByContactId: async (contactId) => {
        return await api.post(`/rest/crm.requisite.bankdetail.list.json`, {
            filter: {
                "ENTITY_ID": contactId,
            },
        }); 
    },
    updateByContactId: async (contactId, fields) => {
        return await api.post(`/rest/crm.requisite.bankdetail.update.json`, {
            id: contactId,
            fields: {
               ...fields
            }
        });
    },
}