import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../features/modal/modalSlice';
import { selectMap } from '../../features/map/mapSlice';
import { setCanMove } from '../../features/player/playerSlice';
import { changeMap } from '../../features/global/globalSlice';

import ModalButton from '../atoms/ModalButton';

interface IModalExitProps {
    map: string;
}

const StyledModalButton = styled(ModalButton)`
    margin: 0px 10px;
`

const Container = styled.div`
    width: 500px;
    height: 180px;
    background: ${({theme}) => theme.secondary};
    border: 5px solid ${({theme}) => theme.primary};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`

const TextWrapper = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    padding-left: 30px;
`

const Text = styled.p`
    font-family: ${({theme}) => theme.roboto};
    color: ${({theme}) => theme.fontColor};
    font-size: 24px;
    user-select: none;
`

const ButtonsWrapper = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
`

const ModalExit = ({map}: IModalExitProps) => {
    const dispatch = useDispatch();
    const mapSelector = useSelector(selectMap);

    const handleYesClick = () => {
        dispatch(changeMap({
            newMap: map,
            prevMap: mapSelector.name
        }));
        dispatch(hideModal());
        dispatch(setCanMove(true));
    }

    const handleNoClick = () => {
        dispatch(hideModal());
        dispatch(setCanMove(true));
    }

    return (
        <Container>
            <TextWrapper>
                <Text>Czy chcesz przejść dalej?</Text>
            </TextWrapper>
            <ButtonsWrapper>
                <StyledModalButton onClick={handleNoClick} text={"Nie"}/>
                <StyledModalButton onClick={handleYesClick} text={"Tak"}/>
            </ButtonsWrapper>
        </Container>
    );
};

export default ModalExit;