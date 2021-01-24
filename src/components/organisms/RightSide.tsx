import React from 'react';
import styled from 'styled-components';

import PlayerEquimpent from '../molecules/PlayerEquimpent';

const Container = styled.div`
    width: 300px;
    height: 816px;
    border: 5px solid ${({theme}) => theme.border};
    overflow-y: auto;
    background-color: ${({theme}) => theme.primaryDark};
`

const RightSide = () => {
    return (
        <Container>
            <PlayerEquimpent />
        </Container>
    );
};

export default RightSide;