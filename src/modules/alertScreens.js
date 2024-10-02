function newGame() {
  let newGame = document.createElement("div");
  newGame.classList.add("newGameSettings");
  document.body.appendChild(newGame);

  let gameName = document.createElement("header");
  gameName.classList.add("gameName");
  gameName.textContent = "Battleship";
  newGame.prepend(gameName);

  let playerNameForm = document.createElement("form");
  playerNameForm.classList.add("playerNameForm");
  playerNameForm.setAttribute("action", "");
  playerNameForm.setAttribute("autocomplete", "off");
  newGame.appendChild(playerNameForm);

  let nameInput = document.createElement("div");
  nameInput.classList.add("nameInput");
  playerNameForm.appendChild(nameInput);

  let label = document.createElement("label");
  label.setAttribute("for", "userPlayerName");
  label.textContent = "Enter Username";
  nameInput.appendChild(label);

  let input = document.createElement("input");
  input.name = "userPlayerName";
  input.type = "text";
  input.id = "userPlayerName";
  input.maxLength = "12";
  nameInput.appendChild(input);

  let playerName = localStorage.getItem("battleshipPlayerName") || "";
  input.value = playerName;

  let playBtn = document.createElement("button");
  playBtn.classList.add("startGame");
  playBtn.type = "button";
  playBtn.textContent = "Start Game";
  playerNameForm.appendChild(playBtn);

  return newGame;
}

function customAlerts() {
  let alertBox = document.createElement("div");
  alertBox.classList.add("alertBox", "hidden");

  let alertTextBox = document.createElement("div");
  alertTextBox.classList.add("alertTextBox");
  alertBox.appendChild(alertTextBox);

  return alertBox;
}

function alertSunkShips(player, shipName) {
  let alertBox = document.querySelector(".alertBox");
  alertBox.classList.remove("hidden");

  let alertTextBox = document.querySelector(".alertTextBox");
  alertTextBox.textContent = `${player}'s ${shipName} has been sunk!`;
  setTimeout(hideAlert, 1500);
}

function alertGameOver(playerName) {
  let alertBox = document.querySelector(".alertBox");
  alertBox.classList.remove("hidden");
  alertBox.classList.add("winScreen");

  let alertTextBox = document.querySelector(".alertTextBox");
  alertTextBox.textContent = `${playerName} wins!`;

  let restartBtn = document.createElement("button");
  restartBtn.classList.add("restartGame");
  restartBtn.textContent = "New Game";

  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });

  alertBox.appendChild(restartBtn);
}

function hideAlert() {
  let alertBox = document.querySelector(".alertBox");
  if (alertBox.classList.contains("winScreen")) {
    return;
  }
  alertBox.classList.add("hidden");
}

export { newGame, customAlerts, alertSunkShips, alertGameOver, hideAlert };
