import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';
import { armors, shields, weapons } from '../../assets/items/items';

import EquimpentIcon from '../atoms/EquimpentIcon';

interface IPlayerInventory {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => void;
    onMouseLeave: () => void;
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

const PlayerInventory = ({onMouseEnter, onMouseLeave}: IPlayerInventory) => {
    const playerSelector = useSelector(selectPlayer);
    
    return (
        <Container>
            {
                Object.keys(playerSelector.inventory).map((item, key) => {
                    const inventorySlot = playerSelector.inventory[parseInt(item)];
                    let itemData;

                    if (inventorySlot) {
                        switch(inventorySlot.type) {
                            case "weapon": {
                                itemData = weapons[inventorySlot.id];
                                break;
                            }
                            case "armor": {
                                itemData = armors[inventorySlot.id];
                                break;
                            }
                            case "shield": {
                                itemData = shields[inventorySlot.id];
                                break;
                            }
                            default: return false;
                        }
                    }

                    return (
                        <EquimpentIcon onMouseLeave={onMouseLeave} key={key} onMouseEnter={(e) => onMouseEnter(e, inventorySlot?.id, inventorySlot?.type)} iconWidth={32} wrapperWidth={48} wrapperHeight={48} image={itemData && itemData.imgName} />
                    )
                })
            }
        </Container>
    );
};

export default PlayerInventory;