import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import canvasReducer from '../features/canvas/canvasSlice';
import mapReducer from '../features/map/mapSlice';

export const store = configureStore({
  	reducer: {
		counter: counterReducer,
		canvas: canvasReducer,
		map: mapReducer
  	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  	ReturnType,
  	RootState,
  	unknown,
  	Action<string>
>;
