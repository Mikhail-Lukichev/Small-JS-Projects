const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['wizard','application','programming','code'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

displayWord();


//show hidden word

function displayWord() {
	wordEl.innerHTML = `
		${selectedWord
			.split('')
				.map((letter) => {
					return `<div class="letter">
										${correctLetters.includes(letter) ? letter : ''}
									</div>`;
					})
						.join('')
		}`;

	const innerWord = wordEl.innerText.replace(/\n/g,'');

	if (innerWord == selectedWord) {
		finalMessage.innerText = "Congratulations! You won! =)";
		popup.style.display = "flex";
	}
}

//show notification
function showNotification() {
	notification.classList.add("show");

	setTimeout(() => {
		notification.classList.remove("show");
	},2000);
}

//display figure and update wrong letters
function displayFigure() {
	//update wrong letters
	wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong letters</p>' : ''}
	${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

	const wrongLettersLength = wrongLetters.length;

	//display figure parts
	figureParts.forEach((part,index) => {
		
		if (index < wrongLettersLength) {
			part.style.display = "block";
		} 
	});

	//check if game is over

	if (figureParts.length == wrongLettersLength) {
		finalMessage.innerText = "Sorry but you lost =/";
		popup.style.display = "flex";
	}
}


// event listeners //

//keydown event listener

window.addEventListener('keydown', e => {
	let letter = "";
	if (e.keyCode >= 65 && e.keyCode <= 90 ) {
		letter = e.key;
	}

	if (selectedWord.includes(letter)) {
		if (!correctLetters.includes(letter)) {
			correctLetters.push(letter);
			displayWord();
		} else {
			showNotification();
		}
	} else {
		if (!wrongLetters.includes(letter)) {
			wrongLetters.push(letter);
			displayFigure();
		} else {
			showNotification();
		}
	}
});


// play again button
playAgainBtn.addEventListener('click', () => {
	//empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	//reset word
	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();

	//reset wrong letters
	wrongLettersEl.innerHTML = '';
	figureParts.forEach((part) => {
		part.style.display = "none";
	});

	//remove popup
	popup.style.display = "none";
});