import {customer_db} from '../db/db.js';
class Customer{
    #id;
    #name;
    #nic;
    #phone;
    #address;


    constructor(id,name,nic,phone,address) {
        this.#id=id;
        this.#name=name;
        this.#nic=nic;
        this.#address=address;
    }
}

// --------------------------- Add Customer ---------------------------
const addCustomerData = (cid, cname, cnic, cphone, caddress) => {
    let new_customer = {
        id: cid,
        name: cname,
        nic: cnic,
        phone: cphone,
        address: caddress
    };
    customer_db.push(new_customer);
}

// --------------------------- Update Customer ---------------------------
const updateCustomerData = (cid, cname, cnic, cphone, caddress) => {
    let obj = customer_db.find(item => item.id == sid);

    if(obj) {
        obj.name=cname;
        obj.nic=cnic;
        obj.phone=cphone;
        obj.address=caddress
    }
}

// --------------------------- Delete Customer ---------------------------
const deleteCustomerData = (sid) => {
    let index = customer_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        customer_db.splice(index, 1);
    }
}

// --------------------------- Get Customer---------------------------
const getCustomerData = () => {
    return customer_db;
}

// --------------------------- Get Customer  Index ---------------------------
const getCustomerDataByIndex = (index) => {
    return customer_db[index];
}

// --------------------------- Get Customer   Id ---------------------------
const getCustomerDataById = (id) => {
    return student_db.find(item => item.id==id);
}

export {addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById};