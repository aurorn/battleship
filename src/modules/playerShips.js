import { createPlayerBoard, createCompBoard } from "./DOMloader";
import { shipPlacer } from "./alertScreens";

function playerShipPlacement(player) {
  return new Promise((resolve) => {
    const battleApp = document.querySelector(".battle-app");
    battleApp.appendChild(createPlayerBoard(player.name));
    battleApp.appendChild(shipPlacer());

    let ships = [
      player.carrier,
      player.battleship,
      player.destroyer,
      player.submarine,
      player.skiff,
    ];
    let index = 0;

    showHelpText(ships[index]);

    let playerSquares = document.querySelectorAll(".playerSquare");
    playerSquares.forEach((square) => {
      square.addEventListener("mouseover", () => {
        placementHover(player, ships[index], square);
      });
      square.addEventListener("mouseout", () => {
        playerSquares.forEach((box) => {
          box.classList.remove("validPlacement", "invalidPlacement");
        });
      });
      square.addEventListener("click", () => {
        if (square.classList.contains("validPlacement")) {
          placeShip(player, ships[index]);
          index++;
          playerSquares.forEach((box) => {
            box.classList.remove("validPlacement");
          });
          if (index < 5) {
            showHelpText(ships[index]);
          } else {
            runGame(player);
            resolve();
          }
        }
      });
    });
  });
}

function showHelpText(ship) {
  let helperText = document.querySelector(".helpText");
  helperText.textContent = `Select the location of your ${ship.name}`;
}

function runGame(player) {
  const battleApp = document.querySelector(".battle-app");
  let helper = document.querySelector(".shipPlacer");
  battleApp.removeChild(helper);

  let playerBoard = document.querySelector(".playerBoard");
  battleApp.removeChild(playerBoard);

  battleApp.appendChild(createPlayerBoard(player.name));
  battleApp.appendChild(createCompBoard());
}

function placementHover(player, ship, square) {
  let shipLocations = [];
  let squareColumn = Number(square.id.slice(2, 3));
  let squareRow = Number(square.id.slice(1, 2));

  let rotateBtn = document.querySelector(".helpBtn");
  if (rotateBtn.classList.contains("horizontal")) {
    if (squareColumn + (ship.length - 1) > 9) {
      for (let i = 0; i < ship.length; i++) {
        let shipColumn = squareColumn + i;
        let shipRow = squareRow;
        if (shipColumn <= 9 && shipRow <= 9) {
          let shipID = document.querySelector(`#p${shipRow}${shipColumn}`);
          shipID.classList.add("invalidPlacement");
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        let shipColumn = squareColumn + i;
        let shipRow = squareRow;
        shipLocations.push(`${shipColumn}${shipRow}`);
      }
      checkValidity();
    }
  } else {
    if (squareRow + (ship.length - 1) > 9) {
      for (let i = 0; i < ship.length; i++) {
        let shipColumn = squareColumn;
        let shipRow = squareRow + i;
        if (shipColumn <= 9 && shipRow <= 9) {
          let shipID = document.querySelector(`#p${shipRow}${shipColumn}`);
          shipID.classList.add("invalidPlacement");
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        let shipColumn = squareColumn;
        let shipRow = squareRow + i;
        shipLocations.push(`${shipColumn}${shipRow}`);
      }
      checkValidity();
    }
  }
  function checkValidity() {
    let validPlacement = shipLocations.every((location) => {
      return player.Gameboard.isEmpty(
        location.slice(0, 1),
        location.slice(1, 2),
      );
    });

    if (validPlacement === true) {
      shipLocations.forEach((location) => {
        let shipID = document.querySelector(
          `#p${location.slice(1, 2)}${location.slice(0, 1)}`,
        );
        shipID.classList.add("validPlacement");
      });
    } else {
      shipLocations.forEach((location) => {
        let shipID = document.querySelector(
          `#p${location.slice(1, 2)}${location.slice(0, 1)}`,
        );
        shipID.classList.add("invalidPlacement");
      });
    }
  }
}

function placeShip(player, ship) {
  let shipLocations = document.querySelectorAll(".validPlacement");
  shipLocations.forEach((location) => {
    let locationColumn = location.id.slice(2, 3);
    let locationRow = location.id.slice(1, 2);
    player.Gameboard.placeShip(locationColumn, locationRow, ship);
    player.startPlayerBoard();
  });
}

export { playerShipPlacement };
