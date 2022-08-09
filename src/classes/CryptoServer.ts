const CryptoJS = require('crypto-js')
const PRIME = '@₹₠₡₢₭₤₥₽$₩€₵₮₱₲&₳◊₴₦₸₺₻₼₣₾#'

export const _encrypt = (text: string, key: string): string => {
    return CryptoJS.AES.encrypt(text, key).toString()
}

export const _decrypt = (cipher: string, key: string): string => {
    return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
}

export const encrypt = (text: string): string => {
    return CryptoJS.AES.encrypt(text, PRIME).toString()
}

export const decrypt = (cipher: string): string => {
    return CryptoJS.AES.decrypt(cipher, PRIME).toString(CryptoJS.enc.Utf8)
}

export const decrypt_urlQuery = (cipher: string): string => {//when '+' is sent via url, it becomes ' '
    return CryptoJS.AES.decrypt(cipher.split(' ').join('+'), PRIME).toString(CryptoJS.enc.Utf8)
}

export const rotateforward = (docid: string): string => {
    return docid.substr(-docid.length / 2) + docid.substr(0, (docid.length + 1) / 2)
}

export const rotatebackward = (docid: string): string => {
    return docid.substr(docid.length / 2) + docid.substr(0, docid.length / 2)
}

export const hash = (text: string): string => CryptoJS.SHA512(text).toString()
