import {customers} from '../db/db.js';

export function saveCustomer(customer) {
    customers.push(customer);
}

export function updateCustomer(updatedCustomer) {
    const index = customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
        customers[index] = updatedCustomer;
    }
}