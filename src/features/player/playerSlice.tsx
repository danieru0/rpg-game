import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { playerPosition, clickedIndex, giveItem } from './payloadActionTypes';
import { RootState } from '../../app/store';
import { weapons, shields, armors } from '../../assets/items/items';
import maps from '../../assets/maps/maps';
import { calculateExpNeeded, calculateBaseAttack, calculateMaxHP } from '../../helpers/gameCalculations';

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
    hpAfterDeath: number;
    armor_hp: number;
    maxHP: number;
    exp: number;
    expBeforeDeath: number;
    expNeeded: number;
    base_attack: number;
    inventoryItemsNumber: number;
    weapon_attack: number;
    canMove: boolean;
    def: number;
    money: number;
    moneyBeforeDeath: number;
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
    lvl: 30,
    hp: 1200,
    hpAfterDeath: 0,
    armor_hp: 300,
    canMove: true,
    maxHP: 1200,
    exp: 0,
    expBeforeDeath: 0,
    expNeeded: 930,
    base_attack: 100,
    inventoryItemsNumber: 0,
    weapon_attack: 90,
    def: 90,
    money: 542717,
    moneyBeforeDeath: 542717,
    equipmnent: {
        weapon: {
            id: 1,
            type: "weapon",
            attack: 90,
            imgName: ".weapon2",
            name: "Master sword"
        },
        armor: {
            id: 1,
            type: "armor",
            hp: 300,
            imgName: ".armor2",
            name: "Master armor"
        },
        shield: {
            id: 1,
            type: "shield",
            def: 90,
            imgName: ".shield2",
            name: "Master shield"
        }
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
        initPlayerStats: state => {
            state.money = 542717;
            state.def = 90;
            state.lvl = 30;
            state.hp = 1200;
            state.maxHP = 1200;
            state.expNeeded = 930;
            state.base_attack = 100;
            state.weapon_attack = 90;
            state.equipmnent = {
                weapon: {
                    id: 1,
                    type: "weapon",
                    attack: 90,
                    imgName: ".weapon2",
                    name: "Master sword"
                },
                armor: {
                    id: 1,
                    type: "armor",
                    hp: 300,
                    imgName: ".armor2",
                    name: "Master armor"
                },
                shield: {
                    id: 1,
                    type: "shield",
                    def: 90,
                    imgName: ".shield2",
                    name: "Master shield"
                }        
            }
        },
        resetPlayerPosition: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.x = maps[action.payload].playerXStart;
                state.y = maps[action.payload].playerYStart;
                state.currentIndex = maps[action.payload].playerStartIndex;
            }
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
            state.inventoryItemsNumber -= 1;
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

                    if (state.hp > state.maxHP) {
                        state.hp = state.hp - state.equipmnent.armor?.hp!;
                    }

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
        takeMoneyAwayBeforeDeath: state => {
            state.money -= state.moneyBeforeDeath;
            state.moneyBeforeDeath = 0;
        },
        clearHpAfterDeath: state => {
            state.hpAfterDeath = state.hp;
        },
        setHpAfterDeath: state => {
            state.hp = state.hpAfterDeath;
        },
        giveMoney: (state, action: PayloadAction<number>) => {
            state.money += action.payload;
        },
        giveMoneyBeforeDeath: (state, action: PayloadAction<number>) => {
            state.moneyBeforeDeath += action.payload;
        },
        clearMoneyBeforeDeath: state => {
            state.moneyBeforeDeath = 0;
        },
        giveExp: (state, action: PayloadAction<number>) => {
            if (state.exp + action.payload >= state.expNeeded) {
                state.lvl += 1;
                state.expNeeded = calculateExpNeeded(state.lvl);
                state.exp = 0;
                state.expBeforeDeath = 0;
                state.base_attack = calculateBaseAttack(state.lvl);
                state.maxHP = calculateMaxHP(state.lvl);
            } else {
                state.exp += action.payload;
                state.expBeforeDeath += action.payload;
            }
        },
        removeExp: (state, action: PayloadAction<number | null | string>) => {
            if (action.payload === null) {
                state.exp -= state.expBeforeDeath;
                state.expBeforeDeath = 0;
            } else if ('afterDeath') {
                state.expBeforeDeath = 0;
            }
        },
        resetPlayer: state => {
            state.lvl = 1;
            state.exp = 0;
            state.expBeforeDeath = 0;
            state.expNeeded = calculateExpNeeded(state.lvl);
            state.maxHP = calculateMaxHP(state.lvl);
            state.hp = calculateMaxHP(state.lvl);
            state.hpAfterDeath = calculateMaxHP(state.lvl);
            state.armor_hp = 0;
            state.base_attack = calculateBaseAttack(state.lvl);
            state.armor_hp = 0;
            state.weapon_attack = 0;
            state.money = 0;
            state.moneyBeforeDeath = 0;
            state.def = 0;

            for (let i = 0; i < Object.keys(state.inventory).length; i++) {
                state.inventory[i] = null;
            }

            state.inventoryItemsNumber = 0;
            state.equipmnent.armor = null;
            state.equipmnent.shield = null;
            state.equipmnent.weapon = null;
        }
    }
})

export const { setPlayerPosition, setClickedIndex, clearMoneyBeforeDeath, clearHpAfterDeath, setHpAfterDeath, initPlayerStats, hitPlayer, setPlayerHp, resetPlayerPosition, giveItems, equipItem, takeOffItem, setNewPositionFromMap, setCanMove, savePlayer, takeMoneyAway, removeItem, giveMoney, giveExp, resetPlayer, removeExp, giveMoneyBeforeDeath, takeMoneyAwayBeforeDeath } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;