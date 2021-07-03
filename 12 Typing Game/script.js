const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Generate random word from array
function getRandomWord() {
 return words[Math.floor(Math.random()*words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Update time
function updateTime() {
  

  if (difficulty === "easy") {
    time += 5;
  } else if (difficulty === "medium") {
    time += 3;
  } else {
    time += 2;
  }
  timeEl.innerText = time+"s";
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="reloadGame()">Reload</button>
  `;
  endgameEl.style.display = "flex";
}

// Reload the game
function reloadGame() {
  endgameEl.style.display = "none";
  time = 10;
  timeEl.innerText = time+"s";
  score = 0;
  scoreEl.innerText = score;
  addWordToDOM();
}

// Event listeners

// Typing
text.addEventListener('input', (e) => {
  if (e.target.value === randomWord) {
    e.target.value = '';
    addWordToDOM();
    updateScore();
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click',() => {
  settings.classList.toggle("hide");
});

// Settings select
difficultySelect.addEventListener("change",(e) => {
  localStorage.setItem("difficulty",e.target.value);
  difficulty = e.target.value;
});



// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem("difficulty") ? localStorage.getItem("difficulty") : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();


// Start counting down
setInterval(() => { 
  time--;
  timeEl.innerText = time+"s";
  
  if (time === 0) {
    gameOver();
  }
}, 1000);

addWordToDOM();