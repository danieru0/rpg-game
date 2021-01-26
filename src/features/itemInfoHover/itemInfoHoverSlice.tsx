import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setItemInterface } from './payloadActionTypes';

interface IItemInfoHover {
    x: number;
    y: number;
    name: string;
    buffName: string;
    buffValue: number;
    rarity: string;
}

const initialState: IItemInfoHover = {
    x: 0,
    y: 0,
    name: "Drewniany miecz",
    buffName: "attack",
    buffValue: 3,
    rarity: "white"
}

export const itemInfoHoverSlice = createSlice({
    name: 'itemInfoHover',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<setItemInterface>) => {
            const { x, y, name, buffName, buffValue, rarity } = action.payload;
            state.x = x;
            state.y = y;
            state.name = name;
            state.buffName = buffName;
            state.buffValue = buffValue;
            state.rarity = rarity;
        },
        clearItem: (state) => {
            state.x = -9999;
            state.y = -9999;
        }
    }
});

export const { setItem, clearItem } = itemInfoHoverSlice.actions;

export const selectItemInfoHover = (state: RootState) => state.itemInfoHover;

export default itemInfoHoverSlice.reducer;