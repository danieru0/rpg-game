import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';
import returnItemData from '../../helpers/returnItemData';

import EquimpentIcon from '../atoms/EquimpentIcon';

interface IPlayerInventory {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => void;
    onMouseLeave: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => void;
}

const Container = styled.div`
    width: 100%;
    height: 350px;
    background-color: ${({theme}) => theme.secondary};
    border-bottom: 5px solid ${({theme}) => theme.border};
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    user-select: none;
`

const PlayerInventory = ({onMouseEnter, onMouseLeave, onContextMenu}: IPlayerInventory) => {
    const playerSelector = useSelector(selectPlayer);
    
    return (
        <Container onContextMenu={(e) => e.preventDefault()}>
            {
                Object.keys(playerSelector.inventory).map((item, key) => {
                    const inventorySlot = playerSelector.inventory[parseInt(item)];
                    
                    let itemData;

                    if (inventorySlot) {
                        itemData = returnItemData(inventorySlot.id, inventorySlot.type);
                    }

                    return (
                        <EquimpentIcon onContextMenu={(e) => onContextMenu(e, inventorySlot?.slotId, inventorySlot?.type)} onMouseLeave={onMouseLeave} key={key} onMouseEnter={(e) => onMouseEnter(e, inventorySlot?.id, inventorySlot?.type)} iconWidth={32} wrapperWidth={48} wrapperHeight={48} image={itemData && itemData.imgName} />
                    )
                })
            }
        </Container>
    );
};

export default PlayerInventory;