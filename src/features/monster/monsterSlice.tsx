import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { monsterPosition, closeToPlayer, hitMonsterInterface } from './payloadActionTypes';
import { RootState } from '../../app/store';

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
    blockedIndexes: number[];
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
    blockedIndexes: [155, 230]
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

            state.blockedIndexes = state.blockedIndexes.filter(item => item !== monster.currentIndex);
            state.blockedIndexes.push(index);

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
            delete state.monsters[action.payload];

            Object.keys(state.monstersAreaDetection.x).forEach((key) => {
                state.monstersAreaDetection.x[parseInt(key)].ids = state.monstersAreaDetection.x[parseInt(key)].ids.filter(id => id !== action.payload);
            })

            Object.keys(state.monstersAreaDetection.y).forEach((key) => {
                state.monstersAreaDetection.y[parseInt(key)].ids = state.monstersAreaDetection.y[parseInt(key)].ids.filter(id => id !== action.payload);
            });
        }
    }
})

export const { setMonsterPosition, setMonsterCloseToPlayer, hitMonster, destroyMonster } = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monster;

export default monsterSlice.reducer;