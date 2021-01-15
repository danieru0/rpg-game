import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playerPosition } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface IPlayerState {
    x: number;
    y: number;
}

const initialState: IPlayerState = {
    x: 144,
    y: 144,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerPosition: (state, action: PayloadAction<playerPosition>) => {
            const { x, y } = action.payload;
            state.x = x;
            state.y = y;
        }
    }
})

export const { setPlayerPosition } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;