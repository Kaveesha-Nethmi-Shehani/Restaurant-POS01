// const nic_regex = new RegExp("^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))");
// const phone_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");
//
// const check_nic = (nic) => {
//     return nic_regex.test(nic);
// }
//
// const check_phone = (phone) => {
//     return phone_regex.test(phone);
// }
//
// export {check_nic, check_phone};

/**
 * Regex Utilities for Validation
 */

// // 1. NIC පරීක්ෂා කිරීම (පැරණි 9-digit + V/X හෝ අලුත් 12-digit)
// export const check_nic = (nic) => {
//     const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
//     return nicRegex.test(nic);
// };
//
// // 2. දුරකථන අංකය පරීක්ෂා කිරීම (ඉලක්කම් 10 ක් තිබේදැයි බලයි)
// export const check_phone = (phone) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone);
// };
//
// // 3. නම පරීක්ෂා කිරීම (අකුරු පමණක් තිබේදැයි බැලීමට අවශ්‍ය නම්)
// export const check_name = (name) => {
//     const nameRegex = /^[A-Za-z\s.]{3,}$/; // අවම අකුරු 3 ක් සහ හිස්තැන්/තිත් ඉඩ දෙයි
//     return nameRegex.test(name);
// };

// 1. NIC Number පරීක්ෂා කිරීම (9 digits + V/X හෝ 12 digits)
export const check_nic = (nic) => {
    const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
    return nicRegex.test(nic);
};

// 2. දුරකථන අංකය පරීක්ෂා කිරීම (ඉලක්කම් 10 ක්)
export const check_phone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

// 3. නම පරීක්ෂා කිරීම (අකුරු + හිස්තැන් + තිත්, අවම 3)
export const check_name = (name) => {
    const nameRegex = /^[A-Za-z\s.]{3,}$/;
    return nameRegex.test(name);
};
