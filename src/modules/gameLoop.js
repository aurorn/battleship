import Player from "./player";
import { playerShipPlacement, computerShipPlacement } from "./placeShips";

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
      userPlayer.turn === false;
      compPlayer.turn === true;
      compPlayer.startCompBoard();
      if (compPlayer.Gameboard.checkSunkShips() === true) {
        alert(`${userPlayer.name} Wins!`);
      }
      compPlayer.compMove(userPlayer);
      if (userPlayer.Gameboard.checkSunkShips() === true) {
        userPlayer.winGame();
      }

      setTimeout(function() {
        if (document.querySelector('.alertBox').classList.contains('hidden')) {
          setTimeout(function() {
            compPlayer.compMove(userPlayer);
            userPlayer.turn = true;
            compPlayer.turn = false;
            if (userPlayer.Gameboard.checkSunkShips() === true) {
              compPlayer.winGame();
            }
          }, 0)    
        } else {
          setTimeout(function() {
            compPlayer.compMove(userPlayer);
            userPlayer.turn = true;
            compPlayer.turn = false;
            if (userPlayer.Gameboard.checkSunkShips() === true) {
              compPlayer.winGame();
            }
          }, 1250)
        }}, 500);  
    });
  });
}

export { gameLoop };
