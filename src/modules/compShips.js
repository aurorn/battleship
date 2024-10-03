function computerShipPlacement(player) {
  const ships = [
    { name: player.carrier, length: 5 },
    { name: player.battleship, length: 4 },
    { name: player.destroyer, length: 3 },
    { name: player.submarine, length: 3 },
    { name: player.skiff, length: 2 },
  ];

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const orientation = Math.floor(Math.random() * 2);
      let startRow, startCol;

      if (orientation === 0) {
        startRow = Math.floor(Math.random() * 10);
        startCol = Math.floor(Math.random() * (10 - ship.length));
      } else {
        startRow = Math.floor(Math.random() * (10 - ship.length));
        startCol = Math.floor(Math.random() * 10);
      }

      if (
        canPlaceShip(
          player.Gameboard.board,
          startRow,
          startCol,
          ship.length,
          orientation,
        )
      ) {
        for (let i = 0; i < ship.length; i++) {
          if (orientation === 0) {
            player.Gameboard.placeShip(startRow, startCol + i, ship.name);
          } else {
            player.Gameboard.placeShip(startRow + i, startCol, ship.name);
          }
        }
        placed = true;
      }
    }
  });
}

function canPlaceShip(board, startRow, startCol, length, orientation) {
  for (let i = 0; i < length; i++) {
    if (orientation === 0) {
      if (board[startRow][startCol + i] !== "") return false;
    } else {
      if (board[startRow + i][startCol] !== "") return false;
    }
  }
  return true;
}
export { computerShipPlacement };
