import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 32px;
`;

export const InputSearchContainer = styled.div`
    width: 100%;

    >input {
        width: 100%;
        background: #fff;
        border: none;
        border-radius: 25px;
        height: 50px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        outline: none;
        padding: 0 16px;

        &::placeholder {
            color: #BCBCBC;
        }
    }

`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;
    
    strong {
        font-size: 24px;
    }

    a {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
            color: #fff;
        }
    }
`;

export const ListHeader = styled.header`
    margin-top: 24px;
    margin-bottom: 8px;

    button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;

        span {
            margin-right: 8px;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.main};
        }

        img {
            transform: ${({ orderBy }) => (orderBy == 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
            transition: transform 0.2s ease-in;
        }
    }
`;

export const Card = styled.div`
    background: #FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    justify-content: row;
    align-items: center;
    justify-content: space-between;

    & + & {
        margin-top: 16px;
    }
    
    .info {
        .contact-name {
            display: flex;
            align-items: center;
        
            small {
                background: ${({ theme }) => theme.colors.primary.lighter};
                color: ${({ theme }) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                padding: 4px;
                border-radius: 4px;
                margin-left: 8px;
            }
        }

        span {
            display: block;
            font-size: 14px;
            color: ${({ theme }) => theme.colors.gray[200]};
        }
    }

    .actions {
        display: flex;
        align-items: center;

        button {
            background: transparent;
            border: none;
            margin-left: 8px;
        }
    }
`;

export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 1rem;

    strong {
        font-size: 22px;
        color: ${({ theme }) => theme.colors.danger.main};
        display: block;
        margin-bottom: 8px;
    }
`

export const EmptyListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        color: ${({ theme }) => theme.colors.gray[200]};
        text-align: center;
        margin-top: 16px;
    }

    strong {
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const SearchNotFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    
    p {
        color: ${({ theme }) => theme.colors.gray[200]};
        margin-left: 24px;
        word-break: break-word;
    }
`;