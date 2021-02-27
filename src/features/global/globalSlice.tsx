import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { changeMapInterface, audioRefreshTypes, killMonsterInterface, healPlayerInterface } from './payloadActionTypes';
import { saveCanvas, resetViewport, setCanvas } from '../canvas/canvasSlice';
import { addMessage } from '../console/consoleSlice';
import { saveMap, setMap } from '../map/mapSlice';
import { clearMonstersCloseToPlayer, destroyMonster, resetMonstersInDungeon, saveMonsters, setMonsters } from '../monster/monsterSlice';
import { giveExp, giveMoney, resetPlayerPosition, savePlayer, setCanMove, setNewPositionFromMap, setPlayerHp, takeMoneyAway } from '../player/playerSlice';
import { setTriggers } from '../triggers/triggersSlice';
import { hideModal } from '../modal/modalSlice';

interface IGlobalSlice {
    refresh: {
        chest: string;
    }
}

const initialState: IGlobalSlice = {
    refresh: {
        chest: ''
    }
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAudioRefresh: (state, action: PayloadAction<audioRefreshTypes>) => {
            state.refresh[action.payload] = Math.random().toString();
        }
    }
})

export const changeMap = ({newMap, prevMap}: changeMapInterface): AppThunk => (dispatch) => {
    dispatch(addMessage('Changing map...'));
    dispatch(saveMap(prevMap));
    dispatch(saveMonsters(prevMap));
    dispatch(savePlayer(prevMap));
    dispatch(saveCanvas(prevMap));
    dispatch(setMap(newMap));
    dispatch(setNewPositionFromMap(newMap));
    dispatch(setMonsters(newMap));
    dispatch(resetViewport(newMap));
    dispatch(setCanvas(newMap));
    dispatch(setTriggers(newMap));
    dispatch(addMessage('Map changed!'));
}

export const killMonster = ({id, lvl}: killMonsterInterface): AppThunk => (dispatch) => {
    dispatch(clearMonstersCloseToPlayer(id));
    dispatch(destroyMonster(id));
    dispatch(giveExp(lvl * 5));
    dispatch(giveMoney(lvl * 10));
    dispatch(addMessage(`You have gained: ${lvl * 5} exp!`));
    dispatch(addMessage(`You have got: ${lvl * 10} gold!`));
}

export const respawnPlayer = (name: string): AppThunk => (dispatch) => {
    dispatch(addMessage('Respawning...'));
    dispatch(resetMonstersInDungeon(name));
    dispatch(setPlayerHp(null));
    dispatch(resetPlayerPosition());
    dispatch(resetViewport(null));
    dispatch(hideModal());
    dispatch(setCanMove(true));
}

export const healPlayer = ({hp, maxHP, cost, healAmount, money}: healPlayerInterface): AppThunk => (dispatch) => {
    if (money - cost >= 0 && hp !== maxHP) {
        if (hp + healAmount > maxHP) {
            const newHP = (maxHP - hp) + hp;

            dispatch(setPlayerHp(newHP));
            dispatch(takeMoneyAway(cost));
        } else {
            dispatch(setPlayerHp(hp + healAmount));
            dispatch(takeMoneyAway(cost));
        }
    }
}

export const { setAudioRefresh } = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;