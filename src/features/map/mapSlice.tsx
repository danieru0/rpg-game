import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import maps from '../../assets/maps/maps';
import { RootState } from '../../app/store';
import { MapDetails } from '../../assets/maps/mapsInterfaces'; 

const initialState: MapDetails = {
    name: "",
    tileName: "",
    tileNameItems: "",
    tileWidth: 0,
    tileHeight: 0,
    tileSize: 0,
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
    backgroundColor: "",
    musicTheme: '',
    afterDeath: null,
    canMove: true,
    stepSound: '',
    playerXStart: 0,
    playerYStart: 0,
    viewport: {
        x: 0,
        y: 0,
    },
    playerStartIndex: 0,
    layers: {
        blockTiles: {
            firstGrid: 0,
            tileName: "",
            tiles: []
        },
    },
    blockedIndexesMap: [],
    chests: {},
    chestsAreaDetection: {},
    npc: {},
    npcAreaDetection: {},
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMap: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                const { monsters, monstersCloseToPlayer, blockedIndexesMonsters, ...mapInfo } = maps[action.payload];
                return {...mapInfo};
            } else {
                console.error("No map found with this name!");
            }
        },
        openChest: (state, action: PayloadAction<number>) => {
            state.chests[action.payload].open = true;
        },
        saveMap: (state, action: PayloadAction<string>) => {
            if (maps[action.payload]) {
                maps[action.payload].chests = current(state).chests;
            }
        }
    }
})

export const { setMap, openChest, saveMap } = mapSlice.actions;

export const selectMap = (state: RootState) => state.map;

export default mapSlice.reducer;