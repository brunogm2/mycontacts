import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";
import useIsMounted from "../../hooks/useIsMounted";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";


export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');

    const contactFormRef = useRef(null);

    const { id } = useParams();
    const history = useHistory();
    const safeAsyncAction = useSafeAsyncAction();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                safeAsyncAction(() => {
                    contactFormRef.current.setFieldsValues(contact);
                    setIsLoading(false);
                    setContactName(contact.name)
                });
            } catch {
                safeAsyncAction(() => {
                    history.push('/');
                    toast({
                        type: 'danger',
                        text: 'Contato não encontrado!'
                    })
                });
            }
        }

        loadContact();
    }, [id, history, safeAsyncAction])

    async function handleSubmit(contact) {
        try {
            const response = await ContactsService.updateContact(id, contact);

            setContactName(response.name);

            toast({
                type: 'success',
                text: 'Contato editado com sucesso!',
                duration: 3000,
            });
        } catch (error) {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao editar o contato!',
            });
        }
    }
    
    return(
        <>
            <Loader isLoading={isLoading} />

            <PageHeader 
                title={isLoading ? 'Carregando...' : `Editar ${contactName}` }
            />

            <ContactForm
                ref={contactFormRef}
                buttonLabel="Editar"
                onSubmit={handleSubmit}
            />
        </>
    );
}