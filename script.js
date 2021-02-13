'use strict';

let privateKeyA, privateKeyB;
let sharedKeyA, sharedKeyB;
let sharedSecretKeyA, sharedSecretKeyB;
let genNumA, genNumB;
let primeNumA, primeNumB;
let splitBin, par1, par2;
let binaryKey;
let codedMessage = [];
let temp = [];
let decodedMessage = [];
let answer = [];
let flagA = true;
let flagB = true;
let encryptedMsg = [];
let decryptedMsg = [];
let msgClear;
let cipheredMsg;
let decipheredMsg;
let status = true;


/*                  Key Encryption Tags             */

const pKeyA = document.querySelector('.private-key-A');
const generatorA = document.querySelector('.generator-A');
const pNumA = document.querySelector('.prime-number-A');
const shKeyA = document.querySelector('.shared-key-A');
const displaySharedKeyA = document.querySelector('.display-shared-key-A');
const displayBinaryKeyA = document.querySelector('.display-binary-key-A');
const btnEncryptA = document.querySelector('.btn-A');

const pKeyB = document.querySelector('.private-key-B')
const generatorB = document.querySelector('.generator-B');
const pNumB = document.querySelector('.prime-number-B');
const shKeyB = document.querySelector('.shared-key-B');
const displaySharedKeyB = document.querySelector('.display-shared-key-B');
const displayBinaryKeyB = document.querySelector('.display-binary-key-B');
const btnEncryptB = document.querySelector('.btn-B');


/*                  Message Tags                    */

const msgClr = document.querySelector('.message-en');
const msgBinaryKeyEn = document.querySelector('.message-binary-key-en');
const displayEncryptedMsg = document.querySelector('.encrypted-msg');
const btnEncryptMsg = document.querySelector('.btn-encrypt')

const msgEncryptedDec = document.querySelector('.message-dec');
const msgBinaryKeyDec = document.querySelector('.message-binary-key-dec');
const displayDecryptedMsg = document.querySelector('.decrypted-msg');
const btnDecryptMsg = document.querySelector('.btn-decrypt')

/*                  Div Tags                         */
const firstDiv = document.querySelector('#firstDiv');
const secondDiv = document.querySelector('#secondDiv');
const thirdDiv = document.querySelector('#thirdDiv');
const fourthDiv = document.querySelector('#fourthDiv');

/*-------------------Functions-----------------*/

//Decimal to Binary
const decToBinary = function (num) {
    let bin = num.toString(2)
    if (bin.length < 8) {
        for (let i = 0; bin.length < 8; i++) {
            bin = '0' + bin;
            splitBin = bin.split("");
        }
    }
    //console.log(splitBin);
    return splitBin;
}

const resetA = function () {
    pKeyA.value = generatorA.value = pNumA.value = '';


}

const resetB = function () {
    pKeyB.value = generatorB.value = pNumB.value = '';


}

const hideContent = function () {

    firstDiv.style.opacity = 100;
    secondDiv.style.opacity = 0;
    thirdDiv.style.opacity = 0;
    fourthDiv.style.opacity = 0;

    shKeyB.style.visibility = 'hidden';
    generatorB.style.visibility = 'visible';

    shKeyA.style.visibility = 'hidden';
    generatorA.style.visibility = 'visible';

    displaySharedKeyA.textContent = `Shared Key:`;
    displayBinaryKeyA.textContent = `Binary Key:`;

    displaySharedKeyB.textContent = `Shared Key:`;
    displayBinaryKeyA.textContent = `Binary Key:`;

    flagA = true;
    flagB = true;
}

// Prime Number checker
const checkPrime = function (num) {
    let isPrime = true;
    if (num === 1) {
        console.log("1 is neither prime nor composite number.");
        hideContent();
    }
    // check if number is greater than 1
    else if (num > 1) {
        // looping through 2 to number-1
        for (let i = 2; i < num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            return true;
        } else {
            console.log(`${num} is a not prime number`);
            alert('Input must be a prime number')
            resetA();
            resetB();
            hideContent();
        }
    }
    // check if number is less than 1
    else {
        console.log("The number is not a prime number.");
        alert('Input must be a prime number')
        resetA();
        resetB();
        hideContent();
    }
}

//Generate Secret Key
const generateSecretKey = function (g, privateKey, p) {
    g = g % p;
    let results = 1;
    let x = g;

    while (privateKey > 0) {
        let leastSignificantBit = privateKey % 2;
        privateKey = Math.floor(privateKey / 2);

        if (leastSignificantBit == 1) {
            results = results * x;
            results = results % p;
        }
        x = x * x;
        x = x % p;
    }
    return results;
}

