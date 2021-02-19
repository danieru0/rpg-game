import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectMap } from '../../features/map/mapSlice';
import { respawnPlayer } from '../../features/global/globalSlice';

const Container = styled.div`
    width: 400px;
    height: 200px;
    background: ${({theme}) => theme.secondary};
    border: 5px solid ${({theme}) => theme.primary};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${({theme}) => theme.roboto};
    user-select: none;
`

const Text = styled.p`
    text-transform: uppercase;
    color: red;
    font-size: 34px;
`

const RespawnBtn = styled.button`
    font-family: ${({theme}) => theme.roboto};
    background-color: ${({theme}) => theme.primaryDark};
    border: 3px solid ${({theme}) => theme.border};
    outline: none;
    cursor: pointer;
    color: ${({theme}) => theme.fontColor};
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px 15px;
    margin-top: 20px;

    &:hover {
        background-color: ${({theme}) => theme.primary};
    }
`

const ModalDeath = () => {
    const dispatch = useDispatch();
    const mapSelector = useSelector(selectMap);

    const handleRespawnBtn = () => {
        dispatch(respawnPlayer(mapSelector.name));
    }

    return (
        <Container>
            <Text>You have died!</Text>
            <RespawnBtn onClick={handleRespawnBtn}>Respawn</RespawnBtn>
        </Container>
    );
};

export default ModalDeath;