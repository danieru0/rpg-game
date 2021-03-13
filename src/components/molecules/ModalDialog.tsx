import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import dialogs from '../../assets/dialogs/dialogs';
import { hideModal } from '../../features/modal/modalSlice';
import { setCanMove } from '../../features/player/playerSlice';
import { setTriggerState } from '../../features/triggers/triggersSlice';
import { selectMap } from '../../features/map/mapSlice';

import ModalButton from '../atoms/ModalButton';

interface IModalDialogProps {
    dialogId: number;
    triggerId: number;
}

const Container = styled.div`
    width: 500px;
    height: 200px;
    background: ${({theme}) => theme.secondary};
    border: 5px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontColor};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    user-select: none;
    padding: 0px 10px;
`

const Title = styled.span`
    font-style: italic;
    font-size: 20px;
    top: 5px;
    left: 20px;
    position: absolute;
`

const Text = styled.p`
    font-size: 18px;
    align-self: center;
    text-align: center;
`

const StyledModalButton = styled(ModalButton)`
    position: absolute;
    bottom: 5px;
    right: 20px;
`

const ModalDialog = ({dialogId, triggerId}: IModalDialogProps) => {
    const dispatch = useDispatch();
    const mapSelector = useSelector(selectMap);
    const [dialogLength, setDialogLength] = useState(0);
    const [currentDialogSlide, setCurrentDialogSlide] = useState(0);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogsArray, setDialogsArray] = useState<string[]>([]);

    useEffect(() => {
        const dialog = dialogs[dialogId];

        setDialogLength(dialog.texts.length);
        setDialogTitle(dialog.title);
        setDialogsArray(dialog.texts);
    }, [dialogId]);

    const handleDialogSlideChange = () => {
        if (currentDialogSlide !== dialogLength - 1) {
            setCurrentDialogSlide(currentDialogSlide + 1);
        } else {
            dispatch(hideModal());
            dispatch(setCanMove(true));
            dispatch(setTriggerState({
                map: mapSelector.name,
                triggerId: triggerId,
                value: false
            }));
        }
    }

    return (
        <Container>
            <Title>{dialogTitle}</Title>
            <Text>{dialogsArray[currentDialogSlide]}</Text>
            <StyledModalButton onClick={handleDialogSlideChange} text={currentDialogSlide === dialogLength - 1 ? "Close" : "Next" } />
        </Container>
    );
};

export default ModalDialog;