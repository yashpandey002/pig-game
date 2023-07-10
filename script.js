'use strict';

const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const startGameBtn = document.getElementById('start-game');
const rulesBox = document.getElementById('rules-box');

startGameBtn.addEventListener('click', () => {
    rulesBox.style.display = 'none';
});

const scores = [0, 0];
let currentPlayerScore = 0;
let activePlayer = 0;

const init = function () {
    document.location.reload(true);
};

rollDiceBtn.addEventListener('click', () => {
    let dicePoints = diceRoll();
    if (dicePoints == 1) {
        switchPlayer();
        return;
    }

    currentPlayerScore += dicePoints;
    document.getElementById(`current--${activePlayer}`).textContent = currentPlayerScore;
});

holdBtn.addEventListener('click', holdPlayer);

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
    currentPlayerScore = 0;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}

function holdPlayer() {
    scores[activePlayer] += currentPlayerScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        rollDiceBtn.disabled = true;
        holdBtn.disabled = true;
        return;
    }
    switchPlayer();
}

function diceRoll() {
    let randNum = Math.floor(Math.random() * (6 + 1 - 1) + 1);
    dice.src = `./img/dice-${randNum}.png`;
    dice.classList.remove('hidden');
    return randNum;
}

newBtn.addEventListener('click', init);
