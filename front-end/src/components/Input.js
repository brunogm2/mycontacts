import styled, { css } from 'styled-components';

export default styled.input`
    width: 100%;
    border: none;
    background: #FFF;
    border: 2px solid #FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.5s ease-in-out;
    appearance: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
    }

    ${({ theme, error }) => error && css`
        color: ${theme.colors.danger.main};
        border-color: ${theme.colors.danger.main} !important;
    `};    

    &[disabled] {
        background-color: ${({ theme }) => theme.colors.gray[100]};
        border-color: ${({ theme }) => theme.colors.gray[200]};
    }
`;