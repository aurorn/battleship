import { gameLoad } from "./DOMloader";
import { gameLoop } from "./gameLoop";
import { newGame } from "./startScreen";

function initLoad() {
  
  document.body.appendChild(newGame());

  let startGame = document.querySelector(".startGame");
  startGame.addEventListener("click", startGameHandler);

  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      startGameHandler();
    }
  });
}

function startGameHandler() {
  let playerName = document.querySelector("#userPlayerName").value;
    if (playerName === "") {
      playerName = "User Player";
    }
    let newGameSettings = document.querySelector(".newGameSettings");
    document.body.removeChild(newGameSettings);
    let showApp = document.querySelector(".battle-app");
    showApp.style.display = 'grid';


    gameLoad(playerName);
    gameLoop(playerName);
}


export { initLoad };
