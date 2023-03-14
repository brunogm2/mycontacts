import { useRef } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function NewContact() {
    const contactFormRef = useRef(null);

    async function handleSubmit(formData) { 
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };
    
            await ContactsService.createContact(contact);
    
            contactFormRef.current.resetFields();

            toast({
                type: 'success',
                text: 'Contato cadastrado com sucesso!',
                duration: 3000,
            });
        } catch (error) {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao cadastrar o contato!',
            });
        }
    }
    
    return(
        <>
            <PageHeader 
                title="Novo contato"
            />
            
            <ContactForm 
                buttonLabel="Cadastrar"
                onSubmit={handleSubmit}
            />
        </>
    );
}