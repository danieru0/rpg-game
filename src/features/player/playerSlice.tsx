import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playerPosition, clickedIndex, giveItem } from './payloadActionTypes';
import { RootState } from '../../app/store';
import { weapons, shields, armors } from '../../assets/items/items';

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
    inventoryItemsNumber: number;
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
        } | null;
    },
    inventory: {
        [key: number]: {
            id: number;
            type: string;
        } | null;
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
    hp: 30,
    armor_hp: 0,
    maxHP: 30,
    base_attack: 5,
    inventoryItemsNumber: 0,
    weapon_attack: 0,
    def: 0,
    money: 0,
    equipmnent: {
        weapon: null,
        armor: null,
        shield: null
    },
    inventory: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null
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
        },
        giveItems: (state, action: PayloadAction<giveItem>) => {
            if (state.inventoryItemsNumber < 21) {
                state.inventory[state.inventoryItemsNumber] = {
                    id: action.payload.id,
                    type: action.payload.type
                }

                state.inventoryItemsNumber += 1;
            }
        }
    }
})

export const { setPlayerPosition, setClickedIndex, hitPlayer, setPlayerHp, resetPlayerPosition, giveItems } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;