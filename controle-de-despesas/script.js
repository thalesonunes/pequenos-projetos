const transationsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');

const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];


// renderiza todas as transações novamente retirando a transação clicada
const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
}

// Insere a transação no DOM
const addTrasactionIntoDOM = transaction => {

    const operator = transaction.amount < 0 ? "-" : "+";
    const CSSClass = transaction.amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name}
        <span>${operator}R$${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
            x
        </button>`;

    transationsUl.prepend(li);
}

// Atualiza valores 
const updateBalaceValues = () => {
    const transactionsAmounts = transactions
        .map(trasaction => trasaction.amount);
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    const expense = Math.abs(transactionsAmounts
            .filter(value => value < 0)
            .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `-R$ ${expense}`;
}

// Percorre o array para atualizar os valores
const init = () => {
    transationsUl.innerHTML = "";
    transactions.forEach(addTrasactionIntoDOM);
    updateBalaceValues();
}

init();

// Inserindo dados no LocalStorage
const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Gerando um ID aleatório
const generateID = () => Math.round(Math.random() * 1000);

const handleFormSubmit = event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    // Verificando se os inputs foram preenchidos
    if (transactionName === "" || transactionAmount === "") {
        alert('Preencha o NOME e VALOR da transação!');
        return;
    }

    // criando nova transação
    const transaction = {
        id: generateID,
        name: transactionName,
        amount: Number(transactionAmount) // +transactionAmount tbm funcionaria
    }

    // Inserindo a transação no array
    transactions.push(transaction);
    init();
    updateLocalStorage();

    // Limpando os inputs
    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
}

form.addEventListener('submit', handleFormSubmit)