import Ship from "./ship";
import Gameboard from "./gameBoard";

export default class Player {
  constructor (name) {
    this.name = name
    this.Gameboard = new Gameboard();
    this.skiff = new Ship ("skiff", 2);
    this.submarine = new Ship ("submarine", 3);
    this.destroyer = new Ship ("destroyer", 3);
    this.battleship = new Ship ("battleship", 4);
    this.carrier = new Ship ("carrier", 5);
  }

  startAttack(column, row, enemyBoard) {
    if (enemyBoard.board.isEmpty(column, row)) {
      enemyBoard.receiveAttack(column, row);
    }
    return;
  }
}