import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playerPosition } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface IPlayerState {
    x: number;
    y: number;
    clickedIndex: number;
}

const initialState: IPlayerState = {
    x: 144,
    y: 144,
    clickedIndex: 0
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerPosition: (state, action: PayloadAction<playerPosition>) => {
            const { x, y } = action.payload;
            state.x = x;
            state.y = y;
        },
        setClickedIndex: (state, action: PayloadAction<number>) => {
            state.clickedIndex = action.payload;
        }
    }
})

export const { setPlayerPosition, setClickedIndex } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;