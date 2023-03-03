import styled, { css } from "styled-components";

const containerVariants = {
    default: css`
        background-color: ${({ theme }) => theme.colors.primary.main};
    `,
    success: css`
        background-color: ${({ theme }) => theme.colors.success.main};
    `,
    danger: css`
        background-color: ${({ theme }) => theme.colors.danger.main};
    `,
};

export const Container = styled.div`
    padding: 16px 32px;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:focus {
        background-color: purple;
    }

    ${({ type }) => containerVariants[type] || containerVariants.default}
    
    & + & {
        margin-top: 12px;
    }


    img {
        margin-right: 8px;
    }
`;