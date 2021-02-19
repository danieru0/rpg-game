export interface playerPosition {
    x: number;
    y: number;
    currentIndex: number;
    direction: string;
}

export interface clickedIndex {
    index: number;
    refresh: number;
}

export interface giveItem {
    id: number;
    type: string;
}