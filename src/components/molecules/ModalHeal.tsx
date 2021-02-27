import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayer, setCanMove } from '../../features/player/playerSlice';
import { hideModal } from '../../features/modal/modalSlice';
import { healPlayer } from '../../features/global/globalSlice';

import Heart from '../../assets/items/heart.png';
import Money from '../../assets/items/money.png';

const Container = styled.div`
    width: 400px;
    height: 300px;
    background: ${({theme}) => theme.secondary};
    border: 5px solid ${({theme}) => theme.primary};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    position: relative;
    user-select: none;
`

const Text = styled.p`
    text-transform: uppercase;
    margin-bottom: 2px;
    font-size: 22px;
`

const HealButton = styled.button`
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 5px solid ${({theme}) => theme.border};
    background-color: ${({theme}) => theme.primaryDark};
    outline: none;

    &:hover {
        background-color: ${({theme}) => theme.primary};
    }

    &:active {
        background-color: ${({theme}) => theme.primaryDark};
    }
`

const HeartImage = styled.img`
    width: 90%;
    image-rendering: pixelated;
    user-select: none;
    user-drag: none;
`

const Cost = styled.p`
    font-size: 18px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

const MoneyImg = styled.img`
    width: 16px;
    margin-right: 5px;
`

const ExitButton = styled.button`
    width: 100%;
    height: 20%;
    background: none;
    position: absolute;
    border: none;
    border-top: 5px solid ${({theme}) => theme.primary};
    cursor: pointer;
    outline: none;
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    text-transform: uppercase;
    font-size: 20px;
    bottom: 0;
`

const ModalHeal = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);

    const handleExitButton = () => {
        dispatch(hideModal());
        dispatch(setCanMove(true));
    }

    const handleHealButton = () => {
        const cost = playerSelector.lvl * 25;
        const healAmount = playerSelector.lvl * 15;

        dispatch(healPlayer({
            cost,
            healAmount,
            money: playerSelector.money,
            hp: playerSelector.hp,
            maxHP: playerSelector.maxHP
        }));
    }

    return (
        <Container>
            <Text>Heal</Text>
            <HealButton onClick={handleHealButton}>
                <HeartImage alt="" src={Heart} />
            </HealButton>
            <Cost>
                <MoneyImg src={Money} alt="" />
                {playerSelector.lvl * 25}
            </Cost>
            <ExitButton onClick={handleExitButton}>Exit</ExitButton>
        </Container>
    );
};

export default ModalHeal;