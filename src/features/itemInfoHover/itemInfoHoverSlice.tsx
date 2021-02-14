import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { WearableItem, setItemInterface } from './payloadActionTypes';

interface IItemInfoHover {
    x: number;
    y: number;
    type: string;
    details: WearableItem;
}

const initialState: IItemInfoHover = {
    x: -9999,
    y: -9999,
    details: {
        name: "",
        buffName: "",
        buffValue: 0,
        rarity: "",
        money: 0,
        lvl: 0
    },
    type: '',
}

export const itemInfoHoverSlice = createSlice({
    name: 'itemInfoHover',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<setItemInterface>) => {
            const { x, y, type, details } = action.payload;

            state.x = x;
            state.y = y;
            state.type = type;
            state.details = details;

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