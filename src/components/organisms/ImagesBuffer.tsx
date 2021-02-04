import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setImagesLoaded } from '../../features/canvas/canvasSlice';

import Dungeon from '../../assets/tiles/dungeon.png';
import Village from '../../assets/tiles/village.png';
import DungeonItems from '../../assets/tiles/dungeonItems.png';
import Player from '../../assets/entites/player.png';
import Monster1 from '../../assets/entites/monster-1.png';
import ChestOpen from '../../assets/items/chestOpen.png';
import chestClosed from '../../assets/items/chestClosed.png';
import Weapon1 from '../../assets/items/weapon1.png';
import Armor1 from '../../assets/items/armor1.png';
import Shield1 from '../../assets/items/shield1.png';

const Container = styled.div`
    display: none;
`

function TilesBuffer() {
    const dispatch = useDispatch();

    const handleImageLoad = () => {
        dispatch(setImagesLoaded());
    }

	return (
		<Container>
            <img onLoad={handleImageLoad} className="dungeon" alt="" src={Dungeon} />
            <img onLoad={handleImageLoad} className="village" alt="" src={Village} />
            <img onLoad={handleImageLoad} className="dungeonItems" alt="" src={DungeonItems} />
            <img onLoad={handleImageLoad} className="player" alt="" src={Player} />
            <img onLoad={handleImageLoad} className="monster1" alt="" src={Monster1} />
            <img onLoad={handleImageLoad} className="chestOpen" alt="" src={ChestOpen} />
            <img onLoad={handleImageLoad} className="chestClosed" alt="" src={chestClosed} />
            <img onLoad={handleImageLoad} className="weapon1" alt="" src={Weapon1} />
            <img onLoad={handleImageLoad} className="armor1" alt="" src={Armor1} />
            <img onLoad={handleImageLoad} className="shield1" alt="" src={Shield1} />
		</Container>
	);
}

export default TilesBuffer;