let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
  cell.addEventListener("click", cellClicked);
});

function cellClicked() {
  const index = this.dataset.index;
  if (!gameBoard[index] && gameActive) {
    gameBoard[index] = currentPlayer;
    this.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== "")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  return winningCombinations.some(combo => {
    return combo.every(i => gameBoard[i] === currentPlayer);
  });
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}