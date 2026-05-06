import { getAllOrders } from '../model/OrderModel.js';

// ---- Render Orders Table ----
function renderOrders() {
    const tbody = $('#orders_tbody');
    tbody.empty();

    const orders = getAllOrders();

    if (orders.length === 0) {
        tbody.append('<tr><td colspan="5" class="text-center text-muted py-4">No completed orders found.</td></tr>');
        return;
    }

    orders.forEach(order => {
        // Calculate total quantity of items in this order
        const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);

        tbody.append(`
            <tr>
                <td class="fw-semibold text-primary">${order.orderId}</td>
                <td>${order.date}</td>
                <td>${order.customerId}</td>
                <td>${totalItems}</td>
                <td class="fw-bold">Rs ${order.total.toFixed(2)}</td>
            </tr>
        `);
    });
}

// ---- Event Listeners ----
document.addEventListener('pageChanged', (e) => {
    if(e.detail === 'orderDetailsPage') {
        renderOrders();
    }
});

// Initial render
renderOrders();
