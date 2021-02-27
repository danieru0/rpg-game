export interface changeMapInterface {
    newMap: string;
    prevMap: string;
}

export interface killMonsterInterface {
    id: number;
    lvl: number;
}

export interface healPlayerInterface {
    hp: number;
    maxHP: number;
    healAmount: number;
    cost: number;
    money: number;
}

export type audioRefreshTypes = 'chest';