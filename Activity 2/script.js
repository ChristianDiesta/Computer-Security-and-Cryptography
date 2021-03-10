'use strict';


const plaintText = document.querySelector('.plain-text');
const encryptedText = document.querySelector('.encrypted-text');

const decMsg = document.querySelector('.display-decrypted-msg');
const enMsg = document.querySelector('.display-encrypted-msg');

const encryptBtn = document.querySelector('.btn-encrypt');
const decryptBtn = document.querySelector('.btn-decrypt');

const primeP = 967854201045824;
const primeQ = 136574856103251;

let n;
let totient;
const e = 5;
let encryptedMsg = [];
let decryptedMsg = [];
let c;


n = primeP * primeQ;
totient = (primeP - 1) * (primeQ - 1);
let d = modInverse(e, totient);

function modInverse(a, m) {

    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

encryptBtn.addEventListener('click', function () {

    let plainTxt = plaintText.value;

    for (let i = 0; i < plainTxt.length; i++) {
        let a = plainTxt.charCodeAt(i);
        encryptedMsg.push(a);

        let char = String.fromCharCode(a);
        decryptedMsg.push(char);

    }
    encryptedMsg = encryptedMsg.join('');
    let num = Number(encryptedMsg);

    //Encryption process
    c = num ** e % n;
    decryptedMsg = decryptedMsg.join('');

    enMsg.textContent = `Encrypted Message: ${c}`;

    alert(`Public Keys: (${e}, ${n}) 
Private Keys: (${d}, ${n})
    `);

})

decryptBtn.addEventListener('click', function () {

    let encryptedTxt = Number(encryptedText.value);

    //decryption Process
    //Javascript displays long numbers as infinity, thus making 'm' Not a number(NaN)
    let m = encryptedTxt ** d % n;

    decMsg.textContent = `Decrypted Message: ${decryptedMsg}`;

})
