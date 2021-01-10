import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMap } from '../../features/map/mapSlice';
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
	const canvasRef = useRef<HTMLCanvasElement>(null!);

	const draw = () => {
		const ctx = canvasRef.current.getContext('2d')!;

		ctx.imageSmoothingEnabled = false;

		ctx.fillStyle = mapSelector.backgroundColor;
		ctx.fillRect(0, 0, mapSelector.width, mapSelector.height);

		requestAnimationFrame(draw);
	}

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			requestAnimationFrame(draw);
		}
	}, [canvasRef]); //eslint-disable-line

	return (
		<Viewport width={canvasSelector.viewport.width} height={canvasSelector.viewport.height}>
			<canvas ref={canvasRef} width={canvasSelector.width} height={canvasSelector.height}></canvas>
		</Viewport>
	);
}

export default Canvas;