import { addToCart, getAllCartItems, clearCart, saveOrder } from '../model/OrderModel.js';
import { getAllCustomers } from '../model/CustomerModel.js';
import { getAllItems } from '../model/ItemModel.js';

let total = 0;
let nextOrderId = 1;

// ---- Populate Dropdowns ----
function loadDropdowns() {
    const customerSelect = $('#customer_select');
    const itemSelect = $('#item_select');

    customerSelect.empty().append('<option value="">Select Customer</option>');
    itemSelect.empty().append('<option value="">Select Item</option>');

    getAllCustomers().forEach(c => {
        customerSelect.append(`<option value="${c.id}">${c.id} - ${c.name}</option>`);
    });

    getAllItems().forEach(i => {
        itemSelect.append(`<option value="${i.id}" data-price="${i.price}">${i.id} - ${i.name}</option>`);
    });
}

// ---- Auto-fill Price on Item Select ----
$('#item_select').on('change', function() {
    const selectedOption = $(this).find('option:selected');
    const price = selectedOption.data('price');
    if (price) {
        $('#item_price').val(price);
    } else {
        $('#item_price').val('');
    }
});

// ---- Add to Cart ----
$('#add_to_cart_btn').click(function () {
    let customerId = $('#customer_select').val();
    let itemName = $('#item_select option:selected').text();
    let price = parseFloat($('#item_price').val());
    let qty = parseInt($('#item_qty').val());

    if (!customerId) {
        Swal.fire({ icon: 'warning', title: 'Please select a customer', showConfirmButton: false, timer: 1500 });
        return;
    }

    if (!itemName || isNaN(qty) || qty <= 0 || isNaN(price)) {
        Swal.fire({ icon: 'warning', title: 'Please select a valid item and quantity', showConfirmButton: false, timer: 1500 });
        return;
    }

    let itemTotal = price * qty;
    total += itemTotal;

    addToCart({itemName, price, qty, itemTotal});

    renderCart();
});

// ---- Render Cart ----
function renderCart() {
    let tbody = $('#cart_tbody');
    tbody.empty();
    const cart = getAllCartItems();

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
    $('#summary_subtotal').text(total.toFixed(2));
    $('#cart_item_count').text(cart.length + " Items");
}

// ---- Place Order ----
$('#place_order_btn').click(function () {
    const cart = getAllCartItems();
    if (cart.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Cart is empty', showConfirmButton: false, timer: 1500 });
        return;
    }

    const customerId = $('#customer_select').val();

    // Construct the order object
    const order = {
        orderId: 'ORD-' + String(nextOrderId++).padStart(4, '0'),
        date: new Date().toLocaleDateString(),
        customerId: customerId,
        total: total,
        items: [...cart] // copy cart items
    };

    saveOrder(order);

    Swal.fire({ icon: 'success', title: 'Order Placed Successfully!', showConfirmButton: false, timer: 1500 });

    clearCart();
    total = 0;
    renderCart();

    // Reset Form
    $('#customer_select').val('');
    $('#item_select').val('');
    $('#item_price').val('');
    $('#item_qty').val('');
});

// ---- Init / Event Listeners ----
document.addEventListener('pageChanged', (e) => {
    if(e.detail === 'orderPage') {
        loadDropdowns();
    }
});

// Initial load
loadDropdowns();
renderCart();
