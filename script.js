'use strict';

let score0 = 0;
let score1 = 0;
const dice = document.querySelector('.dice');
let roll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');
let gameRules = document.querySelector('.btn--rules');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let activePlayer = 0;
let currentSum = 0;
let playing = true;

dice.classList.add('hidden');
const closeModal = function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentSum = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
roll.addEventListener('click', function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${number}.png`;

    if (number !== 1) {
      currentSum += number;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentSum;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    if (activePlayer == 0) {
      score0 += currentSum;
      document.querySelector('#score--0').textContent = score0;
    } else {
      score1 += currentSum;
      document.querySelector('#score--1').textContent = score1;
    }

    if (score0 >= 50 || score1 >= 50) {
      playing = false;
      dice.classList.add('hidden');
      document.querySelector(`#score--${activePlayer}`).textContent = 'WINNER';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', function () {
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  dice.classList.add('hidden');
  playing = true;
  score0 = 0;
  score1 = 0;
  activePlayer = 0;
  currentSum = 0;
});
gameRules.addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
document.querySelector('.overlay').addEventListener('click', closeModal);
