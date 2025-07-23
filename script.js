const images = Array.from({ length: 10 }, (_, i) => `images/${i + 1}.png`);
let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;

cards.forEach(src => {
  const card = document.createElement('div');
  card.classList.add('card');
  const img = document.createElement('img');
  img.src = src;
  card.appendChild(img);
  card.addEventListener('click', () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;
  if (!isMatch) {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      reset();
    }, 1000);
  } else {
    reset();
  }
}

function reset() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
