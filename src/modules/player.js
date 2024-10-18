import { Ship } from "./ship";
import Gameboard from "./gameBoard";
import { alertGameOver } from "./alertScreens";

export default class Player {
  constructor(name) {
    this.name = name;
    this.turn = false;
    this.Gameboard = new Gameboard(this);
    this.skiff = new Ship("skiff", 2);
    this.submarine = new Ship("submarine", 3);
    this.destroyer = new Ship("destroyer", 3);
    this.battleship = new Ship("battleship", 4);
    this.carrier = new Ship("carrier", 5);
    this.allShips = [
      this.carrier,
      this.battleship,
      this.destroyer,
      this.submarine,
      this.skiff,
    ];
  }

  typeWriter(text, element, speed = 30) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  logCompMove(column, row, result) {
    const compMoveBoxLog = document.querySelector(".compMoveBoxLog");
    if (compMoveBoxLog) {
      const compLogEntry = document.createElement("p");
      compLogEntry.classList.add("logEntry");
      compMoveBoxLog.appendChild(compLogEntry);
      const text = `Computer attacked [${column}, ${row}] - ${result === "hit" ? "Hit!" : "Miss!"}`;
      this.typeWriter(text, compLogEntry);
      while (compMoveBoxLog.children.length > 1) {
        compMoveBoxLog.removeChild(compMoveBoxLog.firstChild);
      }
    }
  }

  logPlayerMove(column, row, result) {
    const playerMoveBoxLog = document.querySelector(".playerMoveBoxLog");
    if (playerMoveBoxLog) {
      const playerLogEntry = document.createElement("p");
      playerLogEntry.classList.add("logEntry");
      playerMoveBoxLog.appendChild(playerLogEntry);
      const text = `Player attacked [${column}, ${row}] - ${result === "hit" ? "Hit!" : "Miss!"}`;
      this.typeWriter(text, playerLogEntry);
      while (playerMoveBoxLog.children.length > 1) {
        playerMoveBoxLog.removeChild(playerMoveBoxLog.firstChild);
      }
    }
  }

  startAttack(column, row, compBoard, isPlayer = true) {
    if (compBoard.checkSunkShips() === true || this.turn === false) {
      return;
    }
    if (compBoard.notGuessed(column, row)) {
      const result = compBoard.receiveAttack(column, row);
      if (isPlayer) {
        this.logPlayerMove(column, row, result);
      } else {
        this.logCompMove(column, row, result);
      }
      return result;
    }
    return null;
  }

  compMove(userPlayer) {
    if (this.Gameboard.checkSunkShips()) {
      return;
    }

    const findAdjacentCells = (column, row) => {
      const adjacent = [];
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];

      directions.forEach(([dx, dy]) => {
        const newCol = column + dx;
        const newRow = row + dy;
        if (newCol >= 0 && newCol < 10 && newRow >= 0 && newRow < 10) {
          adjacent.push(`${newCol}${newRow}`);
        }
      });

      return adjacent;
    };

    const getValidGuesses = (locations) => {
      return locations.filter((location) => {
        const [col, row] = [Number(location[0]), Number(location[1])];
        return userPlayer.Gameboard.notGuessed(col, row);
      });
    };

    let woundedShip = userPlayer.allShips.some((ship) => ship.partialHit());

    if (woundedShip) {
      let hitLocations = [];
      for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
          if (userPlayer.Gameboard.board[col][row] === "hit") {
            hitLocations.push(`${col}${row}`);
          }
        }
      }

      let woundedLocations = hitLocations.filter((location) => {
        const [col, row] = [Number(location[0]), Number(location[1])];
        const adjacent = findAdjacentCells(col, row);
        return adjacent.some((adjLoc) => {
          const [adjCol, adjRow] = [Number(adjLoc[0]), Number(adjLoc[1])];
          return userPlayer.Gameboard.containsShip(adjCol, adjRow);
        });
      });

      if (woundedLocations.length > 0) {
        let randomWound =
          woundedLocations[Math.floor(Math.random() * woundedLocations.length)];
        const [woundCol, woundRow] = [
          Number(randomWound[0]),
          Number(randomWound[1]),
        ];
        const adjacentCells = findAdjacentCells(woundCol, woundRow);
        const validGuesses = getValidGuesses(adjacentCells);

        if (validGuesses.length > 0) {
          let randomWoundGuess =
            validGuesses[Math.floor(Math.random() * validGuesses.length)];
          this.startAttack(
            Number(randomWoundGuess[0]),
            Number(randomWoundGuess[1]),
            userPlayer.Gameboard,
            false,
          );
          userPlayer.startPlayerBoard();
          return;
        }
      }
    }

    let notGuessed = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (userPlayer.Gameboard.notGuessed(i, j)) {
          notGuessed.push(`${i}${j}`);
        }
      }
    }

    if (notGuessed.length > 0) {
      let randomGuess =
        notGuessed[Math.floor(Math.random() * notGuessed.length)];
      const result = this.startAttack(
        Number(randomGuess[0]),
        Number(randomGuess[1]),
        userPlayer.Gameboard,
        false,
      );
      this.logCompMove(Number(randomGuess[0]), Number(randomGuess[1]), result);
      userPlayer.startPlayerBoard();
    }
  }

  startPlayerBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        let square = document.getElementById(`p${j}${i}`);
        if (
          this.Gameboard.board[i][j] !== "hit" &&
          this.Gameboard.board[i][j] !== "miss" &&
          this.Gameboard.board[i][j] !== ""
        ) {
          let shipColor = this.getShipColor(this.Gameboard.board[i][j].name);
          square.style.backgroundColor = shipColor;
        } else if (this.Gameboard.board[i][j] === "miss") {
          square.style.backgroundColor = "#575757";
        } else if (this.Gameboard.board[i][j] === "hit") {
          square.style.backgroundColor = "red";
        }
      }
    }
  }

  startCompBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        let square = document.getElementById(`o${j}${i}`);
        if (this.Gameboard.board[i][j] === "miss") {
          square.style.backgroundColor = "#575757";
        } else if (this.Gameboard.board[i][j] === "hit") {
          square.style.backgroundColor = "red";
        }
      }
    }
  }

  getShipColor(shipName) {
    switch (shipName.toLowerCase()) {
      case "skiff":
        return "green";
      case "submarine":
        return "green";
      case "destroyer":
        return "green";
      case "battleship":
        return "green";
      case "carrier":
        return "green";
      default:
        return "gray";
    }
  }

  winGame() {
    alertGameOver(this.name);
  }
}
