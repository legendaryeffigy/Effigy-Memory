let images = Array.from({ length: 10 }, (_, i) => `${i + 1}.png`);
let cards = [...images, ...images];
let gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard, lockBoard = false;
let timer, time = 0, moves = 0, matched = 0;
let hasStarted = false;

function shuffle() {
  cards.sort(() => 0.5 - Math.random());
}

function initGame() {
  gameBoard.innerHTML = '';
  shuffle();
  time = 0;
  moves = 0;
  matched = 0;
  hasStarted = false;
  document.getElementById('timer').textContent = 0;
  document.getElementById('moves').textContent = 0;
  document.getElementById('winMessage').style.display = 'none';

  cards.forEach(src => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = src;
    card.appendChild(img);
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    document.getElementById('timer').textContent = time;
  }, 1000);
}

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  if (!hasStarted) {
    hasStarted = true;
    startTimer();
  }

  card.classList.add('flipped');
  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves++;
  document.getElementById('moves').textContent = moves;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;
  if (isMatch) {
    matched += 2;
    if (matched === cards.length) winGame();
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function winGame() {
  clearInterval(timer);
  document.getElementById('winMessage').style.display = 'block';
}

function restartGame() {
  clearInterval(timer);
  initGame();
}

initGame();
