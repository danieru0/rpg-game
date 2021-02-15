import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { playerPosition, clickedIndex, giveItem } from './payloadActionTypes';
import { RootState } from '../../app/store';
import { weapons, shields, armors } from '../../assets/items/items';
import maps from '../../assets/maps/maps';

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
    exp: number;
    expNeeded: number;
    base_attack: number;
    inventoryItemsNumber: number;
    weapon_attack: number;
    canMove: boolean;
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
            slotId: number;
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
    hp: 20,
    armor_hp: 0,
    canMove: true,
    maxHP: 20,
    exp: 0,
    expNeeded: 20,
    base_attack: 5,
    inventoryItemsNumber: 0,
    weapon_attack: 0,
    def: 0,
    money: 50,
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
            if (action.payload !== null) {
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
        setNewPositionFromMap: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.x = maps[action.payload].playerXStart;
                state.y = maps[action.payload].playerYStart;
                state.currentIndex = maps[action.payload].playerStartIndex;
                state.startIndex = maps[action.payload].playerStartIndex;
            }
        },
        giveItems: (state, action: PayloadAction<giveItem>) => {
            if (state.inventoryItemsNumber < 21) {
                for (let i = 0; i < Object.keys(state.inventory).length; i++) {
                    if (state.inventory[i] === null) {
                        state.inventory[i] = {
                            id: action.payload.id,
                            type: action.payload.type,
                            slotId: i
                        }

                        state.inventoryItemsNumber += 1;

                        break;
                    }
                }
            }
        },
        equipItem: (state, action: PayloadAction<number>) => {
            const item = state.inventory[action.payload];

            if (item) {
                switch(item.type) {
                    case "weapon":
                        if (state.equipmnent.weapon === null && weapons[item.id].lvl <= state.lvl) {
                            state.equipmnent.weapon = weapons[item.id];
                            state.weapon_attack = weapons[item.id].attack;
                            state.inventory[action.payload] = null;
                            state.inventoryItemsNumber -= 1;
                        }
                        break;
                    case "armor":
                        if (state.equipmnent.armor === null && armors[item.id].lvl <= state.lvl) {
                            state.equipmnent.armor = armors[item.id];
                            state.maxHP += armors[item.id].hp;
                            state.inventory[action.payload] = null;
                            state.inventoryItemsNumber -= 1;
                        }
                        break;
                    case "shield":
                        if (state.equipmnent.shield === null && shields[item.id].lvl <= state.lvl) {
                            state.equipmnent.shield = shields[item.id];
                            state.def = shields[item.id].def;
                            state.inventory[action.payload] = null;
                            state.inventoryItemsNumber -= 1;
                        }
                        break;
                }
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.inventory[action.payload] = null;
        },
        takeOffItem: (state, action: PayloadAction<string>) => {
            const itemType = action.payload;
            let itemId: number = 0;

            switch(action.payload) {
                case "weapon":
                    itemId = state.equipmnent.weapon?.id!;
                    state.weapon_attack = 0;
                    state.equipmnent.weapon = null;
                    break;
                case "armor":
                    itemId = state.equipmnent.armor?.id!;
                    state.maxHP -= state.equipmnent.armor?.hp!;
                    state.equipmnent.armor = null;
                    break;
                case "shield":
                    itemId = state.equipmnent.shield?.id!;
                    state.def = 0;
                    state.equipmnent.shield = null;
                    break;
            }

            if (state.inventoryItemsNumber < 21) {
                for (let i = 0; i < Object.keys(state.inventory).length; i++) {
                    if (state.inventory[i] === null) {
                        state.inventory[i] = {
                            id: itemId,
                            type: itemType,
                            slotId: i
                        }

                        state.inventoryItemsNumber += 1;

                        break;
                    }
                }
            }
        },
        setCanMove: (state, action: PayloadAction<boolean>) => {
            state.canMove = action.payload;
        },
        savePlayer: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                maps[action.payload].playerXStart = current(state).x;
                maps[action.payload].playerYStart = current(state).y;
                maps[action.payload].playerStartIndex = current(state).currentIndex;
            }
        },
        takeMoneyAway: (state, action: PayloadAction<number>) => {
            state.money -= action.payload;
        },
        giveMoney: (state, action: PayloadAction<number>) => {
            state.money += action.payload;
        },
        giveExp: (state, action: PayloadAction<number>) => {
            if (state.exp + action.payload >= state.expNeeded) {
                state.lvl += 1;
                state.expNeeded = 20 * (state.lvl * 1.5);
                state.exp = 0;
                state.base_attack = Math.floor((5 * state.lvl) / 1.5);
                state.maxHP = Math.floor((30 * state.lvl) / 1.5);
            } else {
                state.exp += action.payload;
            }
        }
    }
})

export const { setPlayerPosition, setClickedIndex, hitPlayer, setPlayerHp, resetPlayerPosition, giveItems, equipItem, takeOffItem, setNewPositionFromMap, setCanMove, savePlayer, takeMoneyAway, removeItem, giveMoney, giveExp } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;