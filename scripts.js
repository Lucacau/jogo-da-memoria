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
        // console.log(`Jogo terminado! Cliques: ${contadorDeClicks}`);

        var user = prompt("Qual seu nome?:", "");
        if (user != "" && user != null) {
            const userScore = calculateScore();
            user = capitalizeNames(user);
            ativarConfetes();
            setCookie(user, userScore, 365);
            scoreBoard();
        }
        // true ou false ? se true : se false;
    }
}

function calculateScore() {
    // const timeScore = (minute * 60 + second) * 10; // Assume 10 pontos por segundo
    // const clickScore = Math.max(0, 1000 - contadorDeClicks * 10); // Pontuação máxima é 1000
    // const totalScore = Math.min(1000, clickScore - timeScore); // Limita a pontuação máxima em 1000

    var totalScore = Math.max(0, 1000 - ((minute * 60 + second) * contadorDeClicks)*0.8);

    return totalScore;
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

function capitalizeNames(names) {
    return names
        .split(' ')
        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        .join(' ');
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
    minute = 0;
    second = 0;
    millisecond = 0;
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

    // Atualiza os elementos no DOM com os valores do cronômetro
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`;
}

cards.forEach(card => card.addEventListener('click', flipCard)); // Adiciona click a todas as cartas


// SETAR O COOKIE //

function setCookie(name, value, daysToExpire) {
    // Cria uma nova data representando a data de expiração do cookie
    var expirationDate = new Date(); // Coloca a data atual
    expirationDate.setDate(expirationDate.getDate() + daysToExpire); // Seta uma data para expirar

    // Cria a string do cookie com o nome, valor, data de expiração e caminho
    var cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`; // Definindo nome, valor, data de expiração e caminho

    // Define o cookie no navegador
    document.cookie = cookieString;
}

// PEGAR COOKIES // 

function getCookie(name) { // Adiciona o nome
    var cookies = document.cookie.split('; '); // Divide as strings em uma matriz de cookies individuais
    for (var i = 0; i < cookies.length; i++) { // Itera os cookies 
        var cookie = cookies[i].split('='); // Divide cada cookie em nome e valor
        if (cookie[0] === name) { // Retorna o valor do cookie se o nome bater
            return cookie[1];
        }
    }
    return null; // Retorna "Null" se o cookie não for encontrado
}

// DELETAR COOKIES //

function deleteCookie(name) { // Adiciona o nome do cookie
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Define o nome, data de expiração e caminho do cookie.
}

// CHECAR COOKIES //

function checkCookie(name) { // Adiciona o nome do cookie
    var cookieValue = getCookie(name); // Puxa o nome do cookie com a função getCookie();
    if (cookieValue !== null) {  // Verifica se o cookie é tem valor diferente
        console.log(`O cookie '${name}' existe. Valor: ${cookieValue}`); // Caso sim, mostra a mensagem com nome e valor do cookie dizendo que existe.
        return true; // Retorna verdadeiro
    } else { // Caso contrário
        console.log(`O cookie '${name}' não existe.`); // Retorna o nome com a mensagem de que não existe.
        return false; // Retorna falso
    }
} 

function scoreBoard() {
    // Obtém a string de cookies e a divide em um array de strings
    const scores = document.cookie.split('; ');
    // Mapeia os scores para um array de objetos
    const scoresArray = scores.map(score => {
        // Para cada score, divide a string do cookie em nome e valor
        const [name, value] = score.split('=');
        // Retorna um objeto com propriedades name e value, convertendo o valor para inteiro
        return { name, value: parseInt(value) };
    });
    console.log(scoresArray);
    // Ordena o array de scores em ordem decrescente com base no valor
    scoresArray.sort((a, b) => b.value - a.value);
    // Obtém a referência ao rightSide
    const scoreboardElement = document.getElementById('rightSide');
    // Limpa o conteúdo atual do elemento HTML
    scoreboardElement.innerHTML = '';
    // Adiciona os scores ordenados ao elemento HTML
    if (scoresArray[0].name != ''){
        scoresArray.forEach(score => {
            const node = document.createElement('p');
            node.classList.add("scoreboard");
            const textnode = document.createTextNode(`${score.name}: ${score.value}`);
            node.appendChild(textnode);
            const newButton = document.createElement('button');
            newButton.classList.add("botao-de-exclusao");
            // newButton.textContent = 'Excluir';
            newButton.addEventListener('click', function(){
                deleteCookie(score.name);
                scoreBoard();
            });
            node.appendChild(newButton);

            scoreboardElement.appendChild(node);
        });
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 1 + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.transform = 'rotate('+ Math.random()*179 +'deg)';
    document.getElementById('confetti-container').appendChild(confetti);

    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function ativarConfetes() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

scoreBoard();