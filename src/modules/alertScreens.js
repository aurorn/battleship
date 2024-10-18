function newGame() {
  let scanlines = document.querySelector(".scanlines");
  let newGame = document.createElement("div");
  newGame.classList.add("newGameSettings");
  scanlines.appendChild(newGame);

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

function shipPlacer() {
  let placerDiv = document.createElement("div");
  placerDiv.classList.add("shipPlacer");

  let btn = document.createElement("button");
  btn.classList.add("helpBtn", "horizontal");
  btn.textContent = "Rotate";
  btn.addEventListener("click", () => {
    btn.classList.toggle("horizontal");
  });
  placerDiv.appendChild(btn);

  let text = document.createElement("p");
  text.classList.add("helpText");
  placerDiv.appendChild(text);

  return placerDiv;
}

function customAlerts() {
  let alertBox = document.createElement("div");
  alertBox.classList.add("alertBox", "hidden");

  let alertTextBox = document.createElement("div");
  alertTextBox.classList.add("alertTextBox");
  alertBox.appendChild(alertTextBox);

  return alertBox;
}

function alertGameStart() {
  let alertBox = document.querySelector(".alertBox");
  let overlay = document.querySelector(".overlay");
  alertBox.classList.remove("hidden");
  overlay.classList.add("active");

  let textBox = document.querySelector(".alertTextBox");
  textBox.textContent = "Click an Enemy Square to Attack!";

  setTimeout(hideAlert, 1000);
}

function alertSunkShips(playerName, shipName) {
  let alertBox = document.querySelector(".alertBox");
  let overlay = document.querySelector(".overlay");
  alertBox.classList.remove("hidden");
  overlay.classList.add("active");

  let alertTextBox = document.querySelector(".alertTextBox");
  alertTextBox.textContent = `${playerName}'s ${shipName} has been sunk!`;
  setTimeout(hideAlert, 2000);
}

function alertGameOver(playerName) {
  let alertBox = document.querySelector(".alertBox");
  let overlay = document.querySelector(".overlay");
  alertBox.classList.remove("hidden");
  overlay.classList.add("active");
  alertBox.classList.add("winScreen");

  let alertTextBox = document.querySelector(".alertTextBox");
  alertTextBox.textContent = `${playerName} wins!`;

  let existingRestartBtn = alertBox.querySelector(".restartGame");
  if (existingRestartBtn) {
    alertBox.removeChild(existingRestartBtn);
  }

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
  let overlay = document.querySelector(".overlay");
  if (alertBox.classList.contains("winScreen")) {
    return;
  }
  alertBox.classList.add("hidden");
  overlay.classList.remove("active");
}

export {
  newGame,
  customAlerts,
  alertGameStart,
  alertSunkShips,
  alertGameOver,
  hideAlert,
  shipPlacer,
};
