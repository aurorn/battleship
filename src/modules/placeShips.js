function playerShipPlacement(player) {
  player.Gameboard.placeShip(1, 4, player.carrier);
  player.Gameboard.placeShip(1, 5, player.carrier);
  player.Gameboard.placeShip(1, 6, player.carrier);
  player.Gameboard.placeShip(1, 7, player.carrier);
  player.Gameboard.placeShip(1, 8, player.carrier);
  player.Gameboard.placeShip(0, 0, player.battleship);
  player.Gameboard.placeShip(1, 0, player.battleship);
  player.Gameboard.placeShip(2, 0, player.battleship);
  player.Gameboard.placeShip(3, 0, player.battleship);
  player.Gameboard.placeShip(3, 8, player.destroyer);
  player.Gameboard.placeShip(4, 8, player.destroyer);
  player.Gameboard.placeShip(5, 8, player.destroyer);
  player.Gameboard.placeShip(6, 3, player.submarine);
  player.Gameboard.placeShip(7, 3, player.submarine);
  player.Gameboard.placeShip(8, 3, player.submarine);
  player.Gameboard.placeShip(8, 7, player.skiff);
  player.Gameboard.placeShip(8, 8, player.skiff);
}

export { playerShipPlacement };
