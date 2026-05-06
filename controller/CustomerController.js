import { saveCustomer, updateCustomer, deleteCustomer, getAllCustomers } from '../model/CustomerModel.js';

// ---- Data Store ----

let nextId = 1;
let selectedCustomerId = null;

// ---- Helper: Show Alert ----
function showAlert(message, type = 'success') {
    Swal.fire({
        icon: type === 'danger' ? 'error' : type,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

// ---- Helper: Validate Form ----
function validateForm() {
    const name = $('#customer_name_input').val().trim();
    const nic  = $('#customer_nic_input').val().trim();
    const phone = $('#customer_phone_input').val().trim();
    const address = $('#customer_address_input').val().trim();

    if (!name)  return "Name is required.";
    if (!nic)   return "NIC is required.";
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

    const customers = getAllCustomers();

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

        // Click row to load into form
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



