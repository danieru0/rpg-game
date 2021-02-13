import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer, setCanMove } from '../../features/player/playerSlice';
import { hideModal } from '../../features/modal/modalSlice';
import { setItem, clearItem } from '../../features/itemInfoHover/itemInfoHoverSlice';
import { setContextMenu } from '../../features/itemContextMenu/itemContextMenuSlice';
import { weapons, shields, armors }  from '../../assets/items/items';
import returnItemData from '../../helpers/returnItemData';

import EquimpentIcon from '../atoms/EquimpentIcon';

interface IModalShopProps {
    npc: number;
}

const Container = styled.div`
    width: 550px;
    height: 450px;
    background: ${({theme}) => theme.secondary};
    border: 5px solid ${({theme}) => theme.primary};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 5px solid ${({theme}) => theme.primary};
    display: flex;
`

const Type = styled.p`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    text-transform: uppercase;
    font-size: 24px;
    font-weight: bold;
    user-select: none;

    &:first-of-type {
        border-right: 5px solid ${({theme}) => theme.primary};
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const Sell = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-right: 4px solid ${({theme}) => theme.primary};
`

const Buy = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-left: 1px solid ${({theme}) => theme.primary};
`

const ExitButton = styled.button`
    width: 100%;
    height: 20%;
    background: none;
    border: none;
    border-top: 5px solid ${({theme}) => theme.primary};
    cursor: pointer;
    outline: none;
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    text-transform: uppercase;
    font-size: 20px;
`

const ModalShop = ({npc}: IModalShopProps) => {
    const dispatch = useDispatch();
    const mapSelector = useSelector(selectMap);
    const playerSelector = useSelector(selectPlayer);

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, itemType: string | undefined, type: string) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if (id !== undefined && itemType) {
            const itemRect = event.currentTarget.getBoundingClientRect();

            dispatch(clearItem());
            dispatch(setContextMenu({
                x: itemRect.left,
                y: itemRect.top + 3,
                type: type,
                details: {
                    type: itemType,
                    id: id,
                    equipment: false
                }
            }));
        }

    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | undefined, type: string | undefined) => {
        if (id !== undefined && type) {
            const itemRect = event.currentTarget.getBoundingClientRect();
    
            switch(type) {
                case "armor":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        type: 'wearable',
                        details: {
                            buffName: "hp",
                            buffValue: armors[id].hp,
                            name: armors[id].name,
                            rarity: armors[id].rarity,
                            money: armors[id].sellMoney
                        }
                    }))
                    break;
                case "weapon":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        type: 'wearable',
                        details: {
                            buffName: "attack",
                            buffValue: weapons[id].attack,
                            name: weapons[id].name,
                            rarity: weapons[id].rarity,
                            money: weapons[id].sellMoney
                        }
                    }))
                    break;
                case "shield":
                    dispatch(setItem({
                        x: itemRect.left - 5,
                        y: itemRect.top + 34,
                        type: 'wearable',
                        details: {
                            buffName: "def",
                            buffValue: shields[id].def,
                            name: shields[id].name,
                            rarity: shields[id].rarity,
                            money: shields[id].sellMoney
                        }
                    }))
                    break;
                default: return false;
            }
        }
        
    }

    const handleMouseLeave = () => {
        dispatch(clearItem());
    }

    const handleExitButton = () => {
        dispatch(hideModal());
        dispatch(setCanMove(true));
    }

    return (
        <Container>
            <Header>
                <Type>Buy</Type>
                <Type>Sell</Type>
            </Header>
            <Wrapper>
                <Sell>
                    {
                        [...Array(20)].map((item, key) => {
                            if (mapSelector.npc[npc] && mapSelector.npc[npc].items[key]) {
                                const item = mapSelector.npc[npc].items[key];
                                let itemData = returnItemData(item.id, item.type);

                                return (
                                    <EquimpentIcon  
                                        onContextMenu={(e) => handleContextMenu(e, item.id, item.type, 'buy')}
                                        onMouseEnter={(e) => handleMouseEnter(e, item.id, item.type)}
                                        onMouseLeave={() => handleMouseLeave()}
                                        key={key}
                                        iconWidth={32}
                                        wrapperWidth={48}
                                        wrapperHeight={48}
                                        image={itemData && itemData.imgName}
                                    />
                                )
                            } else {
                                return (
                                    <EquimpentIcon  
                                        onContextMenu={() => {}}
                                        onMouseEnter={() => {}}
                                        onMouseLeave={() => {}}
                                        key={key}
                                        iconWidth={32}
                                        wrapperWidth={48}
                                        wrapperHeight={48}
                                        image={null}
                                    />
                                )
                            }

                        })
                    }
                </Sell>
                <Buy>
                    {
                        Object.keys(playerSelector.inventory).map((item, key) => {
                            const inventorySlot = playerSelector.inventory[parseInt(item)];
                            let itemData;

                            if (inventorySlot) {
                                itemData = returnItemData(inventorySlot.id, inventorySlot.type);
                            }

                            return (
                                <EquimpentIcon  
                                    onContextMenu={(e) => handleContextMenu(e, inventorySlot?.slotId, inventorySlot?.type, 'sell')}
                                    onMouseEnter={(e) => handleMouseEnter(e, inventorySlot?.id, inventorySlot?.type)}
                                    onMouseLeave={() => handleMouseLeave()}
                                    key={key}
                                    iconWidth={32}
                                    wrapperWidth={48}
                                    wrapperHeight={48}
                                    image={itemData && itemData.imgName}
                                />
                            )
                        })
                    }
                </Buy>
            </Wrapper>
            <ExitButton onClick={handleExitButton}>Exit</ExitButton>
        </Container>
    );
};

export default ModalShop;