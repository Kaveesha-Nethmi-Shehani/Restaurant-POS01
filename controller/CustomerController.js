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

}
