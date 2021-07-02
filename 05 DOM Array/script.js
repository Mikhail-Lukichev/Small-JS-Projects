const main = document.getElementById('main');
const addUserBtn = document.getElementById('addUser');
const doubleMoneyBtn = document.getElementById('doubleMoney');
const millionersBtn = document.getElementById('millioners');
const sortRichestBtn = document.getElementById('sortRichest');
const calculateWealthBtn = document.getElementById('calculateWealth');

let data = [];

getRandomUser();
// getRandomUser();
// getRandomUser();

//fetch random user through API
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  console.log(res);
  const data = await res.json();
  console.log(data);
  const user = data.results[0];
  console.log(user);
  const newUser ={
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random()*1000000)
  }
  addData(newUser);
}

//double money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//sort by reachest
function sortByReachest() {
  data.sort((a,b) => {
    return b.money - a.money;
  });
  updateDOM();
}

//filter only millioners
function showMillioners() {
  data = data.filter( user =>  user.money >= 1000000);
  updateDOM();
}

// calculate wealth
function calculateWealth() {
  const wealth = data.reduce((acc,user) => {
    return acc + user.money;
  }, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3><strong>Total wealth:</strong> ${formatMoney(wealth)}`;
  main.appendChild(wealthEl);
}

//add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}


//update DOM (main element)
function updateDOM (providedData = data) {
  //clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}


//format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortRichestBtn.addEventListener('click',sortByReachest);
millionersBtn.addEventListener('click',showMillioners);
calculateWealthBtn.addEventListener('click',calculateWealth);