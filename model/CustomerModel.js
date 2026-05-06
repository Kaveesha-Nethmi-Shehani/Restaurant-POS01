import {customers} from '../db/db.js';

export function saveCustomer(customer) {
    customers.push(customer);
}