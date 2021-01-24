import React from 'react';
import styled from 'styled-components';

import PlayerInfo from '../molecules/PlayerInfo';
import EnemyInfo from '../molecules/EnemyInfo';

const Container = styled.div`
    width: 250px;
    height: 816px;
    border: 5px solid ${({theme}) => theme.border};
    overflow-y: auto;
    background: #101418;
`

const LeftSide = () => {
    return (
        <Container>
            <PlayerInfo />
            <EnemyInfo />
        </Container>
    );
};

export default LeftSide;