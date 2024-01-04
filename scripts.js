const cards = document.querySelectorAll('.card'); // Pega as cartas
const clickCountElement = document.getElementById('click-count');
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

let contadorDeClicks = 0;
let hasFlippedCard = false; // Define como falso
let lockBoard = false;
let firstCard, secondCard; // Cria essas variáveis 

// Cronômetro

let cron;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

shuffle();

function flipCard() { // Cria a função para virar a carta
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip'); // Adiciona a classe flip para as cartas que forem clicadas
    contarCliques();
    
    if (!hasFlippedCard) { // Se <<<
    // Todo primeiro clique entra no IF
    hasFlippedCard = true; // Define como true
    start();
    firstCard = this; // Aplica "This" na primeira carta

    return; // Retorna ao IF
  }
  // Todo segundo clique ignora o IF
  secondCard = this; // Segunda carta recebe "This"}

  checkForMatch(); // E então chama a função para verificar se bate
}

function checkForMatch() { // Cria a função para chegar se bate
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

    if (document.querySelectorAll('.flip').length === cards.length) { // Pega o número de cartas que foram viradas no jogo e compara com o número de cartas que existem no jogo, se forem iguais, ele chama a função para finalizar o jogo.
        pause(); // Chama a função para pausar o cronômetro
        console.log(`Jogo terminado! Cliques: ${contadorDeClicks}`);
        // true ou false ? se true : se false;
}
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
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
function shuffle(){
    cards.forEach(card =>{
        let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
};
function contarCliques(){
    contadorDeClicks++;
    clickCountElement.textContent = contadorDeClicks;
    console.log('contadorDeClicks');
}

function resetGame(){
    cards.forEach(card => {
        card.classList.remove('flip');
    });
    cards.forEach(card => card.addEventListener('click', flipCard)); // Adiciona click a todas as cartas

    resetBoard()
    shuffle();
    resetTimer();
    pause(); // Pausa o cronômetro
    contadorDeClicks = 0; // Zera o contador de cliques
    clickCountElement.textContent = contadorDeClicks; // Atualiza a exibição do contador de cliques   
}

function start(){
    pause();
    cron = setInterval(timer,10);
}
function pause(){
    clearInterval(cron);
}

function resetTimer(){
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}

function timer() {
    millisecond += 10;

    if (millisecond == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }

    // Atualiza os elementos no DOM com os valores do cronômetro
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`;
}

cards.forEach(card => card.addEventListener('click', flipCard)); // Adiciona click a todas as cartas
