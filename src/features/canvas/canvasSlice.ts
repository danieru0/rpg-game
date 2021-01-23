import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { canvasSize } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface ICanvasState {
    width: number;
    height: number;
    viewport: {
        width: 816,
        height: 816,
        x: number;
        y: number;
        refresh: number;
    };
    map: string;
    tileSize: number;
    mapLoaded: boolean;
    imagesLoaded: boolean;
}

const initialState: ICanvasState = {
    width: 1440,
    height: 1440,
    viewport: {
        width: 816,
        height: 816,
        x: 0,
        y: 0,
        refresh: 0
    },
    map: "map1",
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
        setViewportPositionX: (state, action: PayloadAction<number>) => {
            state.viewport.x = action.payload;
        },
        setViewportPositionY: (state, action: PayloadAction<number>) => {
            state.viewport.y = action.payload;
        },
        resetViewport: (state) => {
            state.viewport.x = 0;
            state.viewport.y = 0;
            state.viewport.refresh = Math.random();
        }
    }
})

export const { setCanvasSize, setViewportPositionX, setViewportPositionY, resetViewport } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;