export interface monsterPosition {
    id: number;
    x: number;
    y: number;
    index: number;
}

export interface closeToPlayer {
    id?: number;
    value: boolean;
}

export interface hitMonsterInterface {
    id: number;
    value: number;
}