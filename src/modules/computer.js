import Player from "./player";

export default class Computer extends Player {
  #lastMove;
  #moves = [];
  #focus;

  placeShips(ships) {
    const randCoords = () => ({
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      axis: Math.floor(Math.random() * 10) < 4 ? "x" : "y",
    });

    const placeShipRand = (ship) => {
      try {
        this.gameBoard.placeShip(ship, {
          ...randCoords(),
          length: ship.length,
        });
      } catch {
        placeShipRand(ship);
      }
    };
    ships.forEach((ship) => {
      placeShipRand(ship);
    });
  }

  static #genRandX(gameBoard) {
    const freeX = [];
    gameBoard.forEach((x, index) => {
      if (x.some((y) => !y.isHit)) freeX.push(index);
    });
    if (freeX.length === 0) {
      throw new RangeError(
        "Generating an Attack, if there is no free spot an attack will not be generated.",
      );
    }
    return freeX[Math.floor(Math.random() * freeX.length)];
  }

  static #genRandY(gameBoard) {
    const freeY = [];
    gameBoard.forEach((y, index) => {
      if (!y.isHit) freeY.push(index);
    });
    return freeY[Math.floor(Math.random() * freeY.length)];
  }

  static genRandAtk(gameBoard) {
    const randX = Computer.#genRandX(gameBoard);
    const randY = Computer.#genRandY(gameBoard, randX);
    return { x: randX, y: randY };
  }

  static #genRandAdjX(gameBoard, x, y) {
    const freeX = [];
    if (gameBoard[x - 1] && gameBoard[x - 1][y] && !gameBoard[x - 1][y].isHit) {
      freeX.push(x - 1);
    }
    if (gameBoard[x + 1] && gameBoard[x + 1][y] && !gameBoard[x + 1][y].isHit) {
      freeX.push(x + 1);
    }
    if (freeX.length > 1) {
      return { x: freeX[Math.random() < 0.5 ? 0 : 1], y };
    }

    if (freeX.length === 1) {
      return { x: freeX[0], y };
    }

    return false;
  }

  static #genRandAdjY(gameBoard, x, y) {
    const freeY = [];
    if (gameBoard[x] && gameBoard[x][y - 1] && !gameBoard[x][y - 1].isHit) {
      freeY.push(y - 1);
    }
    if (gameBoard[x] && gameBoard[x][y - 1] && !gameBoard[x][y - 1].isHit) {
      freeY.push(y + 1);
    }
    if (freeY.length > 1) {
      return { x, y: freeY[Math.random() < 0.5 ? 0 : 1] };
    }

    if (freeY.length === 1) {
      return { x, y: freeY[0] };
    }

    return false;
  }

  #genDirectAtk(gameBoard) {
    const firstHit = this.#moves.find((move) => move.firstHit === true);
    const lastMove = this.#moves.find[this.#moves.length - 1];
    if (gameBoard[lastMove.x][lastMove.y].ship) {
      lastMove.hitShip = true;
    }
    const hits = this.#moves.filter((move) => move.hitShip === true);
    const genAdjCoords = [Computer.#genRandAdjX, Computer.#genRandAdjY];
    if (hits.length < 2) {
      let randAdjCoords;
      while (!randAdjCoords) {
        genAdjCoords[Math.random() < 0.5 ? 0 : 1](
          gameBoard,
          firstHit.x,
          firstHit.y,
        );
      }
      this.#moves.push(randAdjCoords);
      return randAdjCoords;
    }
    const genDirectAdjMove = (callback) => {
      const startDir = callback(
        gameBoard,
        hits[hits.length - 1].x,
        hits[hits.length - 1].y,
      );
      if (startDir) {
        this.#moves.push(startDir);
        return startDir;
      }
      const revDir = callback(gameBoard, hits[0].x, hits[0].y);
      this.#moves.push(revDir);
      return revDir;
    };
    if (hits[0].x === hits[1].x) {
      return genDirectAdjMove(Computer.#genRandAdjY);
    }
    return genDirectAdjMove(Computer.#genRandAdjX);
  }

  genAtkCoords(gameBoard) {
    if (this.#focus && this.#focus.isSunk()) {
      this.#focus = false;
      this.#moves = [];
      this.#lastMove = Computer.genRandAtk(gameBoard);
      return this.#lastMove;
    }
    if (this.#focus) return this.#genDirectAtk(gameBoard);
    if (this.#lastMove && gameBoard[this.#lastMove.x][this.#lastMove.y].ship) {
      this.#focus = gameBoard[this.#lastMove.x][this.#lastMove.y].ship;
      this.#moves.push({ ...this.#lastMove, firstHit: true });
      return this.#genDirectAtk(gameBoard);
    }
    this.#lastMove = Computer.genRandAtk(gameBoard);
    return this.#lastMove;
  }
}
