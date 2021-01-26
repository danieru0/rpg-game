import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectItemInfoHover } from '../../features/itemInfoHover/itemInfoHoverSlice';

interface IContainer {
    left: number;
    top: number;
}

interface IItemName {
    color: string;
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

const ItemInfoHover = () => {
    const itemInfoHoverSelector = useSelector(selectItemInfoHover);

    return (
        <Container left={itemInfoHoverSelector.x} top={itemInfoHoverSelector.y}>
            <ItemName color={itemInfoHoverSelector.rarity}>{itemInfoHoverSelector.name}</ItemName>
            <ItemBuff>{itemInfoHoverSelector.buffName}: {itemInfoHoverSelector.buffValue}</ItemBuff>
        </Container>
    );
};

export default ItemInfoHover;