import Player from "./player";
import ShipPlacement from "./placeShips";

export default class Loop {
    gameLoop() {
        const userPlayer = new Player("player");
        const compPlayer = new Player("computer");
        const shipPlacement = new ShipPlacement();

        shipPlacement.playerShipPlacement(userPlayer);
        userPlayer.startPlayerBoard();

        shipPlacement.computerShipPlacement(compPlayer);
        compPlayer.renderEnemyBoard();
    }
}
