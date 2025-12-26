const ALPHA = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 62 char for base62
const BASE = ALPHA.length; // string length 62

// Function to convert a base10 number to a base62 string
export default function encode(num) {
    let str = '';
    while (num > 0) {
        str = ALPHA[num % BASE] + str;
        num = Math.floor(num / BASE); 
    }
    return str || ALPHA[0]; // handle case for 0
}