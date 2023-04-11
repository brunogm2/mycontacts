import { useRef } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";
import ContactMapper from "../../services/mappers/ContactMapper";

export default function NewContact() {
    const contactFormRef = useRef(null);

    async function handleSubmit(contact) { 
        try {    
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