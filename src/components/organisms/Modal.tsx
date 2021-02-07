import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectModal } from '../../features/modal/modalSlice';

import ModalSwitch from '../molecules/ModalSwitch';

const Container = styled.div`
    width: 816px;
    height: 816px;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = () => {
    const modalSelector = useSelector(selectModal);

    if (modalSelector.type) {
        return (
            <Container>
                <ModalSwitch type={modalSelector.type} value={modalSelector.value} />
            </Container>
        );
    } else {
        return null;
    }
};

export default Modal;