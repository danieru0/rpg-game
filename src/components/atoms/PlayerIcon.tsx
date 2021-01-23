import React from 'react';
import styled from 'styled-components';

import Player from '../../assets/entites/player.png';

const Container = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 5px solid ${({theme}) => theme.border};
    border-bottom: 5px solid ${({theme}) => theme.border};
`

const PlayerImg = styled.img`
    width: 50px;
    height: 50px;
    image-rendering: pixelated;
`

const PlayerIcon = () => {
    return (
        <Container>
            <PlayerImg src={Player} alt="" />
        </Container>
    );
};

export default PlayerIcon;