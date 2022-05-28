const $board = document.querySelectorAll(".mid-panel__battlefield__square");
const $playButton = document.querySelector(".left-panel__button-start");
const $scoreP1 = document.querySelector(
  ".mid-panel__scoreboard__scores--player1"
);
const $scoreP2 = document.querySelector(
  ".mid-panel__scoreboard__scores--player2"
);
const $winnerName = document.querySelector(
  ".mid-panel__scoreboard__scores--winner"
);
const $player1Name = document.querySelector(".left-panel__input1");
const $player2Name = document.querySelector(".left-panel__input2");
const $resetButton = document.querySelector(".left-panel__restart-button");
const $moveHistory = document.querySelector(".right-panel__history-box");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerMove = "X";
let currentPlayer = $player1Name.value;
let gameStart = false;
let winner = "";
let scoreP1 = 0;
let scoreP2 = 0;

function toggleMove() {
  if (playerMove === "X") {
    playerMove = "O";
    currentPlayer = $player2Name.value;
  } else {
    playerMove = "X";
    currentPlayer = $player1Name.value;
  }
}

function printScore() {
  $scoreP1.textContent = scoreP1 < 10 ? "0" + scoreP1 : scoreP1;
  $scoreP2.textContent = scoreP2 < 10 ? "0" + scoreP2 : scoreP2;
}

function printWinnerName(winner) {
  if (winner === "X") {
    $winnerName.textContent = `${$player1Name.value} venceu!`;
  } else if (winner === "O") {
    $winnerName.textContent = `${$player2Name.value} venceu!`;
  } else {
    $winnerName.textContent = "Empate";
  }
}

function printMoveHistory(move, player, field) {
  const dictionaryIndex = [
    "Linha 1 | Coluna 1",
    "Linha 1 | Coluna 2",
    "Linha 1 | Coluna 3",
    "Linha 2 | Coluna 1",
    "Linha 2 | Coluna 2",
    "Linha 2 | Coluna 3",
    "Linha 3 | Coluna 1",
    "Linha 3 | Coluna 2",
    "Linha 3 | Coluna 3"
  ];

  $moveHistory.innerHTML +=
  `<div class="right-panel__history-box__history-wrapper">
      <p class="right-panel__history-box__history-wrapper--move-text">${move}</p>
    <div class="right-panel__history-box__history-wrapper--info">
      <p class="right-panel__history-box__history-wrapper--info-player">${player}</p>
      <p class="right-panel__history-box__history-wrapper--info-location">${dictionaryIndex[field]}</p>
    </div>
   </div>`;
}

function printGameHistory(player, ){

}

function addPoint(winner) {
  if (winner === "X") scoreP1++;
  if (winner === "O") scoreP2++;
}

function verifyMatch() {
  let filledFields = 0;

  for (const condition of winCondition) {
    const $field0 = $board[condition[0]];
    const $field1 = $board[condition[1]];
    const $field2 = $board[condition[2]];

    if (
      $field0.textContent !== "" &&
      $field0.textContent === $field1.textContent &&
      $field1.textContent === $field2.textContent
    ) {
      return playerMove;
    }
  }

  for (const $field of $board) {
    if ($field.textContent != "") filledFields++;
  }

  if (filledFields === 9) return "draw";
}

function resetBoard() {
  for (let i = 0; i < $board.length; i++) {
    $board[i].textContent = "";
  }
  $winnerName.textContent = "";
  gameStart = true;
}

function resetScoreBoard() {
  $scoreP1.textContent = "00";
  $scoreP2.textContent = "00";
}

function resetMoveHistory() {
  $moveHistory.innerHTML = "";
}

function resetGameHistory() {
  //reset Histórioco de Partidas
}

$playButton.addEventListener("click", function () {
  if (!gameStart) {
    gameStart = true;
    $playButton.innerHTML = "Pausar";
  } else {
    gameStart = false;
    $playButton.innerHTML = "Iniciar";
  }
  $playButton.classList.toggle = "button-paused";
});

$resetButton.addEventListener("click", function () {
  resetScoreBoard();
  resetBoard();
  resetMoveHistory()
  //reset historico de partidas
});

$board.forEach(function ($field, field) {
  $field.addEventListener("click", function () {
    if (!gameStart) return;
    if ($field.textContent !== "") return;

    $field.innerHTML = playerMove;

    const gameResult = verifyMatch();

    if (gameResult === "X" || gameResult === "O") {
      gameStart = false;
      addPoint(gameResult);
      setTimeout(resetBoard, 1000);
      playerMove = "O";
      printWinnerName(gameResult);
      setTimeout(resetMoveHistory, 1000);
    }

    if (gameResult === "draw") {
      gameStart = false;
      setTimeout(resetBoard, 800);
      playerMove = "O";
      printWinnerName(gameResult);
      setTimeout(resetMoveHistory, 1000);
    }
    printMoveHistory(playerMove, currentPlayer, field)
    printScore();
    toggleMove();
  });
});
//resetmovehistory
