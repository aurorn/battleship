export default class DOM {
  static gameLoad() {
    const battleApp = document.querySelector(".battle-app");
        battleApp.appendChild(this.createPlayerBoard());
        battleApp.appendChild(this.createCompBoard());
    }


    static createPlayerBoard() {
    let playerBoard = document.createElement("div");
    playerBoard.classList.add("playerBoard");

    let playerBoardTitle = document.createElement("div");
        playerBoardTitle.classList.add("userBoardName");

      let userBoard = document.createElement("h1");
        userBoard.className = "user-board-name";
        userBoard.innerText = "Player";
      playerBoardTitle.appendChild(userBoard);

    let rowMarkers = document.createElement("div");
    rowMarkers.classList.add("rowMarkers");
    for (let i = 0; i < 10; i++) {
      let rowLabel = document.createElement("div");
      rowLabel.classList.add("rowLabel");
      rowLabel.textContent = String.fromCharCode(97 + i).toUpperCase();
      rowMarkers.appendChild(rowLabel);
    }
    playerBoard.appendChild(rowMarkers);

    let columnMarkers = document.createElement("div");
    columnMarkers.classList.add("columnMarkers");
    for (let i = 0; i < 10; i++) {
      let columnLabel = document.createElement("div");
      columnLabel.classList.add("columnLabel");
      columnLabel.textContent = `${i + 1}`;
      columnMarkers.appendChild(columnLabel);
    }
    playerBoard.appendChild(columnMarkers);

    let gameSquares = document.createElement("div");
    gameSquares.classList.add("playerGameSquares");
    for (let i = 0; i < 100; i++) {
      let playerSquare = document.createElement("div");
      let formattedNum = i.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      playerSquare.id = "p" + formattedNum;
      playerSquare.classList.add("playerSquare");
      gameSquares.appendChild(playerSquare);
    }
    playerBoard.appendChild(gameSquares);

    return playerBoard;
  }

   static createCompBoard() {
    let compBoard = document.createElement("div");
    compBoard.classList.add("compBoard");

    let compBoardTitle = document.createElement("div");
        compBoardTitle.classList.add("compBoardName");
    
      let compBoardName = document.createElement("h1");
        compBoardName.className = "comp-board-name";
        compBoardName.innerText = "Computer";

      compBoardTitle.appendChild(compBoardName);

    let rowMarkers = document.createElement("div");
    rowMarkers.classList.add("rowMarkers");
    for (let i = 0; i < 10; i++) {
      let rowLabel = document.createElement("div");
      rowLabel.classList.add("rowLabel");
      rowLabel.textContent = String.fromCharCode(97 + i).toUpperCase();
      rowMarkers.appendChild(rowLabel);
    }
    compBoard.appendChild(rowMarkers);

    let columnMarkers = document.createElement("div");
    columnMarkers.classList.add("columnMarkers");
    for (let i = 0; i < 10; i++) {
      let columnLabel = document.createElement("div");
      columnLabel.classList.add("columnLabel");
      columnLabel.textContent = `${i + 1}`;
      columnMarkers.appendChild(columnLabel);
    }
    compBoard.appendChild(columnMarkers);

    let gameSquares = document.createElement("div");
    gameSquares.classList.add("compGameSquares");
    for (let i = 0; i < 100; i++) {
      let compSquare = document.createElement("div");
      let formattedNum = i.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      compSquare.id = "o" + formattedNum;
      compSquare.classList.add("compSquare");
      gameSquares.appendChild(compSquare);
    }
    compBoard.appendChild(gameSquares);

    return compBoard;
  }
}
