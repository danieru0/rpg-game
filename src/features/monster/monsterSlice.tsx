import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { monsterPosition, closeToPlayer, hitMonsterInterface } from './payloadActionTypes';
import { RootState } from '../../app/store';
import maps from '../../assets/maps/maps';

interface IMonsterState {
    monsters: {
        [key: number]: {
            x: number;
            y: number;
            entityImage: string;
            currentIndex: number;
            seeRange: number;
            closeToPlayer: boolean;
            id: number;
            lvl: number;
            hp: number;
            maxHP: number;
            attack: number;
            def: number;
        }
    },
    monstersAreaDetection: {
        x: {
            [key: number]: {
                ids: number[];
            }
        },
        y: {
            [key: number]: {
                ids: number[];
            }
        }
    },
    blockedIndexesMonsters: number[];
    monstersCloseToPlayer: number[];
}

const initialState: IMonsterState = {
    monsters: {
        0: {
            x: 240,
            y: 240,
            entityImage: ".monster1",
            currentIndex: 155,
            seeRange: 3,
            closeToPlayer: false,
            id: 0,
            lvl: 1,
            hp: 24,
            maxHP: 24,
            attack: 5,
            def: 0
        },
        1: {
            x: 960,
            y: 336,
            entityImage: ".monster1",
            currentIndex: 230,
            seeRange: 3,
            closeToPlayer: false,
            id: 1,
            lvl: 1,
            hp: 24,
            maxHP: 24,
            attack: 5,
            def: 0
        }
    },
    monstersAreaDetection: {
        x: {
            96: {
                ids: [0]
            },
            384: {
                ids: [0]
            },
            816: {
                ids: [1]
            },
            1104: {
                ids: [1]
            }
        },
        y: {
            96: {
                ids: [0]
            },
            192: {
                ids: [1]
            },
            384: {
                ids: [0]
            },
            480: {
                ids: [1]
            }
        }
    },
    blockedIndexesMonsters: [155, 230],
    monstersCloseToPlayer: []
}

export const monsterSlice = createSlice({
    name: 'monster',
    initialState,
    reducers: {
        setMonsterPosition: (state, action: PayloadAction<monsterPosition>) => {
            const { x, y, id, index } = action.payload;
            const monster = state.monsters[id];

            if (x !== monster.x) {
                state.monstersAreaDetection.x[monster.x - monster.seeRange * 48].ids = state.monstersAreaDetection.x[monster.x - monster.seeRange * 48].ids.filter(item => item !== id);
                state.monstersAreaDetection.x[monster.x + monster.seeRange * 48].ids = state.monstersAreaDetection.x[monster.x + monster.seeRange * 48].ids.filter(item => item !== id);

                let areaCounter = 1;

                while (areaCounter <= monster.seeRange) {
                    if (!state.monstersAreaDetection.x[x - areaCounter * 48]) {
                        state.monstersAreaDetection.x[x - areaCounter * 48] = {
                            ids: []
                        }
                    }

                    if (!state.monstersAreaDetection.x[x + areaCounter * 48]) {
                        state.monstersAreaDetection.x[x + areaCounter * 48] = {
                            ids: []
                        }
                    }

                    if (!state.monstersAreaDetection.x[x - areaCounter * 48].ids.includes(id)) {
                        state.monstersAreaDetection.x[x - areaCounter * 48].ids.push(id);
                    }

                    if (!state.monstersAreaDetection.x[x + areaCounter * 48].ids.includes(id)) {
                        state.monstersAreaDetection.x[x + areaCounter * 48].ids.push(id);
                    }

                    areaCounter++;
                }
            }

            if (y !== monster.y) {
                state.monstersAreaDetection.y[monster.y - monster.seeRange * 48].ids = state.monstersAreaDetection.y[monster.y - monster.seeRange * 48].ids.filter(item => item !== id);
                state.monstersAreaDetection.y[monster.y + monster.seeRange * 48].ids = state.monstersAreaDetection.y[monster.y + monster.seeRange * 48].ids.filter(item => item !== id);
            
                let areaCounter = 1;

                while (areaCounter <= monster.seeRange) {
                    if (!state.monstersAreaDetection.y[y - areaCounter * 48]) {
                        state.monstersAreaDetection.y[y - areaCounter * 48] = {
                            ids: []
                        }
                    }

                    if (!state.monstersAreaDetection.y[y + areaCounter * 48]) {
                        state.monstersAreaDetection.y[y + areaCounter * 48] = {
                            ids: []
                        }
                    }

                    if (!state.monstersAreaDetection.y[y - areaCounter * 48].ids.includes(id)) {
                        state.monstersAreaDetection.y[y - areaCounter * 48].ids.push(id);
                    }

                    if (!state.monstersAreaDetection.y[y + areaCounter * 48].ids.includes(id)) {
                        state.monstersAreaDetection.y[y + areaCounter * 48].ids.push(id);
                    }

                    areaCounter++;
                }
            }

            state.blockedIndexesMonsters = state.blockedIndexesMonsters.filter(item => item !== monster.currentIndex);
            state.blockedIndexesMonsters.push(index);

            state.monsters[id].x = x;
            state.monsters[id].y = y;
            state.monsters[id].currentIndex = index;
        },
        setMonsterCloseToPlayer: (state, action: PayloadAction<closeToPlayer>) => {
            const { id, value } = action.payload;

            if (id) {
                state.monsters[id].closeToPlayer = value;
            } else {
                Object.keys(state.monsters).forEach((key) => {
                    state.monsters[parseInt(key)].closeToPlayer = value;
                });
            }
        },
        hitMonster: (state, action: PayloadAction<hitMonsterInterface>) => {
            const { id, value } = action.payload;

            state.monsters[id].hp -= value;
        },
        destroyMonster: (state, action: PayloadAction<number>) => {
            Object.keys(state.monstersAreaDetection.x).forEach((key) => {
                state.monstersAreaDetection.x[parseInt(key)].ids = state.monstersAreaDetection.x[parseInt(key)].ids.filter(id => id !== action.payload);
            })

            Object.keys(state.monstersAreaDetection.y).forEach((key) => {
                state.monstersAreaDetection.y[parseInt(key)].ids = state.monstersAreaDetection.y[parseInt(key)].ids.filter(id => id !== action.payload);
            });

            state.blockedIndexesMonsters = state.blockedIndexesMonsters.filter(id => id !== state.monsters[action.payload].currentIndex);

            delete state.monsters[action.payload];
        },
        resetMonstersInDungeon: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.monsters = maps[action.payload].monsters;
                state.monstersAreaDetection = maps[action.payload].monstersAreaDetection;
                state.blockedIndexesMonsters = maps[action.payload].blockedIndexesMonsters;
            }
        },
        addMonsterCloseToPlayer: (state, action: PayloadAction<number>) => {
            if (!state.monstersCloseToPlayer.includes(action.payload)) {
                state.monstersCloseToPlayer = [...state.monstersCloseToPlayer, action.payload];
            }
        },
        clearMonstersCloseToPlayer: (state, action: PayloadAction<number | null>) => {
            if (action.payload) {
                state.monstersCloseToPlayer = state.monstersCloseToPlayer.filter(item => item !== action.payload);
            } else {
                state.monstersCloseToPlayer = [];
            }
        }
    }
})

export const { setMonsterPosition, setMonsterCloseToPlayer, hitMonster, destroyMonster, resetMonstersInDungeon, addMonsterCloseToPlayer, clearMonstersCloseToPlayer } = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monster;

export default monsterSlice.reducer;