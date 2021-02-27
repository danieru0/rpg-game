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
import NpcShop from '../../assets/entites/npc-shop.png';
import NpcShopLeft from '../../assets/entites/npc-shopLeft.png';
import NpcHeal from '../../assets/entites/npc-heal.png';
import NpcHealLeft from '../../assets/entites/npc-healLeft.png';
import HealPotionSmall from '../../assets/items/healPotionSmall.png';
import HealPotionBig from '../../assets/items/healPotionBig.png';
import NpcDummy1 from '../../assets/entites/npc-dummy1.png';
import NpcDummy1Left from '../../assets/entites/npc-dummy1left.png';
import NpcDummy2 from '../../assets/entites/npc-dummy2.png';
import NpcDummy2Left from '../../assets/entites/npc-dummy2left.png';
import NpcDummy3 from '../../assets/entites/npc-dummy3.png';
import NpcDummy3Left from '../../assets/entites/npc-dummy3left.png';
import NpcDummy4 from '../../assets/entites/npc-dummy4.png';
import NpcDummy4Left from '../../assets/entites/npc-dummy4left.png';

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
            <img onLoad={handleImageLoad} className="npc-shop" alt="" src={NpcShop} />
            <img onLoad={handleImageLoad} className="npc-shopLeft" alt="" src={NpcShopLeft} />
            <img onLoad={handleImageLoad} className="npc-heal" alt="" src={NpcHeal} />
            <img onLoad={handleImageLoad} className="npc-healLeft" alt="" src={NpcHealLeft} />
            <img onLoad={handleImageLoad} className="healPotionSmall" alt="" src={HealPotionSmall} />
            <img onLoad={handleImageLoad} className="healPotionBig" alt="" src={HealPotionBig} />
            <img onLoad={handleImageLoad} className="npcDummy1" alt="" src={NpcDummy1} />
            <img onLoad={handleImageLoad} className="npcDummy2" alt="" src={NpcDummy2} />
            <img onLoad={handleImageLoad} className="npcDummy3" alt="" src={NpcDummy3} />
            <img onLoad={handleImageLoad} className="npcDummy4" alt="" src={NpcDummy4} />
            <img onLoad={handleImageLoad} className="npcDummy1Left" alt="" src={NpcDummy1Left} />
            <img onLoad={handleImageLoad} className="npcDummy2Left" alt="" src={NpcDummy2Left} />
            <img onLoad={handleImageLoad} className="npcDummy3Left" alt="" src={NpcDummy3Left} />
            <img onLoad={handleImageLoad} className="npcDummy4Left" alt="" src={NpcDummy4Left} />
		</Container>
	);
}

export default TilesBuffer;