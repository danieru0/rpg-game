import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';

import EquimpentIcon from '../atoms/EquimpentIcon';

const Container = styled.div`
    width: 100%;
    height: 135px;
    background-color: ${({theme}) => theme.secondary};
    border-bottom: 5px solid ${({theme}) => theme.border};
    display: flex;
    align-items: center;
    justify-content: space-around;
    user-select: none;
`

const PlayerEquimpent = () => {
    const playerSelector = useSelector(selectPlayer);

    return (
        <Container>
            <EquimpentIcon image={playerSelector.equipmnent.weapon && playerSelector.equipmnent.weapon.imgName} text="weapon"/>
            <EquimpentIcon image={playerSelector.equipmnent.armor && playerSelector.equipmnent.armor.imgName} text="armor"/>
            <EquimpentIcon image={playerSelector.equipmnent.shield && playerSelector.equipmnent.shield.imgName} text="shield"/>
        </Container>
    );
};

export default PlayerEquimpent;