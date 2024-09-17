import Player from "./player";
import ShipPlacement from "./placeShips";

export default class Loop {
  static gameLoop() {
    const userPlayer = new Player("player");
    const compPlayer = new Player("player");
    const shipPlacement = new ShipPlacement();

    shipPlacement.playerShipPlacement(userPlayer);
    userPlayer.startPlayerBoard();

    shipPlacement.computerShipPlacement(compPlayer);
    compPlayer.startCompBoard();

    let compSquares = document.querySelectorAll('.compSquare');
    compSquares.forEach(square => {
      square.addEventListener("click", () => {
        let squareColumn = square.id.slice(2, 3);
        let squareRow = square.id.slice(1, 2);
        userPlayer.makeAttack(squareColumn, squareRow, compPlayer.Gameboard);
        compPlayer.startCompBoard();
        let randColumn = Math.floor(Math.random() * 10);
        let randRow = Math.floor(Math.random() * 10);
        compPlayer.makeAttack(randColumn, randRow, userPlayer.Gameboard);
        userPlayer.startPlayerBoard();
      })
    })
  }
}
