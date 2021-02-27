import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { canvasSize } from './payloadActionTypes';
import { RootState } from '../../app/store';
import maps from '../../assets/maps/maps';

interface ICanvasState {
    width: number;
    height: number;
    viewport: {
        width: number;
        height: number;
        x: number;
        y: number;
        refresh: number;
    };
    map: string;
    tileSize: number;
    mapLoaded: boolean;
    imagesLoaded: number;
    allImagesToLoad: number;
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
    imagesLoaded: 0,
    allImagesToLoad: 25
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
        resetViewport: (state, action: PayloadAction<string | null>) => {
            state.viewport.x = action.payload ? maps[action.payload as string].viewport.x : 0;
            state.viewport.y = action.payload ? maps[action.payload as string].viewport.y : 0;
            state.viewport.refresh = Math.random();
        },
        setImagesLoaded: (state) => {
            state.imagesLoaded += 1;
        },
        setCanvas: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.width = maps[action.payload].width;
                state.height = maps[action.payload].height;
            }
        },
        saveCanvas: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                maps[action.payload].viewport = {...maps[action.payload].viewport, x: current(state).viewport.x, y: current(state).viewport.y};
            }
        }
    }
})

export const { setCanvasSize, setViewportPositionX, setViewportPositionY, resetViewport, setImagesLoaded, saveCanvas, setCanvas } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;