import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playerPosition, clickedIndex } from './payloadActionTypes';
import { RootState } from '../../app/store';

interface IPlayerState {
    x: number;
    y: number;
    xStart: number;
    yStart: number;
    clickedIndex: {
        index: number;
        refresh: number;
    }
    currentIndex: number;
    startIndex: number;
    lvl: number;
    hp: number;
    maxHP: number;
    base_attack: number;
    weapon_attack: number;
    def: number;
    money: number;
}

const initialState: IPlayerState = {
    x: 144,
    y: 144,
    xStart: 144,
    yStart: 144,
    clickedIndex: {
        index: 0,
        refresh: 0
    },
    currentIndex: 93,
    startIndex: 93,
    lvl: 1,
    hp: 30,
    maxHP: 30,
    base_attack: 5,
    weapon_attack: 0,
    def: 0,
    money: 0
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
        },
        hitPlayer: (state, action: PayloadAction<number>) => {
            state.hp -= action.payload;
        },
        setPlayerHp: (state, action: PayloadAction<number | null>) => {
            if (action.payload) {
                state.hp = action.payload;
            } else {
                state.hp = state.maxHP;
            }
        },
        resetPlayerPosition: (state) => {
            state.x = state.xStart;
            state.y = state.yStart;
            state.currentIndex = state.startIndex;
        }
    }
})

export const { setPlayerPosition, setClickedIndex, hitPlayer, setPlayerHp, resetPlayerPosition } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;