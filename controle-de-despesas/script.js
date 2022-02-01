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
const addTrasactionIntoDOM = ({id, name, amount}) => {

    const operator = amount < 0 ? "-" : "+";
    const CSSClass = amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${name}
        <span>${operator}R$${amountWithoutOperator.toFixed(2)}</span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`;

    transationsUl.prepend(li);
}

const getExpenses = (transactionsAmounts) => Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const getIncomes = (transactionsAmounts) => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getTotal = (transactionsAmounts) => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);



// Atualiza valores 
const updateBalaceValues = () => {
    const transactionsAmounts = transactions.map(trasaction => trasaction.amount);

    const total = getTotal(transactionsAmounts);
    const income = getIncomes(transactionsAmounts);
    const expense = getExpenses(transactionsAmounts);

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `-R$ ${expense}`;
}

// Percorre o array para atualizar os valores
const init = () => {
    transationsUl.innerHTML = "";
    transactions.forEach(addTrasactionIntoDOM);
    updateBalaceValues();
    console.log(transactions);
}

init();

// Inserindo dados no LocalStorage
const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Gerando um ID aleatório
const generateID = () => Math.round(Math.random() * 1000);


const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount) // +transactionAmount tbm funcionaria
    });
}

// Limpando os inputs
const cleanInputs = () => {
    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
}

const handleFormSubmit = (event) => {

    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === "" || transactionAmount === "";

    // Verificando se os inputs foram preenchidos
    if (isSomeInputEmpty) {
        alert('Preencha o NOME e VALOR da transação!');
        return;
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init();
    updateLocalStorage();
    cleanInputs();
}

form.addEventListener('submit', handleFormSubmit)