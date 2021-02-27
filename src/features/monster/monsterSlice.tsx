import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { monsterPosition, closeToPlayer, hitMonsterInterface } from './payloadActionTypes';
import { RootState } from '../../app/store';
import maps from '../../assets/maps/maps'; 
import { MonsterDetails } from '../../assets/maps/mapsInterfaces';

const initialState: MonsterDetails = {
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
            def: 0,
            speed: 500
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
            def: 0,
            speed: 500
        },
        2: {
            x: 768,
            y: 96,
            entityImage: ".monster1",
            currentIndex: 76,
            seeRange: 3,
            closeToPlayer: false,
            id: 2,
            lvl: 1,
            hp: 24,
            maxHP: 24,
            attack: 5,
            def: 0,
            speed: 500
        },
        3: {
            x: 720,
            y: 240,
            entityImage: ".monster1",
            currentIndex: 165,
            seeRange: 3,
            closeToPlayer: false,
            id: 3,
            lvl: 1,
            hp: 24,
            maxHP: 24,
            attack: 5,
            def: 0,
            speed: 500
        }
    },
    blockedIndexesMonsters: [155, 230, 76, 165],
    monstersCloseToPlayer: []
}

export const monsterSlice = createSlice({
    name: 'monster',
    initialState,
    reducers: {
        setMonsterPosition: (state, action: PayloadAction<monsterPosition>) => {
            const { x, y, id, index } = action.payload;
            const monster = state.monsters[id];

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

            console.log(value);

            state.monsters[id].hp -= value;
        },
        destroyMonster: (state, action: PayloadAction<number>) => {
            state.blockedIndexesMonsters = state.blockedIndexesMonsters.filter(id => id !== state.monsters[action.payload].currentIndex);

            delete state.monsters[action.payload];
        },
        resetMonstersInDungeon: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.monsters = maps[action.payload].monsters;
                state.blockedIndexesMonsters = maps[action.payload].blockedIndexesMonsters;
                state.monstersCloseToPlayer = [];
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
        },
        setMonsters: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                const { monsters, monstersCloseToPlayer, blockedIndexesMonsters } = maps[action.payload];

                state.monsters = monsters;
                state.monstersCloseToPlayer = monstersCloseToPlayer;
                state.blockedIndexesMonsters = blockedIndexesMonsters;
            }
        },
        saveMonsters: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                maps[action.payload].monsters = current(state).monsters;
                maps[action.payload].monstersCloseToPlayer = current(state).monstersCloseToPlayer;
                maps[action.payload].blockedIndexesMonsters = current(state).blockedIndexesMonsters;
            }
        }
    }
})

export const { setMonsterPosition, setMonsterCloseToPlayer, hitMonster, destroyMonster, resetMonstersInDungeon, addMonsterCloseToPlayer, clearMonstersCloseToPlayer, setMonsters, saveMonsters } = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monster;

export default monsterSlice.reducer;