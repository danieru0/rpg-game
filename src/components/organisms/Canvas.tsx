import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer } from '../../features/player/playerSlice';
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
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const viewportRef = useRef<HTMLDivElement>(null!);

	const draw = useCallback(() => {
		const ctx = canvasRef.current.getContext('2d')!;

		ctx.imageSmoothingEnabled = false;

		ctx.fillStyle = mapSelector.backgroundColor;
		ctx.fillRect(0, 0, mapSelector.width, mapSelector.height);

		for (let index = 0; index < mapSelector.layers.floor.length - 1; index++) {
			const value = mapSelector.layers.floor[index];
			const x = (index % mapSelector.columns) * canvasSelector.tileSize;
			const y = Math.floor(index / mapSelector.columns) * canvasSelector.tileSize;
			
			ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['floor'][value].left, tilesPositions[mapSelector.tileName]['floor'][value].top, 16, 16, x, y, canvasSelector.tileSize, canvasSelector.tileSize);
		}

		ctx.drawImage(document.querySelector('.player') as HTMLImageElement, 0, 0, 16, 16, playerSelector.x, playerSelector.y, canvasSelector.tileSize, canvasSelector.tileSize);

		for (let index = 0; index < mapSelector.layers.walls.length - 1; index++) {
			const value = mapSelector.layers.walls[index];
			const x = (index % mapSelector.columns) * canvasSelector.tileSize;
			const y = Math.floor(index / mapSelector.columns) * canvasSelector.tileSize;
			
			ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['walls'][value].left, tilesPositions[mapSelector.tileName]['walls'][value].top, 16, 16, x, y, canvasSelector.tileSize, canvasSelector.tileSize);
		}
	}, [playerSelector.x, playerSelector.y, mapSelector.width, mapSelector.tileName, mapSelector.layers, mapSelector.backgroundColor, mapSelector.columns, mapSelector.height, canvasSelector.tileSize])

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