import * as items from '../assets/items/items';

const returnItemData = (id: number, type: string) => {
    const typeS = type += 's';
    const itemTypeString: items.itemTypes = typeS as items.itemTypes;
    return items[itemTypeString][id];
}

export default returnItemData;