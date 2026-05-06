import {cart, orders} from '../db/db.js';

export function addToCart(cartItem) {
    cart.push(cartItem);
}

export function getAllCartItems() {
    return cart;
}

export function clearCart() {
    cart.length = 0; // Empty the array without reassigning
}

export function saveOrder(order) {
    orders.push(order);
}

export function getAllOrders() {
    return orders;
}
