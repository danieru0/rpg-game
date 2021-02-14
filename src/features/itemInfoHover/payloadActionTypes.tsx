export interface WearableItem {
    name: string;
    buffName: string;
    buffValue: number;
    rarity: string;
    money: number;
    lvl: number;
}

export interface setItemInterface {
    x: number;
    y: number;
    details: WearableItem;
    type: string;
}