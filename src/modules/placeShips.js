export default class ShipPlacement {
  playerShipPlacement(player) {
    player.Gameboard.placeShip(8, 7, player.Skiff);
    player.Gameboard.placeShip(8, 8, player.skiff);

    player.Gameboard.placeShip(8, 3, player.submarine);
    player.Gameboard.placeShip(7, 3, player.submarine);
    player.Gameboard.placeShip(6, 3, player.submarine);

    player.Gameboard.placeShip(3, 8, player.destroyer);
    player.Gameboard.placeShip(4, 8, player.destroyer);
    player.Gameboard.placeShip(5, 8, player.destroyer);

    player.Gameboard.placeShip(3, 0, player.battleship);
    player.Gameboard.placeShip(2, 0, player.battleship);
    player.Gameboard.placeShip(1, 0, player.battleship);
    player.Gameboard.placeShip(0, 0, player.battleship);

    player.Gameboard.placeShip(1, 4, player.carrier);
    player.Gameboard.placeShip(1, 5, player.carrier);
    player.Gameboard.placeShip(1, 6, player.carrier);
    player.Gameboard.placeShip(1, 7, player.carrier);
  }

  computerShipPlacement(player) {
    player.Gameboard.placeShip(8, 0, player.Skiff);
    player.Gameboard.placeShip(9, 0, player.skiff);

    player.Gameboard.placeShip(4, 4, player.submarine);
    player.Gameboard.placeShip(4, 5, player.submarine);
    player.Gameboard.placeShip(4, 6, player.submarine);

    player.Gameboard.placeShip(3, 1, player.destroyer);
    player.Gameboard.placeShip(3, 1, player.destroyer);
    player.Gameboard.placeShip(3, 1, player.destroyer);

    player.Gameboard.placeShip(0, 0, player.battleship);
    player.Gameboard.placeShip(0, 1, player.battleship);
    player.Gameboard.placeShip(0, 2, player.battleship);
    player.Gameboard.placeShip(0, 3, player.battleship);

    player.Gameboard.placeShip(1, 8, player.carrier);
    player.Gameboard.placeShip(2, 8, player.carrier);
    player.Gameboard.placeShip(3, 8, player.carrier);
    player.Gameboard.placeShip(4, 8, player.carrier);
  }
}
