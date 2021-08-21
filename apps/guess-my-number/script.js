'use strict';

const guessInput = document.querySelector('.guess');

const numberOutput = document.querySelector('.number');
const messageOutput = document.querySelector('.message');
const scoreOutput = document.querySelector('.score');
const highScoreOutput = document.querySelector('.highscore');

const checkButton = document.querySelector('.btn.check');
const againButton = document.querySelector('.btn.again');

let secretNumber = null;
let score = null;
let highScore = 0;

const generateRandomNumber = function () {
  const number = Math.floor(Math.random() * 20) + 1;
  return number;
};
/* --- UI --- */

const updateUIGameStart = function () {
  document.querySelector('body').classList.remove('win');
  numberOutput.textContent = '?';
  messageOutput.textContent = 'Start guessing...';
  guessInput.value = '';
  scoreOutput.textContent = '20';
  checkButton.disabled = false;
  guessInput.disabled = false;
  console.log(guessInput.className);
};

const updateUIGuessTooLow = function () {
  messageOutput.textContent = 'Too low!';
};
const updateUIGuessTooHigh = function () {
  messageOutput.textContent = 'Too high!';
};
const updateUIGameWon = function () {
  document.querySelector('body').classList.add('win');
  numberOutput.style.width = '30rem';
  messageOutput.textContent = "🎉 That's right!";
  numberOutput.textContent = secretNumber;
};

const updateUIGameLost = function () {
  messageOutput.textContent = '😞 You lost!';
  checkButton.disabled = true;
  guessInput.disabled = true;
};

const updateUIInvalidGuess = function () {
  messageOutput.textContent =
    'Invalid guess! It has to be a number between 1 and 20.';
};

const updateUIScore = function () {
  scoreOutput.textContent = score;
};

const updateUIHighScore = function () {
  highScoreOutput.textContent = highScore;
};

/* --- ---*/

const initializeSecretNumberAndScore = function () {
  score = 20;
  secretNumber = generateRandomNumber();
  console.log(`correct answer is ${secretNumber}`);
};

const startGame = function () {
  initializeSecretNumberAndScore();
  updateUIGameStart();
};

const endGame = function () {
  updateUIGameLost();
};

const isNewHighScore = function () {
  return score > highScore;
};

const saveHighScore = function () {
  if (isNewHighScore()) {
    highScore = score;
  }
};

const isGuessValid = function (guess) {
  if (Number.isInteger(guess) && guess >= 1 && guess <= 20) {
    return true;
  }
  return false;
};

const checkGuess = function () {
  const guess = parseInt(guessInput.value);
  console.log(`guess was ${guess}`);
  if (!isGuessValid(guess)) {
    return updateUIInvalidGuess();
  }

  if (guess === secretNumber) {
    updateUIGameWon();
    saveHighScore();
    updateUIHighScore();
  } else {
    score--;
    updateUIScore();

    if (score === 0) {
      return updateUIGameLost();
    }

    if (guess < secretNumber) {
      updateUIGuessTooLow();
    } else if (guess > secretNumber) {
      updateUIGuessTooHigh();
    }
  }
};

checkButton.addEventListener('click', checkGuess);
againButton.addEventListener('click', startGame);
startGame();
