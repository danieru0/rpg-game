import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface IConsoleSlice {
    messages: string[];
}

const initialState: IConsoleSlice = {
    messages: []
}

export const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages = [action.payload, ...state.messages,];
        }
    }
})

export const { addMessage } = consoleSlice.actions;

export const selectConsole = (state: RootState) => state.console;

export default consoleSlice.reducer;