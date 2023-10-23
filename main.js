let cells = document.querySelectorAll(".cell");
let btnRestart = document.getElementById("restart");
let statusText = document.getElementById("status-text");

let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
  running = true;
  cells.forEach((cell) => {
    cell.addEventListener("click", clicked);
  });
  btnRestart.addEventListener("click", restart);
  statusText.textContent = `${currentPlayer}'s turn!`;
}

function clicked() {
  let cellIndex = this.getAttribute("cell-index");
  if (!running) {
    return;
  }
  if (this.textContent !== "") {
    alert("Pick a free field");
    return;
  }
  updateCell(this, cellIndex);
  changePlayer();
  checkWinner();
}
function updateCell(cell, index) {
  if (cell.textContent != "" || !running) {
    return;
  } else {
    cell.textContent = currentPlayer;
    options[index] = currentPlayer;
  }
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  for (let i = 0; i < win.length; i++) {
    let condition = win[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      running = false;
      changePlayer();
      statusText.textContent = `${currentPlayer} wins!`;

      cells[condition[0]].classList.add('winner');
      cells[condition[1]].classList.add('winner');
      cells[condition[2]].classList.add('winner');

      break;
    } else if (!options.includes("")) {
      statusText.textContent = `It's a draw!`;
      running = false;
    }
  }
}

function restart() {
  running = false;
  currentPlayer = "X";
  statusText.textContent = "X's turn";
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  startGame();
}
