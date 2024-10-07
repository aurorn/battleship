import { alertSunkShips } from "./alertScreens";

export default class Gameboard {
  constructor(player) {
    this.player = player;
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(["", "", "", "", "", "", "", "", "", ""]);
    }
  }

  placeShip(column, row, ship) {
    this.board[column][row] = ship;
  }

  receiveAttack(column, row) {
    if (this.board[column][row] !== "") {
      this.board[column][row].hit();
      if (this.board[column][row].isSunk === true) {
        alertSunkShips(this.player, this.board[column][row].name);
      }
      this.board[column][row] = "hit";
    } else {
      this.board[column][row] = "miss";
    }
  }

  logMisses() {
    let missLog = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === "miss") {
          missLog.push((i, j));
        }
      }
    }
    return missLog;
  }

  logHits() {
    let hitLog = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] !== "hit" &&
          this.board[i][j] !== "miss" &&
          this.board[i][j] !== ""
        ) {
          hitLog.push((i, j));
        }
      }
    }
    return true;
  }

  checkSunkShips() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] !== "hit" &&
          this.board[i][j] !== "miss" &&
          this.board[i][j] !== ""
        ) {
          return false;
        }
      }
    }
    return true;
  }

  notGuessed(column, row) {
    if (
      this.board[column][row] !== "hit" &&
      this.board[column][row] !== "miss"
    ) {
      return true;
    }
    return false;
  }

  isEmpty(column, row) {
    if (this.board[column][row] === "") {
      return true;
    }
    return false;
  }

  containsShip(column, row) {
    if (
      this.board[column][row] !== "hit" &&
      this.board[column][row] !== "miss" &&
      this.board[column][row] !== ""
    ) {
      return true;
    }
    return false;
  }
}
