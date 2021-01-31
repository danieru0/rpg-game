export interface MonsterDetails {
    monsters: {
        [key: number]: {
            x: number;
            y: number;
            entityImage: string;
            currentIndex: number;
            seeRange: number;
            closeToPlayer: boolean;
            id: number;
            lvl: number;
            hp: number;
            maxHP: number;
            attack: number;
            def: number;
        }
    },
    monstersAreaDetection: {
        x: {
            [key: number]: {
                ids: number[];
            }
        },
        y: {
            [key: number]: {
                ids: number[];
            }
        }
    },
    blockedIndexesMonsters: number[];
    monstersCloseToPlayer: number[];
}

export interface MapDetails {
    name: string;
    tileName: string;
    tileNameItems: string;
    tileWidth: number;
    tileHeight: number;
    tileSize: number;
    columns: number;
    rows: number;
    width: number;
    height: number;
    backgroundColor: string;
    playerXStart: number;
    playerYStart: number;
    playerStartIndex: number;
    layers: {
        blockTiles: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        }
        floor: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        }
        player: null;
        items: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        } | null
        chests: null;
        monsters: null;
        walls: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        }
        wallsDecoration: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        } | null
    },
    blockedIndexesMap: number[]
    chests: {
        [key: number]: {
            open: boolean;
            index: number;
            x: number;
            y: number;
            itemsId: { id: number; type: string }[];
        }
    },
    chestsAreaDetection: {
        [key: number]: {
            id: number;
            chestIndex: number;
        }
    },
}

export interface MergedMap extends MapDetails, MonsterDetails {};

export interface IMap {
    [key: string]: MergedMap;
}