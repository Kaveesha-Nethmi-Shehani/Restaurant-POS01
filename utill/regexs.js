export const check_nic = (nic) => {
    const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
    return nicRegex.test(nic);
};

 export const check_phone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};


export const check_name = (name) => {
    const nameRegex = /^[A-Za-z\s.]{3,}$/;
    return nameRegex.test(name);
};
