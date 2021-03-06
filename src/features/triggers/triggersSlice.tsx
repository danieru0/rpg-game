import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { MapTriggers } from '../../assets/maps/mapsInterfaces';
import maps from '../../assets/maps/maps';
import { showModal } from '../modal/modalSlice';
import { setCanMove } from '../player/playerSlice';
import { triggerState } from './payloadActionTypes';

const initialState: MapTriggers = {
    triggers: null
}

export const triggersSlice = createSlice({
    name: 'triggers',
    initialState,
    reducers: {
        setTriggers: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                state.triggers = maps[action.payload].triggers;
            }
        },
        setTriggerState: (state, action: PayloadAction<triggerState>) => {
            if (maps[action.payload.map]) {
                state.triggers![action.payload.triggerId].active = action.payload.value;
                maps[action.payload.map].triggers = {...maps[action.payload.map].triggers, [action.payload.triggerId]: {
                    ...maps[action.payload.map].triggers![action.payload.triggerId],
                    active: action.payload.value
                }}
            }
        }
    }
});

export const triggerActions = (index: number): AppThunk => (dispatch, getState) => {
    const triggerState = getState().triggers.triggers;

    if (triggerState) {
        const trigger = triggerState[index];

        if (trigger.active) {
            dispatch(showModal({type: trigger.type, value: trigger.value}));
            dispatch(setCanMove(false));
        }
    }
}

export const { setTriggers, setTriggerState } = triggersSlice.actions;

export const selectTriggers = (state: RootState) => state.triggers;

export default triggersSlice.reducer;