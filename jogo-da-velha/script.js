const xClass = "x";
const oClass = "o";
let xTurn;

// selecionandno todos elementos necessários
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('#board');
const gameEndMessage = document.querySelector('[data-game-end-message]');
const gameEndElement = document.querySelector('#gameEndElement');
const restartButton = document.querySelector('#restartButton');

// Possibilidades de vitória
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// inciando o jogo
startGame();

function startGame() {
    xTurn = true;
    board.classList.add('x');

    cells.forEach(cell => {
        // remove classes existentes
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);

        // volta ao estado inicial "x" caso o jogo anterior termine em "o"
        board.classList.replace('o', 'x');

        // para que clique apenas uma vez
        cell.addEventListener('click', handleClick, {
            once: true
        });

        // restarta o jogo
        restartButton.addEventListener('click', startGame)

        // remove a classe "end" e "show" que contem o fundo do fim de jogo
        gameEndElement.classList.remove('show');
        document.querySelector('main').classList.remove('end');

    })
}

function handleClick(e) {
    let cell = e.target;
    let turnClass = xTurn ? xClass : oClass;

    placeMark(cell, turnClass);


    // verifica se há ganhador ou empate e termina o jogo
    if (checkWin(turnClass)) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    }

    swapTurn();
    setBoardHover();
}

function placeMark(cell, turnClass) {
    cell.classList.add(turnClass);
}

function swapTurn() {
    xTurn = !xTurn;
}

function setBoardHover() {
    xTurn ? board.classList.replace('o', 'x') : board.classList.replace('x', 'o');
}

// checando se há vencedor
function checkWin(turnClass) {

    //alert("Alguem ganhou?");

    return lines.some(line => {
        return line.every(index => {
            return cells[index].classList.contains(turnClass);
        })
    })
}

// checando se há empate
function checkDraw() {

    //alert("Deu empate?");

    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}

// finalizando o jogo
function endGame(draw) {

    if (draw) {
        gameEndMessage.innerText = "Houve empate!";
    } else {
        gameEndMessage.innerText = `O ${xTurn ? '"X"' : '"O"'} venceu!`;
    }

    gameEndElement.classList.add('show');
    document.querySelector('main').classList.add('end');
}