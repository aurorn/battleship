import { gameLoad } from "./DOMloader";
import { gameLoop } from "./gameLoop";
import { newGame } from "./startScreen";

function initLoad() {
  const battleApp = document.querySelector(".battle-app");
  battleApp.appendChild(newGame());

  let startGame = document.querySelector(".startGame");
  startGame.addEventListener("click", () => {
    let playerName = document.querySelector("#userPlayerName").value;
    if (playerName === "") {
      playerName = "User Player";
    }
    let newGameSettings = document.querySelector(".newGameSettings");
    battleApp.removeChild(newGameSettings);

    gameLoad(playerName);
    gameLoop(playerName);
  });
}



export { initLoad };
