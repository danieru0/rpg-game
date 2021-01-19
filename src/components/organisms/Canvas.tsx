import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer } from '../../features/player/playerSlice';
import { selectMonster } from '../../features/monster/monsterSlice';
import tilesPositions from '../../assets/tiles/tilesPositions';
import styled from 'styled-components';

interface IViewportProps {
	width: number;
	height: number;
}

const Viewport = styled.div<IViewportProps>`
	width: ${({width}) => width}px;
	height: ${({height}) => height}px;
	overflow: hidden;
`

function Canvas() {
	const canvasSelector = useSelector(selectCanvas);
	const mapSelector = useSelector(selectMap);
	const playerSelector = useSelector(selectPlayer);
	const monsterSelector = useSelector(selectMonster);
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const viewportRef = useRef<HTMLDivElement>(null!);

	const draw = useCallback(() => {
		const ctx = canvasRef.current.getContext('2d')!;

		ctx.imageSmoothingEnabled = false;

		ctx.fillStyle = mapSelector.backgroundColor;
		ctx.fillRect(0, 0, mapSelector.width, mapSelector.height);

		mapSelector.layers.floor.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['floor'][value].left, tilesPositions[mapSelector.tileName]['floor'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			});
		})

		ctx.drawImage(document.querySelector('.player') as HTMLImageElement, 0, 0, 16, 16, playerSelector.x, playerSelector.y, canvasSelector.tileSize, canvasSelector.tileSize);

		for (let [key, value] of Object.entries(monsterSelector.monsters)) { //eslint-disable-line
			ctx.drawImage(document.querySelector(value.entityImage) as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
		}


		mapSelector.layers.walls.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['walls'][value].left, tilesPositions[mapSelector.tileName]['walls'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			})
		})
	}, [playerSelector.x, playerSelector.y, mapSelector.width, mapSelector.tileName, mapSelector.layers, mapSelector.backgroundColor, mapSelector.height, canvasSelector.tileSize, monsterSelector.monsters])

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			requestAnimationFrame(draw);
		}
	}, [canvasRef, draw]);

	useEffect(() => {
		if (viewportRef && viewportRef.current) {
			viewportRef.current.scrollLeft = canvasSelector.viewport.x;
			viewportRef.current.scrollTop = canvasSelector.viewport.y;
		}
	}, [viewportRef, playerSelector.x, playerSelector.y]); //eslint-disable-line

	return (
		<Viewport ref={viewportRef} width={canvasSelector.viewport.width} height={canvasSelector.viewport.height}>
			<canvas ref={canvasRef} width={canvasSelector.width} height={canvasSelector.height}></canvas>
		</Viewport>
	);
}

export default Canvas;