import { Ship } from "./ship";
import Gameboard from "./gameBoard";
import { alertGameOver } from "./alertScreens";

export default class Player {
  constructor(name) {
    this.name = name;
    this.turn = false;
    this.Gameboard = new Gameboard();
    this.skiff = new Ship("skiff", 2);
    this.submarine = new Ship("submarine", 3);
    this.destroyer = new Ship("destroyer", 3);
    this.battleship = new Ship("battleship", 4);
    this.carrier = new Ship("carrier", 5);
    this.allShips = [
      this.carrier,
      this.battleship,
      this.destroyer,
      this.submarine,
      this.skiff,
    ];
  }

  startAttack(column, row, enemyBoard) {
    if (enemyBoard.checkSunkShips() === true || this.turn === false) {
      return;
    }
    if (enemyBoard.notGuessed(column, row)) {
      enemyBoard.receiveAttack(column, row);
    }
    return;
  }

  /*compMove(userPlayer) {
      if (this.Gameboard.checkSunkShips() === true) {
        return;
      }
      let woundedShip = userPlayer.allShips.some(ship => {
        return ship.partialHit();
      })
      if (woundedShip === true) {
        let hitLocations = [];
        for (let column = 0; column < userPlayer.Gameboard.board.length; column++) {
          for (let row = 0; row < userPlayer.Gameboard.board[column].length; row++) {
            if (userPlayer.Gameboard.board[column][row] === 'hit') {
              hitLocations.push(`${column}${row}`);
            }
          }
        }
        let woundedLocations = [];
        hitLocations.forEach(location => {
          let hitColumn = Number(location.slice(0, 1));
          let hitRow = Number(location.slice(1, 2));
          if (hitColumn === 0 && hitRow === 0) {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1)) {
              woundedLocations.push(location);
            }
          } else if (hitColumn === 0 && hitRow === 9) {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          } else if (hitColumn === 9 && hitRow === 0) {
            if (userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1)) {
              woundedLocations.push(location);
            }
          } else if (hitColumn === 9 && hitRow === 9) {
            if (userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          } else if (hitColumn === 0) {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          } else if (hitColumn === 9) {
            if (userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          } else if (hitRow === 0) {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1)) {
              woundedLocations.push(location);
            }
          } else if (hitRow === 9) {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          } else {
            if (userPlayer.Gameboard.containsShip(hitColumn + 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn - 1, hitRow) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow + 1) ||
                userPlayer.Gameboard.containsShip(hitColumn, hitRow - 1)) {
              woundedLocations.push(location);
            }
          }
        })
        let randomWound = woundedLocations[Math.floor(Math.random() * woundedLocations.length)];
        let woundColumn = Number(randomWound.slice(0, 1));
        let woundRow = Number(randomWound.slice(1, 2));
        let woundGuesses = [];
        if (woundColumn === 0 && woundRow === 0) {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
        } else if (woundColumn === 0 && woundRow === 9) {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        } else if (woundColumn === 9 && woundRow === 0) {
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
        } else if (woundColumn === 9 && woundRow === 9) {
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        } else if (woundColumn === 0) {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        } else if (woundColumn === 9) {
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        } else if (woundRow === 0) {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
        } else if (woundRow === 9) {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        } else {
          woundGuesses.push(`${woundColumn + 1}${woundRow}`);
          woundGuesses.push(`${woundColumn - 1}${woundRow}`);
          woundGuesses.push(`${woundColumn}${woundRow + 1}`);
          woundGuesses.push(`${woundColumn}${woundRow - 1}`);
        }      
        let validGuesses = woundGuesses.filter(item => {
          let itemColumn = item.slice(0, 1);
          let itemRow = item.slice(1, 2);
          return userPlayer.Gameboard.notGuessed(itemColumn, itemRow);
        })
  
        console.log(validGuesses);
  
        let randomWoundGuess = validGuesses[Math.floor(Math.random() * validGuesses.length)];
        this.startAttack(randomWoundGuess.slice(0, 1), randomWoundGuess.slice(1, 2), userPlayer.Gameboard)
        userPlayer.startPlayerBoard();
      } else {
        let notGuessed = []
        for (let i = 0; i < userPlayer.Gameboard.board.length; i++) {
          for (let j = 0; j < userPlayer.Gameboard.board[i].length; j++) {
            if (userPlayer.Gameboard.notGuessed(i, j) === true) {
              notGuessed.push(`${i}${j}`);
            }
          }
        }
        if (notGuessed.length > 0) {
          let randomGuess = notGuessed[Math.floor(Math.random() * notGuessed.length)];
          let randomColumn = randomGuess.slice(0, 1);
          let randomRow = randomGuess.slice(1, 2);
          this.startAttack(randomColumn, randomRow, userPlayer.Gameboard);
          userPlayer.startPlayerBoard();
        }
      }
    }*/

