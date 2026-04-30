// ---- Data Store ----
let customers = [];
let nextId = 1;
let selectedOrderId = null;

// ---- Helper: Show Alert ----
function showAlert(message, type = 'success') {
    const box = $('#alert_box');
    box.removeClass('d-none alert-success alert-danger alert-warning');
    box.addClass('alert-' + type);
    box.text(message);
    setTimeout(() => box.addClass('d-none'), 3000);
}

// ---- Helper: Validate Form ----
function validateForm() {
    const OrderID = $('#order_id_input').val().trim();
    const CustomerName  = $('#customer_name_input').val().trim();
    const DishName = $('#order_dish_input').val().trim();
    const qty = $('#order_aty_input').val().trim();
    const price = $('#order_price_input').val().trim();

    if (!CustomerName)  return "Customer Name is required.";
    if (!DishName)  return "Dish Name is required.";
    if (!qty)  return "qty required.";
    if (!price)  return "price required.";
    return null;
}

// ---- Helper: Get Form Data ----
function getFormData() {
    return {
       customerName:    $('#customer_name_input').val().trim(),
        dishName:     $('#order_dish_input').val().trim(),
        qty:   $('#order_qty_input').val().trim(),
        price: $('#order_price_input').val().trim()
    };
}

// ---- Helper: Clear Form ----
function clearForm() {
    $('#order_id_input').val('');
    $('#customer_name_input').val('');
    $('#order_dish_input').val('');
    $('#order_qty_input').val('');
    $('#order_price_input').val('');
    selectedOrderId = null;
    $('#order_tbody tr').removeClass('selected-row');
}

// ---- Render Table ----
function renderTable() {
    const tbody = $('#order_tbody');
    tbody.empty();

    if (order.length === 0) {
        tbody.append('<tr><td colspan="5" class="text-center text-muted">No order found.</td></tr>');
        return;
    }

    order.forEach(function(c) {
        const row = $(`<tr data-id="${o.id}">
                <td>${o.id}</td>
                <td>${c.name}</td>
                <td>${o.dish}</td>
                <td>${o.qty}</td>
                <td>${o.price}</td>
            </tr>`);

        // FIX 7: Click row to load into form
        row.on('click', function() {
            selectedOrderId = c.id;
            $('#order_id_input').val(c.id);
            $('#customer_name_input').val(c.name);
            $('#order_dish_input').val(c.dish);
            $('#order_qty_input').val(c.qty);
            $('#order_price_input').val(c.price);

            $('#order_tbody tr').removeClass('selected-row');
            $(this).addClass('selected-row');
        });

        tbody.append(row);
    });
}

// ---- Save Button ----
$('#order_save_btn').on('click', function() {
    const err = validateForm();
    if (err) { showAlert(err, 'danger'); return; }

    // const data = getFormData();
    // const isDuplicate = order.some(c => c.nic === data.nic || c.phone === data.phone);
    // if (isDuplicate) { showAlert("A customer with this NIC or Phone already exists.", 'warning'); return; }

    order.push({ id: nextId++, ...data });
    // saveToStorage();
    renderTable();
    clearForm();
    //--Save Notification--//
    Swal.fire({
        title: "Save Success",
        icon: "success",
        draggable: true
    });
});

// ---- Update Button ----
$('#order_update_btn').on('click', function() {
    if (!selectedOrderId) { showAlert("Please select a order row first.", 'warning'); return; }

    const err = validateForm();
    if (err) { showAlert(err, 'danger'); return; }

    const data = getFormData();
   order = order.map(c => o.id === selectedOrderId ? { id: selectedOrderId, ...data } : o);
    // saveToStorage();
    renderTable();
    clearForm();
    Swal.fire({
        title: "Update Success",
        icon: "success",
        draggable: true
    });
});

// ---- Delete Button ----
$('#order_delete_btn').on('click', function() {
    if (!selectedOrderId) { showAlert("Please select a order row first.", 'warning'); return; }

    Swal.fire({
        title: 'Are you sure?',
        text: "This order will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            order = order.filter(c => c.id !== selectedOrderId);
            // saveToStorage();
            renderTable();
            clearForm();
            showAlert("Order deleted.", 'success');
        }
    });
});

// ---- Reset Button ----
$('#order_reset_btn').on('click', clearForm);

// ---- Initial render ----
renderTable();