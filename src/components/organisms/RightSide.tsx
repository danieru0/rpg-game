import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setItem, clearItem } from '../../features/itemInfoHover/itemInfoHoverSlice';
import { setContextMenu, clearContextMenu } from '../../features/itemContextMenu/itemContextMenuSlice';
import { weapons, shields, armors } from '../../assets/items/items';

import PlayerEquimpent from '../molecules/PlayerEquimpent';
import PlayerInventory from '../molecules/PlayerInventory';
import Console from '../molecules/Console';

const Container = styled.div`
    width: 300px;
    border: 5px solid ${({theme}) => theme.border};
    overflow-y: auto;
    background-color: ${({theme}) => theme.primaryDark};
    display: flex;
    flex-direction: column;
    height: 816px;
`

const RightSide = () => {
    const dispatch = useDispatch();

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if (id !== undefined) {
            const itemRect = event.currentTarget.getBoundingClientRect();
            switch(type) {
                case "armor":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        buffName: "hp",
                        buffValue: armors[id].hp,
                        name: armors[id].name,
                        rarity: armors[id].rarity
                    }))
                    break;
                case "weapon":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        buffName: "attack",
                        buffValue: weapons[id].attack,
                        name: weapons[id].name,
                        rarity: weapons[id].rarity
                    }))
                    break;
                case "shield":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        buffName: "def",
                        buffValue: shields[id].def,
                        name: shields[id].name,
                        rarity: shields[id].rarity
                    }))
                    break;
                default: return false;
            }
        }
    }

    const handleMouseLeave = () => {
        dispatch(clearItem());
    }

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined, equipment?: boolean) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if (id !== undefined && type !== undefined) {
            const itemRect = event.currentTarget.getBoundingClientRect();
            dispatch(clearItem());
            dispatch(setContextMenu({
                x: itemRect.left,
                y: itemRect.top + 3,
                type: type,
                id: id,
                equipment: equipment ? equipment : false
            }));
        }
    }

    const handleOutsideClick = useCallback(() => {
        dispatch(clearContextMenu()); 
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => window.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    return (
        <Container>
            <PlayerEquimpent onContextMenu={handleContextMenu} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} />
            <PlayerInventory onContextMenu={handleContextMenu} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} />
            <Console />
        </Container>
    );
};

export default RightSide;