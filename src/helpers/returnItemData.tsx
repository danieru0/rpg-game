import { weapons, shields, armors, potions } from '../assets/items/items';

const returnItemData = (id: number, type: string) => {
    switch(type) {
        case "weapon":
            return weapons[id];
        case "shield":
            return shields[id];
        case "armor":
            return armors[id];
        case "potion":
            return potions[id];
        default: return null;
    }
}

export default returnItemData;