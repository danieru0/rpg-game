type itemType = "weapon" | "shield" | "armor";
type rarityType = "white" | "green" | "purple" | "red";

export interface IWeapons {
    [key: number]: {
        name: string;
        attack: number;
        imgName: string;
        id: number;
        type: itemType;
        rarity: rarityType;
        sellMoney: number;
        buyMoney: number;
    }
}

export interface IArmors {
    [key: number]: {
        name: string;
        hp: number;
        imgName: string;
        id: number;
        type: itemType;
        rarity: rarityType;
        sellMoney: number;
        buyMoney: number;
    }
}

export interface IShields {
    [key: number]: {
        name: string;
        def: number;
        imgName: string;
        id: number;
        type: itemType;
        rarity: rarityType;
        sellMoney: number;
        buyMoney: number;
    }
}

const weapons: IWeapons = {
    0: {
        name: "Drewniany miecz",
        attack: 3,
        imgName: ".weapon1",
        id: 0,
        type: "weapon",
        rarity: "white",
        sellMoney: 1,
        buyMoney: 10
    }
}

const armors: IArmors = {
    0: {
        name: "Niebieska kurtka",
        hp: 10,
        imgName: ".armor1",
        id: 0,
        type: "armor",
        rarity: "white",
        sellMoney: 1,
        buyMoney: 10
    }
}

const shields: IShields = {
    0: {
        name: "Drewniana tarcza",
        def: 1,
        imgName: ".shield1",
        id: 0,
        type: "shield",
        rarity: "white",
        sellMoney: 1,
        buyMoney: 10
    }
}

export { weapons, armors, shields };