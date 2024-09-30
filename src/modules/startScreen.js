function newGame() {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  let newGame = document.createElement("div");
  newGame.classList.add("newGameSettings");
  overlay.appendChild(newGame);

  let gameName = document.createElement("header");
  gameName.classList.add("gameName");
  gameName.textContent = "Battleship";
  newGame.prepend(gameName);

  let playerName = document.createElement("form");
  playerName.classList.add("playerNameForm");
  playerName.setAttribute("action", "");
  playerName.setAttribute("autocomplete", "off");
  newGame.appendChild(playerName);

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

  let playBtn = document.createElement("button");
  playBtn.classList.add("startGame");
  playBtn.type = "button";
  playBtn.textContent = "Start Game";
  playerName.appendChild(playBtn);

  return newGame;
}
export { newGame };
