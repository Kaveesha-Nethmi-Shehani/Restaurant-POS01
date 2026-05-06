import {cart} from '../db/db.js';

let total = 0;

// ---- Add to Cart ----
$('#add_to_cart_btn').click(function () {

    let itemName = $('#item_select option:selected').text();
    let price = parseFloat($('#item_price').val());
    let qty = parseInt($('#item_qty').val());

    if (!itemName || !qty) {
        alert("Fill item & qty");
        return;
    }

    let itemTotal = price * qty;
    total += itemTotal;

    cart.push({itemName, price, qty, itemTotal});

    renderCart();
});

// ---- Render Cart ----
function renderCart() {
    let tbody = $('#cart_tbody');
    tbody.empty();

    cart.forEach(c => {
        tbody.append(`
            <tr>
                <td>${c.itemName}</td>
                <td>${c.price}</td>
                <td>${c.qty}</td>
                <td>${c.itemTotal}</td>
            </tr>
        `);
    });

    $('#total').text(total.toFixed(2));
}

// ---- Place Order ----
$('#place_order_btn').click(function () {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    alert("Order Placed Successfully!");

    cart = [];
    total = 0;
    renderCart();
});
