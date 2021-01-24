type itemType = "weapon" | "shield" | "armor";

interface IWeapons {
    [key: number]: {
        name: string;
        attack: number;
        imgName: string;
        id: number;
        type: itemType;
    }
}

interface IArmors {
    [key: number]: {
        name: string;
        hp: number;
        imgName: string;
        id: number;
        type: itemType
    }
}

interface IShields {
    [key: number]: {
        name: string;
        def: number;
        imgName: string;
        id: number;
        type: itemType;
    }
}

const weapons: IWeapons = {
    0: {
        name: "Drewniany miecz",
        attack: 3,
        imgName: ".weapon1",
        id: 0,
        type: "weapon"
    }
}

const armors: IArmors = {
    0: {
        name: "Niebieska kurtka",
        hp: 10,
        imgName: ".armor1",
        id: 0,
        type: "armor"
    }
}

const shields: IShields = {
    0: {
        name: "Drewniana tarcza",
        def: 1,
        imgName: ".shield1",
        id: 0,
        type: "shield"
    }
}

export { weapons, armors, shields };