import React from 'react';
import styled from 'styled-components';

import Canvas from './components/organisms/Canvas';
import TilesBuffer from './components/organisms/ImagesBuffer';
import PlayerMovement from './components/organisms/PlayerMovement';
import MonsterPlayerDetection from './components/organisms/MonsterPlayerDetection';
import UserClickHandler from './components/organisms/UserClickHandler';
import LeftSide from './components/organisms/LeftSide';
import RightSide from './components/organisms/RightSide';
import ItemInfoHover from './components/organisms/ItemInfoHover';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background-color: ${({theme}) => theme.primary};
`

function App() {
	return (
		<Container>
			<ItemInfoHover />
			<UserClickHandler />
			<MonsterPlayerDetection />
			<PlayerMovement />
			<TilesBuffer />
			<LeftSide />
			<Canvas />
			<RightSide />
		</Container>
  	);
}

export default App;