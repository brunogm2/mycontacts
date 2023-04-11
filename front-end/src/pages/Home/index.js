import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";

import { Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from "./styles";

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifier from '../../assets/images/magnifier-question.svg';

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm]);

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);
            
            setContacts(contactsList);
            setHasError(false);
        } catch (error) {
            setHasError(true)
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
       loadContacts();
    }, [loadContacts]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState == 'asc' ? 'desc' : 'asc'));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleTryAgain() {
        loadContacts();
    }

    function handleDeleteContact(contact) {
        setContactBeingDeleted(contact);
        setIsDeleteModalVisible(true); 
    }

    function handleCloseDeleteContact() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);

            await ContactsService.deleteContact(contactBeingDeleted.id);

            toast({
                type: 'success',
                text: 'Contato deletado com sucesso!'
            });

            handleCloseDeleteContact();

            setContacts(prevState => prevState.filter(
                (contact) => contact.id !== contactBeingDeleted.id
            )); 
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao deletar um contato!'
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }

    return(
        <Container>
            <Loader isLoading={isLoading} />
            
            <Modal
                danger
                visible={isDeleteModalVisible}
                isLoading={isLoadingDelete}
                title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
                confirmLabel="Deletar"
                onCancel={handleCloseDeleteContact}
                onConfirm={handleConfirmDeleteContact}
            >
                <p>Esta ação não poderá ser desfeita!</p>
            </Modal>

           {contacts.length > 0 && (
             <InputSearchContainer>
                <input value={searchTerm}
                    type="text" 
                    placeholder='Pesquise pelo nome ...'
                    onChange={handleChangeSearchTerm} 
                />
            </InputSearchContainer>
           )}

            <Header 
                justifyContent={
                    hasError 
                    ? 'flex-end' 
                    : (
                        contacts.length > 0
                        ? 'space-between'
                        : 'center'
                    )
                }
            >
                {(!hasError && contacts.length > 0) && (
                    <strong>{filteredContacts.length} {filteredContacts.length == 1 ? 'contato' : 'contatos'}</strong>
                )}
                
                <Link to="/new">Novo Contato</Link>
            </Header>

            {hasError && (
                <ErrorContainer>
                    <img src={sad} alt="sad" />
                    
                    <div className="details">
                        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
                        <Button type="button" onClick={handleTryAgain}>
                            Tentar novamente
                        </Button>
                    </div>
                </ErrorContainer>
            )}

            {!hasError && (
                <>
                    {(contacts.length < 1 && !isLoading) && (
                        <EmptyListContainer>
                            <img src={emptyBox} alt="Empty box"/>

                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão <strong>‟Novo contato” </strong> 
                                à cima para cadastrar o seu 
                                primeiro!
                            </p>
                        </EmptyListContainer>
                    )}
                    
                    {(contacts.length > 0 && filteredContacts.length < 1) && (
                        <SearchNotFoundContainer>
                            <img src={magnifier} alt="Magnifer question" />

                            <p>Nenhum resultado foi encontrado para <strong>‟{searchTerm}”</strong>.</p>
                        </SearchNotFoundContainer>
                    )}

                    {filteredContacts.length > 0 && (
                        <ListHeader orderBy={orderBy}>
                            <button type="button" onClick={handleToggleOrderBy}>
                                <span>Nome</span>
                                <img src={arrow} alt="Arrow" />
                            </button>
                        </ListHeader>
                    )}

                    {filteredContacts.map((contact) => (
                        <Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category.name && (
                                        <small>{contact.category.name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>
                            
                            <div className="actions">
                                <Link to={`/edit/${contact.id}`}>
                                    <img src={edit} alt="Edit" />
                                </Link>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteContact(contact)}
                                >
                                    <img src={trash} alt="Delete" />
                                </button>
                            </div>
                        </Card>
                    ))}
               </>
            )}
        </Container>
    );
}