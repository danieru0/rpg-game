import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { canvasSize, viewportPosition } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface ICanvasState {
    width: number;
    height: number;
    viewport: {
        width: 816,
        height: 816,
        x: number;
        y: number;
    };
    map: string;
    tileSize: number;
    mapLoaded: boolean;
    imagesLoaded: boolean;
}

const initialState: ICanvasState = {
    width: 800,
    height: 800,
    viewport: {
        width: 816,
        height: 816,
        x: 816,
        y: 816
    },
    map: "mapa1",
    tileSize: 48,
    mapLoaded: true,
    imagesLoaded: true
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvasSize: (state, action: PayloadAction<canvasSize>) => {
            const { width, height } = action.payload;
            state.width = width;
            state.height = height;
        },
        setViewportPosition: (state, action: PayloadAction<viewportPosition>) => {
            const { x, y } = action.payload;
            state.viewport.x = x;
            state.viewport.y = y;
        }
    }
})

export const { setCanvasSize, setViewportPosition } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;