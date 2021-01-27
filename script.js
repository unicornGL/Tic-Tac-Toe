const X_CLASS = 'x';
const O_CLASS = 'o';
let xTurn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');

const startGame = () => {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverCLass();
  winningMessageElement.classList.remove('show');
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverCLass();
  }
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurn = () => {
  xTurn = !xTurn;
};

const setBoardHoverCLass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
};

const checkWin = (currentClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
};

const endGame = (draw) => {
  if (draw) {
    winningMessageTextElement.innerText = 'DRAW...';
  } else {
    winningMessageTextElement.innerText = `${xTurn ? "X" : "O"} Win!`;
  }
  winningMessageElement.classList.add('show');
};

restartButton.addEventListener('click', startGame);

startGame();
