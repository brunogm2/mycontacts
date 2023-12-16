import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors'; 
import CategoriesService from '../../services/CategoriesService';

import { Form, ButtonContainer } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useSafeAsyncState([]);
    const [isLoadingCategories, seIsLoadingCategories] = useSafeAsyncState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors();

    const isFormValid = (name && errors.length == 0);

    useImperativeHandle(ref, () => ({
        setFieldsValues: (contact) => {
            setName(contact.name ?? '');
            setEmail(contact.email ?? '');
            setPhone(formatPhone(contact.phone ?? ''));
            setCategoryId(contact.category.id ?? '');
        },
        resetFields: () => {
            setName('');
            setEmail('');
            setPhone('');
            setCategoryId('');
        }
    }), []);

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoriesService.listCategories();        
            
                setCategories(categoriesList);
            } catch (error) {} finally {
                seIsLoadingCategories(false);
            }
        }

        loadCategories();
    }, [setCategories, seIsLoadingCategories]);

    function handleNameChange(event) {
        setName(event.target.value);

        if(!event.target.value) {
            setError({ field: 'name', message:'Nome é obrigatório.'});
        }else {
            removeError('name');
        }    
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);

        if(event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: 'email', message:'E-mail inválido.'});
        }else {
            removeError('email');
        }
    }

    function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);

        await onSubmit({
            name, email, phone, categoryId
        });

        setIsSubmitting(false);
        
        console.log({
            name, email, phone, categoryId
        });
    }

    return(
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input 
                    error={getErrorMessageByFieldName('name')}
                    placeholder="Nome *"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName('email')}>
                <Input 
                    type="email"
                    error={getErrorMessageByFieldName('email')}
                    placeholder="Email" 
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup>
                <Input 
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                    disabled={isSubmitting}
                />
            </FormGroup>
            
            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    // value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}  
                    disabled={isLoadingCategories || isSubmitting}  
                >
                    <option value="">Sem categoria</option>
                    
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}

                </Select>

                <div className="loader" />
            </FormGroup>

            <ButtonContainer>
                <Button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
})


ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;