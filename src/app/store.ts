import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import canvasReducer from '../features/canvas/canvasSlice';
import mapReducer from '../features/map/mapSlice';
import playerReducer from '../features/player/playerSlice';
import monsterReducer from '../features/monster/monsterSlice';
import itemInfoHoverReducer from '../features/itemInfoHover/itemInfoHoverSlice';
import itemContextMenuReducer from '../features/itemContextMenu/itemContextMenuSlice';

export const store = configureStore({
  	reducer: {
		canvas: canvasReducer,
		map: mapReducer,
		player: playerReducer,
		monster: monsterReducer,
		itemInfoHover: itemInfoHoverReducer,
		itemContextMenu: itemContextMenuReducer
  	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  	ReturnType,
  	RootState,
  	unknown,
  	Action<string>
>;
