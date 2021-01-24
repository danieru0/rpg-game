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
    armor_hp: number;
    maxHP: number;
    base_attack: number;
    weapon_attack: number;
    def: number;
    money: number;
    equipmnent: {
        weapon: {
            name: string;
            attack: number;
            imgName: string;
            id: number;
            type: string;
        } | null;
        armor: {
            name: string;
            hp: number;
            imgName: string;
            id: number;
            type: string;
        } | null;
        shield: {
            name: string;
            def: number;
            imgName: string;
            id: number;
            type: string;
        }
    }
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
    hp: 40,
    armor_hp: 10,
    maxHP: 40,
    base_attack: 5,
    weapon_attack: 3,
    def: 1,
    money: 0,
    equipmnent: {
        weapon: {
            name: "Drewniany miecz",
            attack: 3,
            imgName: ".weapon1",
            id: 0,
            type: "weapon"
        },
        armor: {
            name: "Niebieska kurtka",
            hp: 10,
            imgName: ".armor1",
            id: 0,
            type: "armor"
        },
        shield: {
            name: "Drewniana tarcza",
            def: 1,
            imgName: ".shield1",
            id: 0,
            type: "shield"
        }
    }
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