import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';

import EquimpentIcon from '../atoms/EquimpentIcon';

interface IPlayerEquipment {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => void;
    onMouseLeave: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined, equipment: boolean) => void;
}

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

const PlayerEquimpent = ({onMouseEnter, onMouseLeave, onContextMenu}: IPlayerEquipment) => {
    const playerSelector = useSelector(selectPlayer);

    return (
        <Container>
            <EquimpentIcon onContextMenu={(e) => onContextMenu(e, playerSelector.equipmnent.weapon?.id, playerSelector.equipmnent.weapon?.type, true)} onMouseLeave={onMouseLeave} onMouseEnter={(e) => onMouseEnter(e, playerSelector.equipmnent.weapon?.id, playerSelector.equipmnent.weapon?.type)} iconWidth={48} wrapperWidth={64} wrapperHeight={64} image={playerSelector.equipmnent.weapon && playerSelector.equipmnent.weapon.imgName} text="weapon"/>
            <EquimpentIcon onContextMenu={(e) => onContextMenu(e, playerSelector.equipmnent.armor?.id, playerSelector.equipmnent.armor?.type, true)} onMouseLeave={onMouseLeave} onMouseEnter={(e) => onMouseEnter(e, playerSelector.equipmnent.armor?.id, playerSelector.equipmnent.armor?.type)} iconWidth={48} wrapperWidth={64} wrapperHeight={64} image={playerSelector.equipmnent.armor && playerSelector.equipmnent.armor.imgName} text="armor"/>
            <EquimpentIcon onContextMenu={(e) => onContextMenu(e, playerSelector.equipmnent.shield?.id, playerSelector.equipmnent.shield?.type, true)} onMouseLeave={onMouseLeave} onMouseEnter={(e) => onMouseEnter(e, playerSelector.equipmnent.shield?.id, playerSelector.equipmnent.shield?.type)} iconWidth={48} wrapperWidth={64} wrapperHeight={64} image={playerSelector.equipmnent.shield && playerSelector.equipmnent.shield.imgName} text="shield"/>
        </Container>
    );
};

export default PlayerEquimpent;