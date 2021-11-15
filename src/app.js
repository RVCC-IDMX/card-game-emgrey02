/* app.js */

import Deck from './deck';
import { select, listen, log } from './util';
import './style.css';

const computerCardSlot = select('.computer-card-slot');
const computerDeckElement = select('.computer-deck');
const text = select('.text');
const newGameButton = select('.new-game');
const suitButtons = document.querySelectorAll('.btn-container .btn');

let computerDeck;
let score;

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
}

function cleanInterface() {
  computerCardSlot.innerHTML = '';
  text.innerText = 'New Game!';

  updateDeckCount();
}

function startGame() {
  const deck = new Deck();
  deck.shuffle();
  computerDeck = deck;
  score = 0;
  log(`next card: ${computerDeck.cards[0].suit}`);

  cleanInterface();
}

startGame();

function determineResult(suit) {
  if (computerCardSlot.innerText === '') {
    return;
  }

  if (suit === computerCardSlot.innerText) {
    score += 4;
    text.innerText = `You won! \nScore: ${score}`;
  } else {
    score -= 1;
    text.innerText = `You lost. \nScore: ${score}`;
  }
  if (computerDeck.cards[0]) {
    log(`next card: ${computerDeck.cards[0].suit}`);
  } else {
    text.innerText = `Game over! \nFinal Score: ${score}`;
  }
}

function flipCard() {
  if (computerCardSlot) {
    computerCardSlot.innerHTML = '';
  }
  const computerCard = computerDeck.pop();

  if (!computerCard) {
    startGame();
  } else {
    computerCardSlot.appendChild(computerCard.getHTML());
    updateDeckCount();
  }
}

listen(newGameButton, 'click', () => {
  startGame();
});

suitButtons.forEach(
  (button) =>
    listen(button, 'click', () => {
      const [suit] = button.dataset.suit;
      flipCard();
      determineResult(suit);
      // eslint-disable-next-line comma-dangle
    })
  // eslint-disable-next-line function-paren-newline
);

/* I keep auto-fixing the erros, but then when I hit save it
reverses the fixes I made. */
