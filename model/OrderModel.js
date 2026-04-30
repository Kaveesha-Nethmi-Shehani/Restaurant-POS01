import {order_db} from '../db/db.js';
class Order{
    #OrderId;
    #CustomerName;
    #DishName;
    #qty;
    #price;


    constructor(OrderId,CustomerName,DishName,qty,price) {
        this.#OrderId=OrderId;
        this.#CustomerName=CustomerName;
        this.#DishName=DishName;
        this.#qty=qty;
        this.#price=price;
    }
}

// --------------------------- Add Order ---------------------------
const addOrderData = (oOrderId, oCustomerName, oDishName, oqty, oprice) => {
    let new_order = {
        OrderId: oOrderId,
        CustomerName: oCustomerName,
        DishName: oDishName,
        qty: oqty,
        price: oprice
    };
    order_db.push(new_order);
}

// --------------------------- Update Order ---------------------------
const updateOrderData = (oOrderId, oCustomerName, oDishName, oqty, oprice) => {
    let obj = order_db.find(item => item.id == sid);

    if(obj) {
        obj.CustomerName=oCustomerName;
        obj.DishName=oDishName;
        obj.qty=oqty;
        obj.price=oprice
    }
}

// --------------------------- Delete Order ---------------------------
const deleteOrderData = (sid) => {
    let index = order_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        order_db.splice(index, 1);
    }
}

// --------------------------- Get Order---------------------------
const getOrderData = () => {
    return order_db;
}

// --------------------------- Get Order by Index ---------------------------
const getOrderDataByIndex = (index) => {
    return order_db[index];
}

// --------------------------- Get Customer by Id ---------------------------
const getOrderDataById = (id) => {
    return order_db.find(item => item.id==id);
}

export {addOrderData, updateOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById};