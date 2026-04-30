const nic_regex = new RegExp("^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))");
const phone_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");

const check_nic = (nic) => {
    return nic_regex.test(nic);
}

const check_phone = (phone) => {
    return phone_regex.test(phone);
}

export {check_nic, check_phone};