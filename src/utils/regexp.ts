function mobile(phone: string) {
    return /^\d{11}$/.test(phone)
}
export default {
    mobile
}