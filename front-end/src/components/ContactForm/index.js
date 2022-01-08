import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import { Form, ButtonContainer } from "./styles";
import useErrors from '../../hooks/useErrors'; 

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function ContactForm({ buttonLabel }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');

    const { setError, removeError, getErrorMessageByFieldName } = useErrors();
 
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

    function handleSubmit(event) {
        event.preventDefault();
        
        console.log({
            name, email, phone, category
        });
    }

    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input 
                    error={getErrorMessageByFieldName('name')}
                    placeholder="Nome"
                    value={name}
                    onChange={handleNameChange}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName('email')}>
                <Input 
                    error={getErrorMessageByFieldName('email')}
                    placeholder="Email" 
                    value={email}
                    onChange={handleEmailChange}
                />
            </FormGroup>

            <FormGroup>
                <Input 
                    placeholder="Telefone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}    
                />
            </FormGroup>
            
            <FormGroup>
                <Select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}    
                >
                    <option value="">Categoria</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="submit">
                    {buttonLabel}
                </Button>
            </ButtonContainer>
      
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};