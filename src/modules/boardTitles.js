export const createBoardTitles = () => {
  const boardTitlesContainer = document.createElement("div");
  boardTitlesContainer.className = "title-container";

  const playerBoardTitle = document.createElement("div");
  playerBoardTitle.classList.add("userBoardName");

  const userBoard = document.createElement("h1");
  userBoard.className = "user-board-name";
  userBoard.innerText = "Player";

  playerBoardTitle.appendChild(userBoard);

  const compBoardTitle = document.createElement("div");
  compBoardTitle.classList.add("compBoardName");

  const compBoardName = document.createElement("h1");
  compBoardName.className = "comp-board-name";
  compBoardName.innerText = "Computer";

  compBoardTitle.appendChild(compBoardName);

  boardTitlesContainer.appendChild(playerBoardTitle);
  boardTitlesContainer.appendChild(compBoardTitle);

  return boardTitlesContainer;
};
