const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const navigation = document.getElementById("navigation");
const deleteCardBtn = document.getElementById("delete-card");


///////////////
// Functions //
///////////////


// Create all cards
function createCards() {
	cardsData.forEach((data,index) => createCard(data,index));
	updateCurrentText();
}

// Create a single card in DOM
function createCard(data, index) {
	const card = document.createElement('div');
	card.classList.add("card");
	card.innerHTML = `
		<div class="inner-card">
			<div class="inner-card-front">
				
				<p>
					${data.question}
				</p>
			</div>
			<div class="inner-card-back">
				<p>
					${data.answer}
				</p>
			</div>
		</div>
	`;

	if (index === 0) {
		card.classList.add("active");
	}
	card.addEventListener('click', () => card.classList.toggle('show-answer'));
	cardsEl.push(card);
	cardsContainer.appendChild(card);
}

// Show number of cards
function updateCurrentText() {
	if (cardsData.length > 0) {
		navigation.style.opacity = 1;
		currentEl.innerText = `${currentActiveCard+1}/${cardsEl.length}`;
	} else {
		navigation.style.opacity = 0;
	}
}

// Get cards from local storage
function getCardsData() {
 if (localStorage.getItem("cards")) {
	return JSON.parse(localStorage.getItem("cards"));
 } else {
	return [];
 }
}

// Add card to local storage
function setCardsData(cards) {
	localStorage.setItem("cards",JSON.stringify(cards));
}

// Delete card
function deleteCard() {
	if (currentActiveCard !== cardsEl.length - 1 ) {
		cardsEl[currentActiveCard].className = "card left";
		cardsEl = cardsEl.filter((card,index) => index !== currentActiveCard );
		cardsEl[currentActiveCard].className = "card active";
		cardsData.splice(currentActiveCard,1);
		
	} else if (cardsEl.length !== 1) {
		cardsEl[currentActiveCard].className = "card";
		cardsEl = cardsEl.filter((card,index) => index !== currentActiveCard );
		cardsData.splice(currentActiveCard,1);
		currentActiveCard--;
		cardsEl[currentActiveCard].className = "card active";
	} else {
		cardsEl[currentActiveCard].className = "card left";
		cardsEl = cardsEl.filter((card,index) => index !== currentActiveCard );
		cardsData.splice(currentActiveCard,1);
	}
	updateCurrentText();
	setCardsData(cardsData);
}


/////////////////////
// Event listeners //
/////////////////////


// Next button
nextBtn.addEventListener('click', () => {
	if (currentActiveCard !== cardsEl.length - 1) {
		cardsEl[currentActiveCard].className = "card left";
		currentActiveCard++;
		cardsEl[currentActiveCard].className = "card active";
		updateCurrentText();
	}
});

// Prev button
prevBtn.addEventListener('click', () => {
	if (currentActiveCard !== 0) {
		cardsEl[currentActiveCard].className = "card";
		currentActiveCard--;
		cardsEl[currentActiveCard].className = "card active";
		updateCurrentText();
	}
});

// Show add container
showBtn.addEventListener('click', () => {
	addContainer.classList.add('show');
	questionEl.focus();
});
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
	const question = questionEl.value;
	const answer = answerEl.value;

	if (question.trim() !== "" && answer.trim() !== "") {
		const newCard = {"question": question, "answer": answer};
		const index = cardsEl.length;

		createCard(newCard,index);
		cardsData.push(newCard);
		addContainer.classList.remove('show');
		updateCurrentText();
		setCardsData(cardsData);

		questionEl.value = "";
		answerEl.value = "";
	}
});

// Clear cards button
clearBtn.addEventListener('click', () => {
	cardsContainer.innerHTML = "";
	localStorage.removeItem("cards");
	cardsData.length = 0;
	cardsEl.length = 0;
	updateCurrentText();

});

//Delete card button
deleteCardBtn.addEventListener('click', deleteCard);


//////////
// Code //
//////////


// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
let cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];


createCards();