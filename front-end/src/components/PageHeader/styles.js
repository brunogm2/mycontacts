import styled from 'styled-components';

export const Container = styled.header`
    margin-bottom: 24px;

    a {
        text-decoration: none;
        display: flex;
        align-items: center;

        span {
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.main};
        }

        img {
            margin-right: 8px;
            transform: rotate(-90deg);
        }
    }

    h1 {
        font-size: 24px;
        margin-top: 8px;
    }

   
`;