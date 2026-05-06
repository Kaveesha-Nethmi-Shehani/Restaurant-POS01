import {items} from '../db/db.js';

// ---- Data Store ----
let nextId = 1;
let selectedItemId = null;

// ---- Alert ----
function showAlert(message, type = 'success') {
    const box = $('#alert_box');
    box.removeClass('d-none alert-success alert-danger alert-warning');
    box.addClass('alert-' + type);
    box.text(message);
    setTimeout(() => box.addClass('d-none'), 3000);
}

// ---- Get Form Data ----
function getFormData() {
    return {
        name: $('#item_name_input').val().trim(),
        category: $('#item_category_input').val(),
        ingredient: $('#item_nic_input').val().trim(),
        qty: $('#item_phone_input').val()
    };
}

// ---- Clear Form ----
function clearForm() {
    $('#item_id_input').val('');
    $('#item_name_input').val('');
    $('#item_category_input').val('');
    $('#item_nic_input').val('');
    $('#item_phone_input').val('');
    selectedItemId = null;
    $('#item_tbody tr').removeClass('selected-row');
}

// ---- Render Table ----
function renderTable() {
    const tbody = $('#item_tbody');
    tbody.empty();

    if (items.length === 0) {
        tbody.append('<tr><td colspan="5" class="text-center">No items found</td></tr>');
        return;
    }

    items.forEach(item => {
        const row = $(`<tr data-id="${item.id}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.ingredient}</td>
            <td>${item.qty}</td>
        </tr>`);

        row.on('click', function () {
            selectedItemId = item.id;

            $('#item_id_input').val(item.id);
            $('#item_name_input').val(item.name);
            $('#item_category_input').val(item.category);
            $('#item_nic_input').val(item.ingredient);
            $('#item_phone_input').val(item.qty);

            $('#item_tbody tr').removeClass('selected-row');
            $(this).addClass('selected-row');
        });

        tbody.append(row);
    });
}

// ---- Save ----
$('#item_save_btn').on('click', function () {
    const data = getFormData();

    if (!data.name || !data.category) {
        showAlert("Fill required fields!", 'danger');
        return;
    }

    items.push({ id: nextId++, ...data });

    renderTable();
    clearForm();

    Swal.fire("Saved!", "Item added successfully", "success");
});

// ---- Update ----
$('#item_update_btn').on('click', function () {
    if (!selectedItemId) {
        showAlert("Select item first!", 'warning');
        return;
    }

    const data = getFormData();

    items = items.map(item =>
        item.id === selectedItemId ? { id: selectedItemId, ...data } : item
    );

    renderTable();
    clearForm();
    showAlert("Updated successfully!");
});

// ---- Delete ----
$('#item_delete_btn').on('click', function () {
    if (!selectedItemId) {
        showAlert("Select item first!", 'warning');
        return;
    }

    items = items.filter(item => item.id !== selectedItemId);

    renderTable();
    clearForm();
    showAlert("Deleted!");
});

// ---- Reset ----
$('#item_reset_btn').on('click', clearForm);

// ---- Init ----
renderTable();