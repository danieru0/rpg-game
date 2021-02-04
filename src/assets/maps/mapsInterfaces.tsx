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
    viewport: {
        x: number;
        y: number;
    }
    layers: {
        [key: string]: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        } | null;
        blockTiles: {
            tileName: string;
            tiles: number[][];
            firstGrid: number;
        }
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