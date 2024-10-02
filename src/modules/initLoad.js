import { gameLoad } from "./DOMloader";
import { gameLoop } from "./gameLoop";
import { newGame, customAlerts } from "./alertScreens";

function initLoad() {
  document.body.appendChild(newGame());
  document.body.appendChild(customAlerts());

  let startGame = document.querySelector(".startGame");
  startGame.addEventListener("click", startGameHandler);

  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      startGameHandler();
    }
  });
}

function startGameHandler() {
  let playerName = document.querySelector("#userPlayerName").value;
  if (playerName === "") {
    playerName = "User Player";
  }
  window.localStorage.setItem('battleshipPlayerName', `${playerName}`);
  let newGameSettings = document.querySelector(".newGameSettings");
  document.body.removeChild(newGameSettings);
  let showApp = document.querySelector(".battle-app");
  showApp.style.display = "grid";

  gameLoad(playerName);
  gameLoop(playerName);
}

export { initLoad };
