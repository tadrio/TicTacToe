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
const $gameHistory = document.querySelector(".left-panel__history-box");
const $botSwitchBorder = document.querySelector(
  ".left-panel__bot-switcher-outline"
);
const $botSwitchBall = document.querySelector(
  ".left-panel__bot-switcher--ball"
);
const $roundsSwitchBorder = document.querySelector(
  ".left-panel__round-numbers-config__rounds-switcher-outline"
);
const $roundsSwitchBall = document.querySelector(
  ".left-panel__round-numbers-config__rounds-switcher-ball"
);
const $winnerbestof = document.querySelector(".winner-bestof");

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
let canPlay = false;
let winner = "";
let scoreP1 = 0;
let scoreP2 = 0;
let winnerName = "";
let botActive = false;
let player2Name = "";
let bestOf = 3;

function toggleBestOf() {
  bestOf = bestOf === 3 ? 5 : 3;
}

function verifyBestOf() {
  let gameWinner = '';
  let minMatches = Math.round(bestOf / 2);

  if (scoreP1 >= minMatches || scoreP2 >= minMatches) {
    gameWinner = scoreP1 > scoreP2 ? $player1Name.value : $player2Name.value;
    canPlay = false;
    printGameWinner(gameWinner);
  }
}

function printGameWinner(gameWinner) {
  $winnerbestof.innerHTML = `
  <br>
  <span class="mid-panel__scoreboard__title">
  ${gameWinner} venceu a melhor de ${bestOf}
  </span>`;
  setTimeout(resetGame, 1000);

};

function resetGame(){
  scoreP1 = 0;
  scoreP2 = 0;
  resetScoreBoard();
  resetBoard();
  resetMoveHistory();
  resetGameHistory();
  resetGameWinner();
}

function resetGameWinner(){
  $winnerbestof.innerHTML = ``;
}

function bot() {
  if (
    verifyMatch() === "X" ||
    verifyMatch() === "O" ||
    verifyMatch() === "draw"
  )
    return;

  const index = Math.floor(Math.random() * 9);
  const fieldItem = $board[index];
  const gameStatus = verifyMatch();
  if (fieldItem.textContent != "" && gameStatus != "draw") return bot();
  canPlay = false;
  move(index, "bot");
}

function move(field, playerType) {
  const fieldItem = $board[field];

  if (!canPlay && playerType === "player") return;
  if (fieldItem.textContent !== "") return;

  fieldItem.innerHTML = playerMove;

  const gameResult = verifyMatch();
  const scenery = getScenery();

  if (gameResult === "X" || gameResult === "O") {
    canPlay = false;
    addPoint(gameResult);
    setTimeout(resetBoard, 1000);
    playerMove = "O";
    printWinnerName(gameResult);
    printGameHistory(winnerName, scenery);
    setTimeout(resetMoveHistory, 1000);
  }

  if (gameResult === "draw") {
    canPlay = false;
    setTimeout(resetBoard, 800);
    playerMove = "O";
    printWinnerName(gameResult);
    printGameHistory(winnerName, scenery);
    setTimeout(resetMoveHistory, 1000);
  }

  printMoveHistory(playerMove, currentPlayer, field);
  toggleMove();
  printScore();
  verifyBestOf();
  if (playerType === "player" && botActive) {
    setTimeout((canPlay = false));
    setTimeout(bot, 250);
  }
  if (playerType === "bot") {
    setTimeout((canPlay = true));
  }
}

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
    winnerName = $player1Name.value;
    $winnerName.textContent = `${winnerName} venceu!`;
  } else if (winner === "O") {
    winnerName = $player2Name.value;
    $winnerName.textContent = `${winnerName} venceu!`;
  } else {
    winnerName = "Empate";
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
    "Linha 3 | Coluna 3",
  ];

  $moveHistory.innerHTML += `
  <div class="right-panel__history-box__history-wrapper">
      <p class="right-panel__history-box__history-wrapper--move-text">${move}</p>
    <div class="right-panel__history-box__history-wrapper--info">
      <p class="right-panel__history-box__history-wrapper--info-player">${player}</p>
      <p class="right-panel__history-box__history-wrapper--info-location">${dictionaryIndex[field]}</p>
    </div>
  </div>`;
}

function getScenery() {
  const scenery = [];
  for (const $field of $board) {
    scenery.push($field.textContent);
  }
  return scenery;
}

function printGameHistory(winner, scenery) {
  let miniBoard = "";
  for (const move of scenery) {
    miniBoard += `<div class="left-panel__history-box__history-wrapper--scenario--squares">${move}</div>`;
  }

  $gameHistory.innerHTML += `
  <div class="left-panel__history-box__history-wrapper">
    <div class="left-panel__history-box__history-wrapper--winner-wrapper">
      <strong class="left-panel__history-box__history-wrapper--winner-wrapper--title">Vencedor</strong>
      <span class="left-panel__history-box__history-wrapper--winner-wrapper--name">
      ${winner}</span>
    </div>
    <span class="left-panel__history-box__history-wrapper--text">Cenário</span>
    <div class="left-panel__history-box__history-wrapper--scenario">
    ${miniBoard}
    </div>
  </div>`;
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
  canPlay = true;
}

function resetScoreBoard() {
  $scoreP1.textContent = "00";
  $scoreP2.textContent = "00";
}

function resetMoveHistory() {
  $moveHistory.innerHTML = "";
}

function resetGameHistory() {
  $gameHistory.innerHTML = "";
}

$playButton.addEventListener("click", function () {
  if (!canPlay) {
    canPlay = true;
    $playButton.innerHTML = "Pausar";
  } else {
    canPlay = false;
    $playButton.innerHTML = "Iniciar";
  }
  $playButton.classList.toggle = "button-paused";
});

$resetButton.addEventListener("click", function () {
  resetGame();
});

$board.forEach(function ($field, field) {
  $field.addEventListener("click", function () {
    move(field, "player");
  });
});

$botSwitchBorder.addEventListener("click", function () {
  $botSwitchBall.classList.toggle("active");
  botActive = !botActive;
  if ($player2Name.value === "BOT") {
    $player2Name.value = player2Name;
  } else {
    player2Name = $player2Name.value;
    $player2Name.value = "BOT";
  }
  $player2Name.disabled = !$player2Name.disabled;
});

$roundsSwitchBorder.addEventListener("click", function () {
  $roundsSwitchBall.classList.toggle("active");
  toggleBestOf();
});
