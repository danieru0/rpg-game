interface ITilesPositions {
    [key: string]: {
        [key: string]: {
            [key: number]: {
                left: number;
                top: number;
            }
        }
    }
}

const tilesPositions: ITilesPositions = {
    dungeon: {
        floor: {
            0: {
                left: 80,
                top: 0
            },
            115: {
                left: 32,
                top: 112
            },
            130: {
                left: 16,
                top: 128
            }
        },
        walls: {
            0: {
                left: 80,
                top: 0
            },
            1: {
                left: 0,
                top: 0
            },
            2: {
                left: 16,
                top: 0
            },
            3: {
                left: 32,
                top: 0
            },
            4: {
                left: 48,
                top: 0
            },
            5: {
                left: 64,
                top: 0
            },
            17: {
                left: 0,
                top: 16
            },
            18: {
                left: 16,
                top: 16,
            },
            19: {
                left: 32,
                top: 16
            },
            20: {
                left: 48,
                top: 16
            },
            21: {
                left: 64,
                top: 16
            },
            35: {
                left: 32,
                top: 32
            },
            36: {
                left: 48,
                top: 32
            },
            37: {
                left: 64,
                top: 32
            },
            49: {
                left: 0,
                top: 48
            },
            50: {
                left: 16,
                top: 48
            },
            51: {
                left: 32,
                top: 48
            },
            52: {
                left: 48,
                top: 48
            },
            53: {
                left: 64,
                top: 48
            }
        }
    }
}

export default tilesPositions;