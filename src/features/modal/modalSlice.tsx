import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IShowModal } from './payloadActionTypes';

interface IModalSlice {
    type: string | null;
    value: string[];
}

const initialState: IModalSlice = {
    type: null,
    value: []
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        hideModal: (state) => {
            state.type = null;
        },
        showModal: (state, action: PayloadAction<IShowModal>) => {
            state.type = action.payload.type;
            state.value = action.payload.value ? action.payload.value : [];
        }
    }
});

export const { hideModal, showModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
