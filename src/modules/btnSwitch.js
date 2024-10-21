function btnSwitch() {
  const battleApp = document.querySelector(".battle-app");
  const playerBoard = document.querySelector(".playerBoard");
  const compBoard = document.querySelector(".compBoard");
  const switchContainer = document.createElement("div");
  switchContainer.classList.add("switchContainer");
  const switchButton = document.createElement("button");
  switchButton.classList.add("btnSwitch");
  switchButton.textContent = "Switch Board";
  switchContainer.appendChild(switchButton);

  if (battleApp && playerBoard && compBoard) {
    battleApp.appendChild(switchContainer);

    if (window.innerWidth <= 768) {
      playerBoard.style.display = "none";
      compBoard.style.display = "flex";
    } else {
      playerBoard.style.display = "flex";
      compBoard.style.display = "none";
    }

    switchButton.addEventListener("click", () => {
      if (playerBoard.style.display === "none") {
        playerBoard.style.display = "flex";
        compBoard.style.display = "none";
      } else {
        playerBoard.style.display = "none";
        compBoard.style.display = "flex";
      }
    });
  }
  return switchContainer;
}

export { btnSwitch };
