function playerLogBox() {
  const playerLogBox = document.createElement("div");
  playerLogBox.classList.add("playerLogBox");

  const playerLogTitle = document.createElement("h3");
  playerLogTitle.classList.add("playerLogTitle");
  playerLogTitle.textContent = "Player Log";

  const playerMoveBoxLog = document.createElement("div");
  playerMoveBoxLog.classList.add("playerMoveBoxLog");

  playerLogBox.appendChild(playerLogTitle);
  playerLogBox.appendChild(playerMoveBoxLog);

  return playerLogBox;
}

function computerLogBox() {
  const computerLogBox = document.createElement("div");
  computerLogBox.classList.add("computerLogBox");

  const computerLogTitle = document.createElement("h3");
  computerLogTitle.classList.add("computerLogTitle");
  computerLogTitle.textContent = "Computer Log";

  const compMoveBoxLog = document.createElement("div");
  compMoveBoxLog.classList.add("compMoveBoxLog");

  computerLogBox.appendChild(computerLogTitle);
  computerLogBox.appendChild(compMoveBoxLog);

  return computerLogBox;
}

export { playerLogBox, computerLogBox };
