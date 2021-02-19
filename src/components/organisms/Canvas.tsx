import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer, setClickedIndex } from '../../features/player/playerSlice';
import { selectMonster } from '../../features/monster/monsterSlice';
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

// temporary change later
type layersNames = "blockTiles" | "floor" | "player" | "items" | "chests" | "monsters" | "walls" | "wallsDecoration";

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

		Object.keys(mapSelector.layers).forEach(item => {
			const layerName = item as layersNames;
			const layer = mapSelector.layers[layerName];

			switch(item) {
				case "player":
					ctx.drawImage(document.querySelector('.player') as HTMLImageElement, 0, 0, 16, 16, playerSelector.x, playerSelector.y, canvasSelector.tileSize, canvasSelector.tileSize);
					break;
				case "item":
					for (let [key, value] of Object.entries(mapSelector.chests)) { //eslint-disable-line
						ctx.drawImage(document.querySelector(value.open ? '.chestOpen' : '.chestClosed') as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
					}
					break;
				case "monsters":
					for (let [key, value] of Object.entries(monsterSelector.monsters)) { //eslint-disable-line
						ctx.drawImage(document.querySelector(value.entityImage) as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
					}
					break;
				case "npc":
					for (let [key, value] of Object.entries(mapSelector.npc)) { //eslint-disable-line
						ctx.drawImage(document.querySelector(value.entityImage) as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
					}
					break;
				case 'chests':
					for (let [key, value] of Object.entries(mapSelector.chests)) { //eslint-disable-line
						ctx.drawImage(document.querySelector(value.open ? '.chestOpen' : '.chestClosed') as HTMLImageElement, 0, 0, 16, 16, value.x, value.y, canvasSelector.tileSize, canvasSelector.tileSize);
					}
					break;
				default:
					if (layer) {
						layer.tiles.forEach((row, y) => {
							row.forEach((value, x) => {
								const left = (value - 1 - layer.firstGrid) % mapSelector.tileWidth;
								const top = Math.floor((value - 1 - left - layer.firstGrid) / mapSelector.tileHeight);
		
								ctx.drawImage(document.querySelector(layer.tileName) as HTMLImageElement, left * 16, top * 16, 16, 16, x * canvasSelector.tileSize, y * canvasSelector.tileSize, canvasSelector.tileSize, canvasSelector.tileSize);
							})
						})
					}
			}
		})
	}, [playerSelector.x, playerSelector.y, mapSelector.width, mapSelector.layers, mapSelector.backgroundColor, mapSelector.height, canvasSelector.tileSize, monsterSelector.monsters, mapSelector.chests, mapSelector.tileHeight, mapSelector.tileWidth, mapSelector.npc])

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			if (canvasSelector.imagesLoaded === canvasSelector.allImagesToLoad) {
				requestAnimationFrame(draw);
			}
		}
	}, [canvasRef, draw, canvasSelector.allImagesToLoad, canvasSelector.imagesLoaded]);

	const handleUserClick = useCallback((e) => {
		const offsetLeftWithViewport = canvasRef.current.offsetLeft - canvasSelector.viewport.x;
		const offsetTopWithVieport = canvasRef.current.offsetTop - canvasSelector.viewport.y;
		let x = Math.floor((e.pageX - offsetLeftWithViewport) / canvasSelector.tileSize);
		x = canvasSelector.width - canvasSelector.viewport.x <= 720 ? x -= 2 : x;
		const y = Math.floor((e.pageY - offsetTopWithVieport) / canvasSelector.tileSize);
		const index = Math.floor(y * mapSelector.rows + x);

		console.log(x, y, index);

		dispatch(setClickedIndex({index: index, refresh: Math.random()}));
	}, [canvasSelector.viewport.x, canvasSelector.viewport.y, mapSelector.rows, dispatch, canvasSelector.width, canvasSelector.tileSize]);


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
			<canvas onContextMenu={(e) => e.preventDefault()} ref={canvasRef} width={canvasSelector.width} height={canvasSelector.height}></canvas>
		</Viewport>
	);
}

export default Canvas;