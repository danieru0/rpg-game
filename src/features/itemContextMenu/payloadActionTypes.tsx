export interface WearableItem {
    id: number;
    equipment: boolean;
    type: string;
}

export interface setContextMenuInterface {
    x: number;
    y: number;
    type: string;
    details: WearableItem
}