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
  playerName.appendChild(nameInput);

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
  playerName.appendChild(playBtn);

  return newGame;
}

export { newGame };
