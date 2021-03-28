import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { initGame } from '../../features/global/globalSlice';

import ModalButton from '../atoms/ModalButton';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.primary};
`

const StyledModalButton = styled(ModalButton)`
    padding: 20px 30px;
    font-size: 30px;

    &:hover {
        background-color: #000307
    }
`

const StartGame = () => {
    const dispatch = useDispatch();

    const handleStart  = () => {
        dispatch(initGame());
    }

    return (
        <Container>
            <StyledModalButton text={"Start new game"} onClick={handleStart} />
        </Container>
    );
};

export default StartGame;