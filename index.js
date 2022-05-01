const $board = document.querySelectorAll(".mid-panel__battlefield__square");
const $playButton = document.querySelector(".left-panel__button-start");

let playerMove = "X";
let gameStart = false;
let winner = "";

function toggleMove() {
  if (playerMove == "X") {
    playerMove = "O";
  } else {
    playerMove = "X";
  }
}

function verifyMatch() {
  if (
    ($board[0].textContent != "" &&
      $board[0].textContent == $board[2].textContent &&
      $board[1].textContent == $board[2].textContent) ||
    ($board[3].textContent != "" &&
      $board[3].textContent == $board[4].textContent &&
      $board[4].textContent == $board[5].textContent) ||
    ($board[6].textContent != "" &&
      $board[6].textContent == $board[7].textContent &&
      $board[7].textContent == $board[8].textContent) ||
    ($board[0].textContent != "" &&
      $board[0].textContent == $board[3].textContent &&
      $board[3].textContent == $board[6].textContent) ||
    ($board[1].textContent != "" &&
      $board[1].textContent == $board[4].textContent &&
      $board[4].textContent == $board[7].textContent) ||
    ($board[2].textContent != "" &&
      $board[2].textContent == $board[5].textContent &&
      $board[5].textContent == $board[8].textContent) ||
    ($board[0].textContent != "" &&
      $board[0].textContent == $board[4].textContent &&
      $board[4].textContent == $board[8].textContent) ||
    ($board[2].textContent != "" &&
      $board[2].textContent == $board[4].textContent &&
      $board[4].textContent == $board[6].textContent)
  ) {
    alert("ganhou "+playerMove);
    return playerMove;
  }
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

$board.forEach(function ($field) {
  $field.addEventListener("click", function () {
    if (!gameStart) {
      return;
    }
    if ($field.textContent != "") {
      return;
    }
    $field.innerHTML = playerMove;
    winner = verifyMatch();
    toggleMove();
  });
});
