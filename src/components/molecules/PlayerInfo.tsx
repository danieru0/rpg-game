import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';
import { theme } from '../../theme/theme';

import Player from '../../assets/entites/player.png';

import EntityIcon from '../atoms/EntityIcon';
import PlayerData from '../atoms/PlayerData';
import Bar from '../atoms/Bar';

const Container = styled.div`
    width: 100%;
    height: 180px;
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
            <Bar text="HP:" color={theme.hpColor} value={playerSelector.hp} maxValue={playerSelector.maxHP} />
            <Bar text="EXP:" color={theme.expColor} value={playerSelector.exp} maxValue={playerSelector.expNeeded} />
        </Container>
    );
};

export default PlayerInfo;