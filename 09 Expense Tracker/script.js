const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() !== "" && amount.value.trim() !== "") {
    transactions.push({id: generateID(), text: text.value, amount: +amount.value});
    text.value = "";
    amount.value = "";
    updateLocalStorage();
  } else {
    alert("Pls fill transaction text and amount");
  }
  
  list.innerHTML = "";
  init();
}

// Generate random ID
function generateID() {
 return Math.floor(Math.random()*100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const element = document.createElement("li");
  if (transaction.amount < 0) {
    element.classList.add("minus");
  } else {
    element.classList.add("plus");
  }
  element.innerHTML = `
  ${transaction.text} <span>${transaction.amount < 0 ? "-" : ""}$${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`;
  list.appendChild(element);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
 
  balance.innerText = `$${amounts.reduce((acc, value) => acc + value,0).toFixed(2)}`;
  money_plus.innerText = `$${amounts.filter(amount => amount > 0).reduce((acc,amount) => acc + amount,0).toFixed(2)}`;
  money_minus.innerText = `$${amounts.filter(amount => amount < 0).reduce((acc,amount) => acc + amount,0).toFixed(2) * -1}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  list.innerHTML = "";
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  transactions.forEach(transaction => {
    addTransactionDOM(transaction);
  });
  updateValues();
}

//event listeners
form.addEventListener('submit', addTransaction);



const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

init();



