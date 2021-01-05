const board = document.getElementById('board');
const cellEl = document.querySelectorAll('[data-cell]');

let circleTurn;
const x_class = 'x';
const circle_class = 'circle';

const winningMessageText = document.querySelector('[data-win-message-text]')
const winMessage = document.getElementById('win-message');

const restartBtn = document.getElementById('restart');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


startGame();

function startGame()
{
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.addEventListener('click', handleClick, { once : true })
    });
    setBoardHoverClass();
}
function handleClick(e)
{
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    placeMark(cell, currentClass);
    if(checkWin(currentClass))
    {
        endGame(false);
    }
    else if (isDraw())
    {
        endGame(true);
    }
    switchTurns();
    setBoardHoverClass();
}

function placeMark(cell, currentClass)
{
    cell.classList.add(currentClass);
};

function switchTurns(currentClass)
{
    circleTurn = !circleTurn;
};

function setBoardHoverClass()
{
    board.classList.remove(x_class);
    board.classList.remove(circle_class)
    if(circleTurn)
    {
        board.classList.add(circle_class)
    }
    else
    {
        board.classList.add(x_class)
    }
};

function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellEl[index].classList.contains(currentClass);
        })
    })
};

function isDraw()
{   
    return [...cellEl].every(cell =>{
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    });
};

function endGame(draw)
{
    if(draw)
    {
        winningMessageText.innerText = "Draw!";
    }
    else
    {
        winningMessageText.innerText = `${circleTurn ? "O's": "X's"} wins!`;
    }
    winMessage.classList.add('show');
};

restartBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    location.reload();
    return false;
});

