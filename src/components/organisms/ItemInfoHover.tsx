import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectItemInfoHover } from '../../features/itemInfoHover/itemInfoHoverSlice';
import { selectPlayer } from '../../features/player/playerSlice';

import MoneyIcon from '../../assets/items/money.png';

interface IContainer {
    left: number;
    top: number;
}

interface IItemName {
    color: string;
}

interface IItemLvl {
    color: string;
}

interface IItemCost {
    isLevelVisible: boolean;
}

const Container = styled.div<IContainer>`
    background: #000;
    position: absolute;
    left: ${({left}) => left}px;
    top: ${({top}) => top}px;
    display: flex;
    flex-direction: column;
    padding: 5px 15px;
    font-family: ${({theme}) => theme.roboto};
    user-select: none;
`

const ItemName = styled.p<IItemName>`
    color: ${({color}) => color};
`

const ItemBuff = styled.p`
    color: ${({theme}) => theme.fontColor};
`

const Wrapper = styled.div`
    display: flex;
    margin-top: 8px;
`

const ItemLvl = styled.p<IItemLvl>`
    color: ${({color}) => color};
`

const ItemCost = styled.p<IItemCost>`
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.fontColor};
    margin-left: ${({isLevelVisible}) => isLevelVisible ? '10px' : '-8px'};
`

const MoneyIconImg = styled.img`
    width: 14px;
    margin-top: 2px;
    margin-right: 3px;
`

const ItemInfoHover = () => {
    const itemInfoHoverSelector = useSelector(selectItemInfoHover);
    const playerSelector = useSelector(selectPlayer);

    return (
        <Container left={itemInfoHoverSelector.x} top={itemInfoHoverSelector.y}>
            <ItemName color={itemInfoHoverSelector.details.rarity}>{itemInfoHoverSelector.details.name}</ItemName>
            <ItemBuff>{itemInfoHoverSelector.details.buffName}: +{itemInfoHoverSelector.details.buffValue}</ItemBuff>
            <Wrapper>
                {
                    itemInfoHoverSelector.details.lvl && (
                        <ItemLvl color={ itemInfoHoverSelector.details.lvl > playerSelector.lvl ? 'red' : 'white' }>lvl: {itemInfoHoverSelector.details.lvl}</ItemLvl>
                    )
                }
                <ItemCost isLevelVisible={Boolean(itemInfoHoverSelector.details.lvl)} >
                    <MoneyIconImg src={MoneyIcon} alt="" />
                    {itemInfoHoverSelector.details.money}
                </ItemCost>
            </Wrapper>
        </Container>
    );
};

export default ItemInfoHover;