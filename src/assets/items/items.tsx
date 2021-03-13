export type itemType = "weapon" | "shield" | "armor" | "potion";
export type itemTypes = "weapons" | "shields" | "armors" | "potions";
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
        lvl: number;
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
        lvl: number;
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
        lvl: number;
    }
}

export interface IPotions {
    [key: number]: {
        name: string;
        heal: number;
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
        buyMoney: 10,
        lvl: 1
    },
    1: {
        name: "Master sword",
        attack: 90,
        imgName: ".weapon2",
        id: 1,
        type: "weapon",
        rarity: "purple",
        sellMoney: 500000,
        buyMoney: 5000000,
        lvl: 30
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
        buyMoney: 10,
        lvl: 1
    },
    1: {
        name: "Master armor",
        hp: 300,
        imgName: ".armor2",
        id: 1,
        type: "armor",
        rarity: "purple",
        sellMoney: 500000,
        buyMoney: 5000000,
        lvl: 30
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
        buyMoney: 10,
        lvl: 2
    },
    1: {
        name: "Master shield",
        def: 90,
        imgName: ".shield2",
        id: 1,
        type: "shield",
        rarity: "purple",
        sellMoney: 300000,
        buyMoney: 3000000,
        lvl: 30
    }
}

const potions: IPotions = {
    0: {
        name: "Mała potka",
        heal: 10,
        id: 0,
        imgName: ".healPotionSmall",
        type: "potion",
        rarity: "white",
        sellMoney: 1,
        buyMoney: 20
    }
}

export { weapons, armors, shields, potions };