const downloadFile = function (filename, text) {
    let element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

    element.setAttribute('download', filename);
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

/*----------------------Process-------------------------*/
//XOR Decryption Process
const xorDecrypt = function (mes, key) {
    for (let i = 0; i < mes.length; i++) {
        if (mes[i] == key[i]) {
            temp.push(0)
        }
        else {
            temp.push(1)
        }
    }
    decodedMessage = temp.splice(0, 8);

    binToDec(decodedMessage)
}

//Binary to Decimal
const binToDec = function (message) {
    let mes = message.join('');
    let lett = parseInt(mes, 2);
    let char = String.fromCharCode(lett);
    answer.push(char)
    console.log(answer);
}

//XOR Encryption Process
const xorEncrypt = function (par1, par2) {
    //console.log(par1, par2);
    for (let i = 0; i < par1.length; i++) {
        if (par1[i] == par2[i]) {
            temp.push(0);
        }
        else {
            temp.push(1);
        }
    }
    codedMessage = temp.splice(0, 8)
    //console.log(codedMessage, par1);

    if (status) {
        return codedMessage;
    }
    else {
        xorDecrypt(codedMessage, par1);
    }
}



/*-------------------Button Handlers-----------------*/

//Key Encryption Process
btnEncryptA.addEventListener('click', function () {

    privateKeyA = Number(pKeyA.value);
    genNumA = Number(generatorA.value);
    primeNumA = Number(pNumA.value);
    sharedKeyA = Number(shKeyA.value);

    console.log(typeof privateKeyA);
    if (!privateKeyA && privateKeyA != Number && genNumA != Number && !primeNumA && primeNumA != Number) {
        alert('Input must be a number')
        console.log("Asd");
        resetA();
    }
    else {
        if (flagA) {
            if (checkPrime(primeNumA) && genNumA < primeNumA) {
                sharedKeyA = generateSecretKey(genNumA, privateKeyA, primeNumA);

                displaySharedKeyB.textContent = `Shared Key: ${sharedKeyA}`;
                resetA();

                shKeyA.style.visibility = 'visible';
                generatorA.style.visibility = 'hidden';
                flagA = false;

                firstDiv.style.opacity = 0;

                secondDiv.style.opacity = 100;
            }
            else {
                alert('Prime number must be greater than the generator');
                hideContent();
                resetA();
            }
        }
        else {
            if (checkPrime(primeNumA) && primeNumA == primeNumB && sharedKeyA == sharedKeyB) {

                sharedSecretKeyA = generateSecretKey(sharedKeyA, privateKeyA, primeNumA);

                alert(`Your shared private key: ${sharedSecretKeyA}`);
                binaryKey = decToBinary(sharedSecretKeyA).join('');
                displayBinaryKeyA.textContent = `Binary Key: ${binaryKey}`;
                binaryKey = binaryKey.split('');

                generatorA.style.visibility = 'visible';

                resetA();
                shKeyA.value = '';

                secondDiv.style.opacity = 100;
            }
        }
    }
})

btnEncryptB.addEventListener('click', function () {

    privateKeyB = Number(pKeyB.value);
    genNumB = Number(generatorB.value);
    primeNumB = Number(pNumB.value);
    sharedKeyB = Number(shKeyB.value);

    console.log(primeNumA, primeNumB);
    console.log(genNumA, genNumB);
    console.log(flagB);
    if (!privateKeyB && privateKeyB != Number && genNumB != Number && !primeNumB && primeNumB != Number && primeNumA != primeNumB && genNumA != genNumB) {
        alert('Input must be a number/wrong inputs')
        hideContent();
    }
    else {
        if (flagB) {
            if (checkPrime(primeNumB) && primeNumA == primeNumB && genNumA == genNumB) {
                sharedKeyB = generateSecretKey(genNumB, privateKeyB, primeNumB);

                displaySharedKeyA.textContent = `Shared Key: ${sharedKeyB}`;
                resetB();

                shKeyB.style.visibility = 'visible';
                generatorB.style.visibility = 'hidden';
                flagB = false;

                firstDiv.style.opacity = 100;

                secondDiv.style.opacity = 0;

                //hideContent();
            }
            else {
                alert('Wrong inputs');
                hideContent();
                resetA();
                resetB();
            }
        }
        else {
            if (checkPrime(primeNumB) && primeNumA == primeNumB) {
                console.log(sharedKeyA, sharedKeyB);
                sharedSecretKeyB = generateSecretKey(sharedKeyB, privateKeyB, primeNumB);

                alert(`Your shared private key: ${sharedSecretKeyB}`);

                binaryKey = decToBinary(sharedSecretKeyB).join('');
                displayBinaryKeyB.textContent = `Binary Key: ${binaryKey}`;

                binaryKey = binaryKey.split('');
                generatorB.style.visibility = 'visible';

                resetB();
                shKeyB.value = '';

                thirdDiv.style.opacity = 100;
            }
            else {
                alert('Wrong inputs');
                hideContent();
                resetA();
                resetB();
            }
        }
    }
})


//Message Encryption Process
btnEncryptMsg.addEventListener('click', function () {

    msgClear = msgClr.value;
    let msgBinKey = msgBinaryKeyEn.value;

    if (msgBinKey != binaryKey.join('')) {
        alert("Binary Keys do not match");
        //clear input fields
        hideContent();
        resetA();
        resetB();
    }
    else {


        for (let i = 0; i < msgClear.length; i++) {
            status = true;
            let encryptedLetter = msgClear.charCodeAt(i);
            let binLetter = decToBinary(encryptedLetter);

            encryptedMsg += xorEncrypt(binaryKey, binLetter).join('');
            displayEncryptedMsg.textContent += xorEncrypt(binaryKey, binLetter).join('');

            status = false;
            cipheredMsg = xorEncrypt(binaryKey, binLetter);
        }
        msgClr.value = msgBinaryKeyEn.value = '';

        fourthDiv.style.opacity = 100;
    }
})

btnDecryptMsg.addEventListener('click', function () {

    let msgEncrypted = msgEncryptedDec.value;
    let msgBinKey = msgBinaryKeyEn.value;


    if (msgBinKey != binaryKey && encryptedMsg != msgEncrypted) {
        alert("Binary Keys or Encrypted Message do not match");
        hideContent();
        resetA();
        resetB();

    }
    else {
        displayDecryptedMsg.textContent = ` Decrypted Message: ${answer.join('')}`;

        msgEncryptedDec.value = msgBinaryKeyDec.value = '';

        let filename = 'answer.txt';

        downloadFile(filename, answer.join(''));
    }
})

