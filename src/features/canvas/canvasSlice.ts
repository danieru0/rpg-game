import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { canvasSize } from './payloadActionTypes';
import { RootState } from '../../app/store';
import maps from '../../assets/maps/maps';

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
    allImagesToLoad: 10
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
        saveCanvas: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                maps[action.payload].viewport = {...maps[action.payload].viewport, x: current(state).viewport.x, y: current(state).viewport.y};
            }
        }
    }
})

export const { setCanvasSize, setViewportPositionX, setViewportPositionY, resetViewport, setImagesLoaded, saveCanvas } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;