import { gameLoop } from "./gameLoop";
import { createNavBar } from "./navBar";
import { newGame, customAlerts } from "./alertScreens";
import { createIntroScreen } from "./introScreen";
import image from "../images/github-mark.svg";

function footer() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  const footerText = document.createElement("p");
  footerText.textContent = "© Made by Sam Cason";
  footerText.classList.add("footer-text");
  footer.appendChild(footerText);
  const footerImg = document.createElement("img");
  footerImg.src = image;
  footerImg.alt = "github";
  footerImg.classList.add("github-img");
  footer.appendChild(footerImg);
  return footer;
}

function btnSwitch() {
  //onst battleApp = document.querySelector(".battle-app");
  const switchContainer = document.createElement("div");
  switchContainer.classList.add("switchContainer");
  const switchButton = document.createElement("button");
  switchButton.classList.add("btnSwitch");
  switchButton.textContent = "Switch Board";
  //battleApp.appendChild(switchContainer);
  switchContainer.appendChild(switchButton);

  switchButton.addEventListener("click", () => {
    const playerBoard = document.querySelector(".playerBoard");
    const compBoard = document.querySelector(".compBoard");
    if (playerBoard.style.display === "none") {
      playerBoard.style.display = "grid";
      compBoard.style.display = "none";
    } else {
      playerBoard.style.display = "none";
      compBoard.style.display = "grid";
    }
  });

  return switchContainer;
}

function initLoad() {
  document.body.appendChild(footer());
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

  /*const switchButton = btnSwitch();
  if (window.innerWidth <= 768) {
    showApp.appendChild(switchButton);
  }*/
}

export { initLoad, btnSwitch };
