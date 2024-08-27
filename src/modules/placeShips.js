function playerShipPlacement(player) {
    player.gameboard.placeShip(8, 7, player.Skiff);
    player.gameboard.placeShip(8, 8, player.skiff);

    player.gameboard.placeShip(8, 3, player.submarine);
    player.gameboard.placeShip(7, 3, player.submarine);
    player.gameboard.placeShip(6, 3, player.submarine);

    player.gameboard.placeShip(3, 8, player.destroyer);
    player.gameboard.placeShip(4, 8, player.destroyer);
    player.gameboard.placeShip(5, 8, player.destroyer);

    player.gameboard.placeShip(3, 0, player.battleship);
    player.gameboard.placeShip(2, 0, player.battleship);
    player.gameboard.placeShip(1, 0, player.battleship);
    player.gameboard.placeShip(0, 0, player.battleship);

    player.gameboard.placeShip(1, 4, player.carrier);
    player.gameboard.placeShip(1, 5, player.carrier);
    player.gameboard.placeShip(1, 6, player.carrier);
    player.gameboard.placeShip(1, 7, player.carrier);
    
}