const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
    
    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);

        response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid contact ID' });
        }

        const contact = await ContactsRepository.findById(id);

        if(!contact){
            return response.status(404).json({ error: 'User not found' });
        }

        response.json(contact);
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body;

        if(!name){
            return response.status(400).json({ error: 'Name is required' });
        }

        if (category_id && !isValidUUID(category_id)) {
            return response.status(400).json({ error: 'Invalid category ID' });
        }
        
        if (email) {
            const contactExist = await ContactsRepository.findByEmail(email);
            
            if(contactExist){
                return response.status(400).json({ error: 'This e-mail is aleardy been taken' });
            }
        }

        const contact = await ContactsRepository.create({
            name, 
            email: email || null, 
            phone, 
            category_id: category_id || null
        });

        response.status(201).json(contact); 
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid contact ID' });
        }

        if (category_id && !isValidUUID(category_id)) {
            return response.status(400).json({ error: 'Invalid category ID' });
        }

        if(!name){
            return response.status(400).json({ error: 'Name is required' });
        }

        const contactExist = await ContactsRepository.findById(id);
        if(!contactExist){
            return response.status(404).json({ error: 'User not found' });
        }

        if (email) {
            const contactByEmail = await ContactsRepository.findByEmail(email);
            
            if(contactByEmail && contactByEmail.id != id){
                return response.status(400).json({ error: 'This e-mail is aleardy in use' });
            }
        }

        const contact = await ContactsRepository.update(id, {
            name, 
            email: email || null, 
            phone, 
            category_id: category_id || null
        });

        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid contact ID' });
        }

        await ContactsRepository.delete(id);
        response.sendStatus(204);
    }
}

module.exports = new ContactController();