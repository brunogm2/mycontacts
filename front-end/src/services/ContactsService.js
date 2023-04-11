import delay from "../utils/delay";
import ContactMapper from "./mappers/ContactMapper";
import HttpClient from "./utils/HttpClient";

class ContactsService {
    constructor() {
        this.HttpClient = new HttpClient('http://localhost:3001');
    }

    async listContacts(orderBy = 'asc') {
        const contacts = await this.HttpClient.get(`/contacts?orderBy=${orderBy}`, {
            headers: {
                Authorization: 'meutoken',
            }
        });

        // return contacts.map((contact) => ContactMapper.toDomain(contact));
        return contacts.map(ContactMapper.toDomain);
    }

    async getContactById(id) {
        // await delay(5000);
        const contact = await this.HttpClient.get(`/contacts/${id}`);

        return ContactMapper.toDomain(contact);
    }

    createContact(contact) {
        const body = ContactMapper.toPersistence(contact);

        return this.HttpClient.post(`/contacts`, { body });
    }

    updateContact(id, contact) {
        const body = ContactMapper.toPersistence(contact);

        return this.HttpClient.put(`/contacts/${id}`, { body });
    }

    deleteContact(id) {
        return this.HttpClient.delete(`/contacts/${id}`)
    }
}

export default new ContactsService();