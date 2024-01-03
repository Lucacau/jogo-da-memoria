const cards = document.querySelectorAll('.card'); // Pega as cartas

let contadorDeClicks = 0
let hasFlippedCard = false; // Define como falso
let lockBoard = false;
let firstCard, secondCard; // Cria essas variáveis 

function flipCard() { // Cria a função para virar a carta
    console.log('flipCard');
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip'); // Adiciona a classe flip para as cartas que forem clicadas
    contarCliques();

  if (!hasFlippedCard) { // Se <<<
    // Todo primeiro clique entra no IF
    hasFlippedCard = true; // Define como true
    firstCard = this; // Aplica "This" na primeira carta

    return; // Retorna ao IF
  }
  // Todo segundo clique ignora o IF
  secondCard = this; // Segunda carta recebe "This"

  checkForMatch(); // E então chama a função para verificar se bate
}

function checkForMatch() { // Cria a função para chegar se bate
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

    // true ou false ? se true : se false;
}

function disableCards() { // Cria a função de desabilitar as cartas e for parzinho =
    firstCard.removeEventListener('click', flipCard); // Retira as propriedades de click de ambas as cartas
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() { // Se não for parzinho
    lockBoard = true;
    setTimeout(() => { // Adiciona um delay
        firstCard.classList.remove('flip'); // Remove a classe de flip de ambas as cartas
        secondCard.classList.remove('flip');
        resetBoard();
    }, 900); // Conta o delay
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle(){
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
})();
function contarCliques(){
    contadorDeClicks++;
    console.log(contadorDeClicks);
}
cards.forEach(card => card.addEventListener('click', flipCard)); // Adiciona click a todas as cartas
