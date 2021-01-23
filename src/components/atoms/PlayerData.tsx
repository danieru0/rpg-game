import React from 'react';
import styled from 'styled-components';

import Money from '../../assets/items/money.png';

interface IPlayerDataProps {
    lvl: number;
    attack: number;
    def: number;
    money: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.fontColor};
    margin-left: 8px;
    margin-top: 4px;
`

const Data = styled.p`
    font-family: ${({theme}) => theme.roboto};

    &:last-of-type {
        display: flex;
        align-items: center;
    }
`

const MoneyImg = styled.img`
    width: 16px;
    margin-right: 5px;
`

const PlayerData = ({lvl, attack, def, money}: IPlayerDataProps) => {
    return (
        <Container>
            <Data>lvl: {lvl}</Data>
            <Data>Attack: {attack}</Data>
            <Data>Def: {def}</Data>
            <Data>
                <MoneyImg src={Money} alt="" />
                {money}
            </Data>
        </Container>
    );
};

export default PlayerData;