import React from 'react';
import styled from 'styled-components';

import Dungeon from '../../assets/tiles/dungeon.png';

const Container = styled.div`
    display: none;
`

function TilesBuffer() {
	return (
		<Container>
            <img className="dungeon" alt="" src={Dungeon} />
		</Container>
	);
}

export default TilesBuffer;