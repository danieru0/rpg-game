import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMap } from './features/map/mapSlice';

import StartGame from './components/organisms/StartGame';
import Canvas from './components/organisms/Canvas';
import TilesBuffer from './components/organisms/ImagesBuffer';
import PlayerMovement from './components/organisms/PlayerMovement';
import MonsterPlayerDetection from './components/organisms/MonsterPlayerDetection';
import UserClickHandler from './components/organisms/UserClickHandler';
import LeftSide from './components/organisms/LeftSide';
import RightSide from './components/organisms/RightSide';
import ItemInfoHover from './components/organisms/ItemInfoHover';
import ItemContextMenu from './components/organisms/ItemContextMenu'
import Modal from './components/organisms/Modal';
import AudioHandler from './components/organisms/AudioHandler';
import BlackScreen from './components/organisms/BlackScreen';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background-color: ${({theme}) => theme.primary};
`

function App() {
	const mapSelector = useSelector(selectMap);

	if (mapSelector.name === '') {
		return <StartGame />
	} else {		
		return (
			<Container>
				<BlackScreen />
				<Modal />
				<ItemContextMenu />
				<ItemInfoHover />
				<UserClickHandler />
				<MonsterPlayerDetection />
				<PlayerMovement />
				<TilesBuffer />
				<LeftSide />
				<Canvas />
				<RightSide />
				<AudioHandler />
			</Container>
		  );
	}

}

export default App;