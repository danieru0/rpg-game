import React from 'react';
import styled from 'styled-components';

import Canvas from './components/organisms/Canvas';
import TilesBuffer from './components/organisms/TilesBuffer';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
`

function App() {
	return (
		<Container>
			<TilesBuffer />
			<Canvas />
		</Container>
  	);
}

export default App;