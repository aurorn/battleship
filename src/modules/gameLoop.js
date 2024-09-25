import Player from "./player";
import ShipPlacement from "./placeShips";

export default class Loop {
  static gameLoop() {
    const userPlayer = new Player("player");
    const compPlayer = new Player("computer");  
    const shipPlacement = new ShipPlacement();

    
    shipPlacement.playerShipPlacement(userPlayer);
    userPlayer.startPlayerBoard();

    shipPlacement.computerShipPlacement(compPlayer);
    compPlayer.startCompBoard();

    
    this.playTurn(userPlayer, compPlayer);
  }

  static playTurn(userPlayer, compPlayer) {
    const compSquares = document.querySelectorAll('.compSquare');

    
    compSquares.forEach(square => {
      square.addEventListener("click", () => {
        if (compPlayer.Gameboard.checkSunkShips() || userPlayer.Gameboard.checkSunkShips()) {
          return; 
        }

        let squareColumn = square.id.slice(2, 3);  
        let squareRow = square.id.slice(1, 2);     

        
        if (!compPlayer.Gameboard.notGuessed(squareColumn, squareRow)) {
          return;
        }

        
        userPlayer.makeAttack(squareColumn, squareRow, compPlayer.Gameboard);
        compPlayer.startCompBoard();

        if (compPlayer.Gameboard.checkSunkShips()) {
          alert("User Wins");
          return;
        }

        
        compPlayer.compMove(userPlayer); 
        if (userPlayer.Gameboard.checkSunkShips()) {
          alert("Computer Wins");
          return;
        }

        
        let randColumn = Math.floor(Math.random() * 10);
        let randRow = Math.floor(Math.random() * 10);
        if (userPlayer.Gameboard.notGuessed(randColumn, randRow)) {
          compPlayer.makeAttack(randColumn, randRow, userPlayer.Gameboard);
          userPlayer.startPlayerBoard();
        }
      });
    });
  }
}
