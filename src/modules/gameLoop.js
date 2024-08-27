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
  }
}
