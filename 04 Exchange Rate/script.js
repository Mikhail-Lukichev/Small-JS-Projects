const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');

const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

//functions

function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;
  const amountOneValue = +amountOne.value;
  const amountTwoValue = +amountTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
  .then(res => res.json())
  .then(data => {
    const excRate = data.rates[currencyTwoValue];
    rate.innerText = `1 ${currencyOneValue} = ${excRate} ${currencyTwoValue}`;
    amountTwo.value =  `${(amountOneValue * excRate).toFixed(2)}`;
  });
}

function swapCurrency() {
  const currencyTwoTemp = currencyTwo.value;
  console.log(currencyTwoTemp);
  currencyTwo.value = currencyOne.value;
  currencyOne.value = currencyTwoTemp;
  calculate();
}

//event listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);


calculate();