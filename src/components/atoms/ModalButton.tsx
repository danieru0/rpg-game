import React from 'react';
import styled from 'styled-components';

interface IModalButtonProps {
    text: string;
    onClick: () => void;
    [key: string]: any;
}

const Button = styled.button`
    background: ${({theme}) => theme.primaryDark};
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    cursor: pointer;
    border: none;
    padding: 10px 15px;
    text-transform: uppercase;
    outline: none;
    user-select: none;

    &:hover {
        background: ${({theme}) => theme.primary};
    }
`

const ModalButton = ({text, onClick, ...props}: IModalButtonProps) => {
    return (
        <Button onClick={onClick} {...props}>
            {text}
        </Button>
    );
};

export default ModalButton;