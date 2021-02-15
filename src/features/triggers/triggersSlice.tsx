import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { MapTriggers } from '../../assets/maps/mapsInterfaces';
import maps from '../../assets/maps/maps';
import { showModal } from '../modal/modalSlice';
import { setCanMove } from '../player/playerSlice';

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
        }
    }
});

export const triggerActions = (index: number): AppThunk => (dispatch, getState) => {
    const triggerState = getState().triggers.triggers;

    if (triggerState) {
        const trigger = triggerState[index];

        switch(trigger.type) {
            case "modal-exit":
                dispatch(showModal({type: trigger.type, value: trigger.value}));
                dispatch(setCanMove(false));
                break;
            default: return false;
        }
    }

}

export const { setTriggers } = triggersSlice.actions;

export const selectTriggers = (state: RootState) => state.triggers;

export default triggersSlice.reducer;