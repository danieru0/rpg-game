import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playerPosition, clickedIndex } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface IPlayerState {
    x: number;
    y: number;
    clickedIndex: {
        index: number;
        refresh: number;
    }
    currentIndex: number;
    lvl: number;
    hp: number;
    base_attack: number;
    weapon_attack: number;
    def: number;
}

const initialState: IPlayerState = {
    x: 144,
    y: 144,
    clickedIndex: {
        index: 0,
        refresh: 0
    },
    currentIndex: 93,
    lvl: 1,
    hp: 30,
    base_attack: 5,
    weapon_attack: 0,
    def: 0
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerPosition: (state, action: PayloadAction<playerPosition>) => {
            const { x, y, currentIndex } = action.payload;
            state.x = x;
            state.y = y;
            state.currentIndex = currentIndex;
        },
        setClickedIndex: (state, action: PayloadAction<clickedIndex>) => {
            state.clickedIndex = action.payload;
        }
    }
})

export const { setPlayerPosition, setClickedIndex } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;