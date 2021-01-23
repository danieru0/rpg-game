import React from 'react';
import styled from 'styled-components';

import PlayerInfo from '../molecules/PlayerInfo';

const Container = styled.div`
    width: 250px;
    height: 800px;
    border: 5px solid ${({theme}) => theme.border};
`

const LeftSide = () => {
    return (
        <Container>
            <PlayerInfo />
        </Container>
    );
};

export default LeftSide;