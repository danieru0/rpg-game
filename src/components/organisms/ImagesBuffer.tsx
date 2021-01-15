import React from 'react';
import styled from 'styled-components';

import Dungeon from '../../assets/tiles/dungeon.png';
import Player from '../../assets/entites/player.png';

const Container = styled.div`
    display: none;
`

function TilesBuffer() {
	return (
		<Container>
            <img className="dungeon" alt="" src={Dungeon} />
            <img className="player" alt="" src={Player} />
		</Container>
	);
}

export default TilesBuffer;