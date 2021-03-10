import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { changeMapInterface, audioRefreshTypes, killMonsterInterface, healPlayerInterface } from './payloadActionTypes';
import { saveCanvas, resetViewport, setCanvas } from '../canvas/canvasSlice';
import { addMessage } from '../console/consoleSlice';
import { saveMap, setMap } from '../map/mapSlice';
import { clearMonstersCloseToPlayer, destroyMonster, resetMonstersInDungeon, saveMonsters, setMonsters } from '../monster/monsterSlice';
import { giveExp, giveMoney, resetPlayer, resetPlayerPosition, savePlayer, setCanMove, setNewPositionFromMap, setPlayerHp, takeMoneyAway } from '../player/playerSlice';
import { setTriggers } from '../triggers/triggersSlice';
import { hideModal } from '../modal/modalSlice';

interface IGlobalSlice {
    refresh: {
        chest: string;
    };
    blackScreen: string;
}

const initialState: IGlobalSlice = {
    refresh: {
        chest: ''
    },
    blackScreen: 'hidden'
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAudioRefresh: (state, action: PayloadAction<audioRefreshTypes>) => {
            state.refresh[action.payload] = Math.random().toString();
        },
        setBlackScreen: (state, action: PayloadAction<string>) => {
            state.blackScreen = action.payload;
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
    dispatch(resetPlayerPosition(name));
    dispatch(resetViewport(name));
    dispatch(hideModal());
    dispatch(setCanMove(true));
}

export const beginEvent = (): AppThunk => (dispatch) => {
    dispatch(setBlackScreen('visible'));
    dispatch(setMap('map4'));
    dispatch(setNewPositionFromMap('map4'));
    dispatch(setMonsters('map4'));
    dispatch(resetViewport('map4'));
    dispatch(setCanvas('map4'));
    dispatch(setTriggers('map4'));
    dispatch(resetPlayer());
    dispatch(setCanMove(true));
    dispatch(setBlackScreen('fadeOut'));

    setTimeout(() => {
        dispatch(setBlackScreen('hidden'));
    }, 5000);

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

export const { setAudioRefresh, setBlackScreen } = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;