export default class Gameboard {
  constructor(player) {
    this.player = player;
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(["", "", "", "", "", "", "", "", "", ""]);
    }
  }

  placeShip(row, column, ship) {
    this.board[row][column] = ship;
  }

  receiveAttack(row, column) {
    if (this.board[row][column] !== "") {
      this.board[row][column].hit();
      this.board[row][column] = "hit";
    } else {
      this.board[row][column] = "miss";
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

  notGuessed(row, column) {
    if (this.board[row][column] !== "hit" && this.board[row][column] !== "miss") {
      return true;
    }
    return false;
  }
}
