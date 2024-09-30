import Player from "./player";
import {
  playerShipPlacement,
  computerShipPlacement
} from "./placeShips";

function gameLoop(userName) {
  const userPlayer = new Player(userName);
  playerShipPlacement(userPlayer);
  userPlayer.startPlayerBoard();

  const compPlayer = new Player('Computer');
  computerShipPlacement(compPlayer);
  compPlayer.startCompBoard();

  playTurn(userPlayer, compPlayer);

}

function playTurn(userPlayer, compPlayer) {
  let compSquares = document.querySelectorAll('.compSquare');
  compSquares.forEach(square => {
    square.addEventListener('click', () => {
      if(compPlayer.Gameboard.checkSunkShips() === true || userPlayer.Gameboard.checkSunkShips() === true) {
        return;
      }
      let squareColumn = square.id.slice(2, 3);
      let squareRow = square.id.slice(1, 2);
      if (compPlayer.Gameboard.notGuessed(squareColumn, squareRow) === false) {
        return;
      }
      userPlayer.startAttack(squareColumn,squareRow, compPlayer.Gameboard);
      compPlayer.startCompBoard();
      if(compPlayer.Gameboard.checkSunkShips() === true) {
        alert(`${userPlayer.name} Wins!`);
      }
      compPlayer.compMove(userPlayer);
      if(userPlayer.Gameboard.checkSunkShips() === true) {
        alert(`${compPlayer.name} Wins!`);
      }
    })
  })
}

export {gameLoop};