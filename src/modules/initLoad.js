import { gameLoop } from "./gameLoop";
import { createNavBar } from "./navBar";
import { newGame, customAlerts } from "./alertScreens";
import { createIntroScreen } from "./introScreen";

function initLoad() {
  let scanlines = document.querySelector(".scanlines");
  let battleApp = document.querySelector(".battle-app");
  scanlines.appendChild(newGame());
  battleApp.appendChild(customAlerts());

  createIntroScreen();

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
  let scanlines = document.querySelector(".scanlines");
  let playerName = document.querySelector("#userPlayerName").value;
  if (playerName === "") {
    playerName = "User Player";
  }
  window.localStorage.setItem("battleshipPlayerName", `${playerName}`);
  let newGameSettings = document.querySelector(".newGameSettings");
  scanlines.removeChild(newGameSettings);
  let showApp = document.querySelector(".battle-app");
  showApp.style.display = "grid";

  if (window.innerWidth <= 768) {
    showApp.style.display = "flex";
  } else {
    showApp.style.display = "grid";
  }

  const navBar = createNavBar();
  scanlines.prepend(navBar);

  gameLoop(playerName);
}

export { initLoad };
