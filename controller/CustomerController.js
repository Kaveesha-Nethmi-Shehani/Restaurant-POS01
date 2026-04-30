import {addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById} from '../model/CustomerModel.js';
import {check_nic, check_phone} from '../utils/regex_utils.js';

// ---- Data Store ----
let customers = [];
let nextId = 1;
let selectedCustomerId = null;

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
    const name = $('#customer_name_input').val().trim();
    const nic  = $('#customer_nic_input').val().trim();
    const phone = $('#customer_phone_input').val().trim();
    const address = $('#customer_address_input').val().trim();

    if (!name)  return "Name is required.";
    if (!nic || !/^[0-9]{10}$/.test(nic))   return "NIC is required.";
    if (!phone || !/^[0-9]{10}$/.test(phone)) return "Please enter a valid 10-digit phone number.";
    if (!address) return "Address is required.";
    return null;
}

// ---- Helper: Get Form Data ----
function getFormData() {
    return {
        name:    $('#customer_name_input').val().trim(),
        nic:     $('#customer_nic_input').val().trim(),
        phone:   $('#customer_phone_input').val().trim(),
        address: $('#customer_address_input').val().trim()
    };
}

// ---- Helper: Clear Form ----
function clearForm() {
    $('#customer_id_input').val('');
    $('#customer_name_input').val('');
    $('#customer_nic_input').val('');
    $('#customer_phone_input').val('');
    $('#customer_address_input').val('');
    selectedCustomerId = null;
    $('#customer_tbody tr').removeClass('selected-row');
}

// ---- Render Table ----
function renderTable() {
    const tbody = $('#customer_tbody');
    tbody.empty();

    if (customers.length === 0) {
        tbody.append('<tr><td colspan="5" class="text-center text-muted">No customers found.</td></tr>');
        return;
    }

    customers.forEach(function(c) {
        const row = $(`<tr data-id="${c.id}">
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.nic}</td>
                <td>${c.phone}</td>
                <td>${c.address}</td>
            </tr>`);

        // FIX 7: Click row to load into form
        row.on('click', function() {
            selectedCustomerId = c.id;
            $('#customer_id_input').val(c.id);
            $('#customer_name_input').val(c.name);
            $('#customer_nic_input').val(c.nic);
            $('#customer_phone_input').val(c.phone);
            $('#customer_address_input').val(c.address);

            $('#customer_tbody tr').removeClass('selected-row');
            $(this).addClass('selected-row');
        });

        tbody.append(row);
    });
}

// ---- Save Button ----
$('#customer_save_btn').on('click', function() {
    const err = validateForm();
    if (err) { showAlert(err, 'danger'); return; }

    const data = getFormData();
    const isDuplicate = customers.some(c => c.nic === data.nic || c.phone === data.phone);
    if (isDuplicate) { showAlert("A customer with this NIC or Phone already exists.", 'warning'); return; }

    customers.push({ id: nextId++, ...data });
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
$('#customer_update_btn').on('click', function() {
    if (!selectedCustomerId) { showAlert("Please select a customer row first.", 'warning'); return; }

    const err = validateForm();
    if (err) { showAlert(err, 'danger'); return; }

    const data = getFormData();
    customers = customers.map(c => c.id === selectedCustomerId ? { id: selectedCustomerId, ...data } : c);
    // saveToStorage();
    renderTable();
    clearForm();
    showAlert("Customer updated successfully!", 'success');
});

// ---- Delete Button ----
$('#customer_delete_btn').on('click', function() {
    if (!selectedCustomerId) { showAlert("Please select a customer row first.", 'warning'); return; }

    Swal.fire({
        title: 'Are you sure?',
        text: "This customer will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            customers = customers.filter(c => c.id !== selectedCustomerId);
            // saveToStorage();
            renderTable();
            clearForm();
            showAlert("Customer deleted.", 'success');
        }
    });
});

// ---- Reset Button ----
$('#customer_reset_btn').on('click', clearForm);

// ---- Initial render ----
renderTable();