
/*-------------- Constants -------------*/
const howToPlayBtn = document.querySelector('.how-to-play');
const instructionsElement = document.querySelector('.instructions');
const closeBtn = document.querySelector('.close-btn');
const cards = document.querySelectorAll('.card');
const resetButton=document.querySelector('.reset')
/*---------- Variables (state) ---------*/
let cardsHasFlipped = false;
let firstCard, secondCard;
let stopGame = false;
/*-------------- Functions -------------*/

(function shuffle() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 12);
  });
})();
function flipCard() {
  if (stopGame==true || this === firstCard){
  return;
  }

  this.classList.add('flip');

  if (cardsHasFlipped==false) {
    cardsHasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}
function checkForMatch() {
  let matchFound = firstCard.dataset.name === secondCard.dataset.name;
  if(matchFound==true){
    disableCards() 
  }
  else{
    unflipCards()
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  stopGame = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 2000);
}

function resetBoard() {
  cardsHasFlipped=false
  stopGame=false
  firstCard=null
  secondCard=null
}

/*----------- Event Listeners ----------*/
howToPlayBtn.addEventListener('click', () => {
  instructionsElement.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  instructionsElement.classList.add('hidden');
});

window.addEventListener('click', (whereHeClicked) => {
  if (whereHeClicked.target === instructionsElement) {
    instructionsElement.classList.add('hidden');
  }
});
cards.forEach(card => card.addEventListener('click', flipCard));

resetButton.addEventListener('click', () => {
  location.reload();
});
