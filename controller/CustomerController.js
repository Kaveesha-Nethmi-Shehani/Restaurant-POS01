import { saveCustomer, updateCustomer, deleteCustomer, getAllCustomers } from '../model/CustomerModel.js';

// ---- Data Store ----

let nextId = 1;
let selectedCustomerId = null;