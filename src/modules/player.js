import Ship from "./ship";
import Gameboard from "./gameBoard";
import { boardImgs } from "./boardGameImg";
import Hit from "../images/hit.svg";
import Circle from "../images/circle.svg";

export default class Player {
  constructor(name) {
    this.name = name;
    this.Gameboard = new Gameboard();
    this.skiff = new Ship("skiff", 2);
    this.submarine = new Ship("submarine", 3);
    this.destroyer = new Ship("destroyer", 3);
    this.battleship = new Ship("battleship", 4);
    this.carrier = new Ship("carrier", 5);
  }

  startAttack(column, row, enemyBoard) {
    if (enemyBoard.checkSunkShips() === true) {
      return;
    }
    if (enemyBoard.notGuessed(column, row)) {
      enemyBoard.receiveAttack(column, row);
    }
    return;
  }

  compMove(userPlayer) {
    let notGuessed = [];
    for (let i = 0; i < userPlayer.Gameboard.board.length; i++) {
      for (let j = 0; i < userPlayer.Gameboard.board[i].length; j++) {
        if (userPlayer.Gameboard.notGuessed(i, j) === true) {
          notGuessed.push(`${j}${i}`);
        }
      }
    }
    if (notGuessed.length > 0 && this.Gameboard.checkSunkShips() === false) {
      let randGuess = notGuessed[Math.floor(Math.random() * notGuessed.length)];
      let randColumn = randGuess.slice(1, 2);
      let randRow = randGuess.slice(0, 1);
      this.startAttack(randColumn, randRow, userPlayer.Gameboard);
      userPlayer.startPlayerBoard();
    }
  }

  startPlayerBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        if (
          this.Gameboard.board[i][j] !== "hit" &&
          this.Gameboard.board[i][j] !== "miss" &&
          this.Gameboard.board[i][j] !== ""
        ) {
          let square = document.getElementById(`p${j}${i}`);
          let shipName = this.Gameboard.board[i][j].name
            .toLowerCase()
            .replace(/\s/g, "-");
          square.style.backgroundImage = `url(${boardImgs[`${shipName}.svg`]})`;
        } else if (this.Gameboard.board[i][j] === "miss") {
          let square = document.getElementById(`p${j}${i}`);
          let missIMG = document.createElement("img");
          missIMG.classList.add("targetMiss");
          missIMG.src = Circle;
          while (square.hasChildNodes()) {
            square.removeChild(square.lastChild);
          }
          square.appendChild(missIMG);
          square.style.background = "none";
        } else if (this.Gameboard.board[i][j] === "hit") {
          let square = document.getElementById(`p${j}${i}`);
          let hitIMG = document.createElement("img");
          hitIMG.classList.add("targetHit");
          hitIMG.src = Hit;
          while (square.hasChildNodes()) {
            square.removeChild(square.lastChild);
          }
          square.appendChild(hitIMG);
          square.style.background = "none";
        }
      }
    }
  }

  startCompBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        if (this.Gameboard.board[i][j] === "miss") {
          let square = document.getElementById(`o${j}${i}`);
          let missIMG = document.createElement("img");
          missIMG.classList.add("targetMiss");
          missIMG.src = Circle;
          while (square.hasChildNodes()) {
            square.removeChild(square.lastChild);
          }
          square.appendChild(missIMG);
          square.style.background = "none";
        } else if (this.Gameboard.board[i][j] === "hit") {
          let square = document.getElementById(`o${j}${i}`);
          let hitIMG = document.createElement("img");
          hitIMG.classList.add("targetHit");
          hitIMG.src = Hit;
          while (square.hasChildNodes()) {
            square.removeChild(square.lastChild);
          }
          square.appendChild(hitIMG);
        }
      }
    }
  }
}
