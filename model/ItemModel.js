import {items} from '../db/db.js';

export function saveItem(item) {
    items.push(item);
}

export function updateItem(updatedItem) {
    const index = items.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
        items[index] = updatedItem;
    }
}

export function deleteItem(id) {
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
    }
}

export function getAllItems() {
    return items;
}
