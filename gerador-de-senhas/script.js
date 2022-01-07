const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEL = document.getElementById("symbol");
const generateEL = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuwvxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=?/<>\|";

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {

    // const len = lenEl.value;
    const len = 12;

    let password = "";

    if (upperEl.checked) {
        password += getUppercase();
    }

    if (lowerEl.checked) {
        password += getLowercase();
    }

    if (numberEl.checked) {
        password += getNumber();
    }

    if (symbolEL.checked) {
        password += getSymbol();
    }

    for (let i = password.length; i > len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function genenateX() {
    const xs = [];

    if (upperEl.checked) {
        xs.push(getUppercase());
    }

    if (lowerEl.checked) {
        xs.push(getLowercase());
    }

    if (numberEl.checked) {
        xs.push(getNumber());
    }

    if (symbolEL.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];

    // console.log(Math.random() * xs.length);
    //return Math.random() * xs.length;

}

generateEL.addEventListener("click", generatePassword);

copy.addEventListener("click", () => {

    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Senha copiada!");
});