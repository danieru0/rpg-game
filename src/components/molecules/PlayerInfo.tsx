import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';

import Player from '../../assets/entites/player.png';

import EntityIcon from '../atoms/EntityIcon';
import PlayerData from '../atoms/PlayerData';
import HpBar from '../atoms/HpBar';

const Container = styled.div`
    width: 100%;
    height: 135px;
    background-color: ${({theme}) => theme.secondary};
    border-bottom: 5px solid ${({theme}) => theme.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`

const PlayerInfo = () => {
    const playerSelector = useSelector(selectPlayer);

    return (
        <Container>
            <Wrapper>
                <EntityIcon img={Player} border={true} />
                <PlayerData lvl={playerSelector.lvl} attack={playerSelector.base_attack + playerSelector.weapon_attack} def={playerSelector.def} money={playerSelector.money} />
            </Wrapper>
            <HpBar hp={playerSelector.hp} maxHP={playerSelector.maxHP} />
        </Container>
    );
};

export default PlayerInfo;