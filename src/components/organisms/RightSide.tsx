import React from 'react';
import styled from 'styled-components';

import PlayerEquimpent from '../molecules/PlayerEquimpent';
import PlayerInventory from '../molecules/PlayerInventory';

const Container = styled.div`
    width: 300px;
    border: 5px solid ${({theme}) => theme.border};
    border-bottom: none;
    overflow-y: auto;
    background-color: ${({theme}) => theme.primaryDark};
`

const RightSide = () => {
    return (
        <Container>
            <PlayerEquimpent />
            <PlayerInventory />
        </Container>
    );
};

export default RightSide;