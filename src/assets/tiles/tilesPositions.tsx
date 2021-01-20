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
        },
        items: {
            0: {
                left: 64,
                top: 224
            },
            306: {
                left: 16,
                top: 48
            },
            321: {
                left: 0,
                top: 64
            },
            276: {
                left: 48,
                top: 16
            },
            351: {
                left: 224,
                top: 80
            },
            352: {
                left: 240,
                top: 80
            },
            333: {
                left: 192,
                top: 64
            },
            323: {
                left: 32,
                top: 64
            },
            409: {
                left: 128,
                top: 144
            },
            425: {
                left: 128,
                top: 160
            },
            358: {
                left: 80,
                top: 96
            },
            374: {
                left: 96,
                top: 112
            }
        }
    }
}

export default tilesPositions;