import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer, setClickedIndex } from '../../features/player/playerSlice';
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
	const dispatch = useDispatch();
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

		mapSelector.layers.blockTiles.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['floor'][value].left, tilesPositions[mapSelector.tileName]['floor'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			});
		})

		mapSelector.layers.floor.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['floor'][value].left, tilesPositions[mapSelector.tileName]['floor'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			});
		})

		ctx.drawImage(document.querySelector('.player') as HTMLImageElement, 0, 0, 16, 16, playerSelector.x, playerSelector.y, canvasSelector.tileSize, canvasSelector.tileSize);
		
		mapSelector.layers.items.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileNameItems}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['items'][value].left, tilesPositions[mapSelector.tileName]['items'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			});
		})

		for (let [key, value] of Object.entries(mapSelector.chests)) { //eslint-disable-line
			ctx.drawImage(document.querySelector(value.open ? '.chestOpen' : '.chestClosed') as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
		}

		for (let [key, value] of Object.entries(monsterSelector.monsters)) { //eslint-disable-line
			ctx.drawImage(document.querySelector(value.entityImage) as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
		}

		mapSelector.layers.walls.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileName}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['walls'][value].left, tilesPositions[mapSelector.tileName]['walls'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			})
		})

		mapSelector.layers.wallsDecoration.forEach((row, y) => {
			row.forEach((value, x) => {
				ctx.drawImage(document.querySelector(`.${mapSelector.tileNameItems}`) as HTMLImageElement, tilesPositions[mapSelector.tileName]['items'][value].left, tilesPositions[mapSelector.tileName]['items'][value].top, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
			});
		})
	}, [playerSelector.x, playerSelector.y, mapSelector.width, mapSelector.tileName, mapSelector.layers, mapSelector.backgroundColor, mapSelector.height, canvasSelector.tileSize, monsterSelector.monsters, mapSelector.tileNameItems, mapSelector.chests])

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			requestAnimationFrame(draw);
		}
	}, [canvasRef, draw]);

	const handleUserClick = useCallback((e) => {
		const offsetLeftWithViewport = canvasRef.current.offsetLeft - canvasSelector.viewport.x;
		const offsetTopWithVieport = canvasRef.current.offsetTop - canvasSelector.viewport.y;
		const x = Math.floor((e.pageX - offsetLeftWithViewport) / 48);
		const y = Math.floor((e.pageY - offsetTopWithVieport) / 48);
		const index = Math.floor(y * mapSelector.rows + x);

		dispatch(setClickedIndex({index: index, refresh: Math.random()}));
	}, [canvasSelector.viewport.x, canvasSelector.viewport.y, mapSelector.rows, dispatch]);


	useEffect(() => {
		let canvas = canvasRef.current;
		if (canvas) {
			canvas.addEventListener('click', handleUserClick);
		}

		return () => canvas.removeEventListener('click', handleUserClick);
	}, [canvasRef, handleUserClick]);

	useEffect(() => {
		if (viewportRef && viewportRef.current) {
			viewportRef.current.scrollLeft = canvasSelector.viewport.x;
			viewportRef.current.scrollTop = canvasSelector.viewport.y;
		}
	}, [viewportRef, playerSelector.x, playerSelector.y, canvasSelector.viewport.refresh]); //eslint-disable-line

	return (
		<Viewport ref={viewportRef} width={canvasSelector.viewport.width} height={canvasSelector.viewport.height}>
			<canvas ref={canvasRef} width={canvasSelector.width} height={canvasSelector.height}></canvas>
		</Viewport>
	);
}

export default Canvas;