  compMove(userPlayer) {
    if (this.Gameboard.checkSunkShips()) {
      return;
    }

    const findAdjacentCells = (column, row) => {
      const adjacent = [];
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];

      directions.forEach(([dx, dy]) => {
        const newCol = column + dx;
        const newRow = row + dy;
        if (newCol >= 0 && newCol < 10 && newRow >= 0 && newRow < 10) {
          adjacent.push(`${newCol}${newRow}`);
        }
      });

      return adjacent;
    };

    const getValidGuesses = (locations) => {
      return locations.filter((location) => {
        const [col, row] = [Number(location[0]), Number(location[1])];
        return userPlayer.Gameboard.notGuessed(col, row);
      });
    };

    let woundedShip = userPlayer.allShips.some((ship) => ship.partialHit());

    if (woundedShip) {
      let hitLocations = [];
      // Collect hit locations
      for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
          if (userPlayer.Gameboard.board[col][row] === "hit") {
            hitLocations.push(`${col}${row}`);
          }
        }
      }

      // Find wounded ship locations with nearby ships
      let woundedLocations = hitLocations.filter((location) => {
        const [col, row] = [Number(location[0]), Number(location[1])];
        const adjacent = findAdjacentCells(col, row);
        return adjacent.some((adjLoc) => {
          const [adjCol, adjRow] = [Number(adjLoc[0]), Number(adjLoc[1])];
          return userPlayer.Gameboard.containsShip(adjCol, adjRow);
        });
      });

      // Pick a random wounded location and attack adjacent
      if (woundedLocations.length > 0) {
        let randomWound =
          woundedLocations[Math.floor(Math.random() * woundedLocations.length)];
        const [woundCol, woundRow] = [
          Number(randomWound[0]),
          Number(randomWound[1]),
        ];
        const adjacentCells = findAdjacentCells(woundCol, woundRow);
        const validGuesses = getValidGuesses(adjacentCells);

        if (validGuesses.length > 0) {
          let randomWoundGuess =
            validGuesses[Math.floor(Math.random() * validGuesses.length)];
          this.startAttack(
            randomWoundGuess[0],
            randomWoundGuess[1],
            userPlayer.Gameboard,
          );
          userPlayer.startPlayerBoard();
          return;
        }
      }
    }

    // No wounded ships, attack a random unguessed location
    let notGuessed = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (userPlayer.Gameboard.notGuessed(i, j)) {
          notGuessed.push(`${i}${j}`);
        }
      }
    }

    if (notGuessed.length > 0) {
      let randomGuess =
        notGuessed[Math.floor(Math.random() * notGuessed.length)];
      this.startAttack(randomGuess[0], randomGuess[1], userPlayer.Gameboard);
      userPlayer.startPlayerBoard();
    }
  }

  startPlayerBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        let square = document.getElementById(`p${j}${i}`);
        if (
          this.Gameboard.board[i][j] !== "hit" &&
          this.Gameboard.board[i][j] !== "miss" &&
          this.Gameboard.board[i][j] !== ""
        ) {
          let shipColor = this.getShipColor(this.Gameboard.board[i][j].name);
          square.style.backgroundColor = shipColor;
        } else if (this.Gameboard.board[i][j] === "miss") {
          square.style.backgroundColor = "black";
        } else if (this.Gameboard.board[i][j] === "hit") {
          square.style.backgroundColor = "red";
        }
      }
    }
  }

  startCompBoard() {
    for (let i = 0; i < this.Gameboard.board.length; i++) {
      for (let j = 0; j < this.Gameboard.board[i].length; j++) {
        let square = document.getElementById(`o${j}${i}`);
        if (this.Gameboard.board[i][j] === "miss") {
          square.style.backgroundColor = "black";
        } else if (this.Gameboard.board[i][j] === "hit") {
          square.style.backgroundColor = "red";
        }
      }
    }
  }

  getShipColor(shipName) {
    switch (shipName.toLowerCase()) {
      case "skiff":
        return "green";
      case "submarine":
        return "yellow";
      case "destroyer":
        return "blue";
      case "battleship":
        return "purple";
      case "carrier":
        return "orange";
      default:
        return "gray";
    }
  }

  winGame() {
    alertGameOver(this.name);
  }
}
