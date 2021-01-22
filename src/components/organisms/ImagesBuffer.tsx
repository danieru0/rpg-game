import React from 'react';
import styled from 'styled-components';

import Dungeon from '../../assets/tiles/dungeon.png';
import DungeonItems from '../../assets/tiles/dungeonItems.png';
import Player from '../../assets/entites/player.png';
import Monster1 from '../../assets/entites/monster-1.png';
import ChestOpen from '../../assets/items/chestOpen.png';
import chestClosed from '../../assets/items/chestClosed.png';

const Container = styled.div`
    display: none;
`

function TilesBuffer() {
	return (
		<Container>
            <img className="dungeon" alt="" src={Dungeon} />
            <img className="dungeonItems" alt="" src={DungeonItems} />
            <img className="player" alt="" src={Player} />
            <img className="monster1" alt="" src={Monster1} />
            <img className="chestOpen" alt="" src={ChestOpen} />
            <img className="chestClosed" alt="" src={chestClosed} />
		</Container>
	);
}

export default TilesBuffer;