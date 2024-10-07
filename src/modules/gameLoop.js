import Player from "./player";
import { playerShipPlacement } from "./playerShips";
import { computerShipPlacement } from "./compShips";
import { alertGameStart } from "./alertScreens";

function gameLoop(userName) {
  const userPlayer = new Player(userName);
  playerShipPlacement(userPlayer);
  userPlayer.startPlayerBoard();
  userPlayer.turn = true;

  const compPlayer = new Player("Computer");
  computerShipPlacement(compPlayer);
  compPlayer.startCompBoard();

  playTurn(userPlayer, compPlayer);
}

function playTurn(userPlayer, compPlayer) {
  alertGameStart();
  let compSquares = document.querySelectorAll(".compSquare");

  compSquares.forEach((square) => {
    square.addEventListener("click", () => {
      let squareColumn = square.id.slice(2, 3);
      let squareRow = square.id.slice(1, 2);

      if (
        compPlayer.Gameboard.notGuessed(squareColumn, squareRow) === false ||
        compPlayer.Gameboard.checkSunkShips() === true ||
        userPlayer.Gameboard.checkSunkShips() === true ||
        userPlayer.turn === false
      ) {
        return;
      }

      userPlayer.startAttack(squareColumn, squareRow, compPlayer.Gameboard);
      userPlayer.turn = false;
      compPlayer.turn = true;

      compPlayer.startCompBoard();
      if (compPlayer.Gameboard.checkSunkShips()) {
        alert(`${userPlayer.name} Wins!`);
        return;
      }

      setTimeout(() => {
        if (!userPlayer.Gameboard.checkSunkShips()) {
          compPlayer.compMove(userPlayer);
          userPlayer.startPlayerBoard();
          userPlayer.turn = true;
          compPlayer.turn = false;
        }
        if (userPlayer.Gameboard.checkSunkShips()) {
          compPlayer.winGame();
        }
      }, 1); //Time delay for the Comp to attack
    });
  });
}

export { gameLoop };
