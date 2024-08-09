import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";

test("Gameboard is called correctly", () => {
  expect(new GameBoard()).not.toBeUndefined();
});

test("Create a gameboard to be used", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();
  expect(gameBoard.board.length).toBe(10);
  gameBoard.board.forEach((x) => {
    expect(x.length).toBe(10);
    x.forEach((y) => {
      expect(y).toEqual({
        isHit: false,
      });
    });
  });
});

test("Able to place ships on the gameboard", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  expect(gameBoard.board[0][0]["ship"]).toEqual(ship);
  expect(gameBoard.board[0][1]["ship"]).toEqual(ship);
  expect(gameBoard.board[0][2]["ship"]).toEqual(ship);
  expect(gameBoard.board[0][3]["ship"]).toEqual(ship);
});

test("able to place a ship on both axis'", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "y", length: 4 });

  expect(gameBoard.board[0][0]["ship"]).toEqual(ship);
  expect(gameBoard.board[1][0]["ship"]).toEqual(ship);
  expect(gameBoard.board[2][0]["ship"]).toEqual(ship);
  expect(gameBoard.board[3][0]["ship"]).toEqual(ship);
});

test("The gameboard class specifies if it contains a ship with the designated ID", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4, "battleship");
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "y", length: 4 });

  expect(gameBoard.hasShip("battleship")).toBe(true);
  expect(gameBoard.hasShip("destroyer")).toBe(false);
});

test("Gameboard is able to remove a ship with specified ID", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4, "battleship");
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  gameBoard.removeship("battleship");

  expect(gameBoard.board[0][0]["ship"]).toBeUndefined();
  expect(gameBoard.board[0][1]["ship"]).toBeUndefined();
  expect(gameBoard.board[0][2]["ship"]).toBeUndefined();
  expect(gameBoard.board[0][3]["ship"]).toBeUndefined();
});

test("Gameboard throws an error if user tries to place more than 5 ships", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  const ship2 = new Ship(4);
  gameBoard.placeShip(ship2, { x: 1, y: 5, axis: "x", length: 4 });

  const ship3 = new Ship(4);
  gameBoard.placeShip(ship3, { x: 3, y: 0, axis: "x", length: 4 });

  const ship4 = new Ship(4);
  gameBoard.placeShip(ship4, { x: 3, y: 5, axis: "x", length: 4 });

  const ship5 = new Ship(4);
  gameBoard.placeShip(ship5, { x: 5, y: 0, axis: "x", length: 4 });

  const ship6 = new Ship(4);
  expect(() => {
    gameBoard.placeShip(ship6, { x: 5, y: 5, axies: "x", length: 4 });
  }).toThrow();
});

test("Detects if coords are out of bounds", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);

  expect(() => {
    gameBoard.placeShip(ship, { x: 0, y: 5, axis: "x", length: 4 });
  }).not.toThrow();

  expect(() => {
    gameBoard.placeShip(ship, { x: 8, y: 0, axis: "y", length: 4 });
  }).toThrow();
});

test("GameBoard correctly detects if coordinates overlap with existing ships", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  expect(() => {
    gameBoard.placeShip(ship, { x: 0, y: 3, axis: "x", length: 4 });
  }).toThrow();

  expect(() => {
    gameBoard.placeShip(ship, { x: 0, y: 5, axis: "x", length: 4 });
  }).not.toThrow();

  const ship2 = new Ship(4);
  gameBoard.placeShip(ship2, { x: 2, y: 0, axis: "y", length: 2 });

  expect(() => {
    gameBoard.placeShip(ship2, { x: 3, y: 0, axis: "y", length: 4 });
  }).toThrow();

  expect(() => {
    gameBoard.placeShip(ship2, { x: 5, y: 0, axis: "y", length: 4 });
  }).not.toThrow();
});

test("gameboard throws if user tries to hit coords out of bounds", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  expect(() => {
    gameBoard.receiveAttack({ x: 50, y: 50 });
  }).toThrow();
});

test("gameboard hits cells diagonally on ships that have been hit", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 1, y: 1, axis: "x", length: 4 });
  gameBoard.receiveAttack({ x: 1, y: 1 });

  expect(gameBoard.board[0][0].isHit).toBe(true);
  expect(gameBoard.board[2][0].isHit).toBe(true);
  expect(gameBoard.board[0][2].isHit).toBe(true);
  expect(gameBoard.board[2][2].isHit).toBe(true);
});

test("gameboard automatically hits adjecant cells of a ship that has been sunk", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 1, y: 1, axis: "x", length: 4 });

  gameBoard.receiveAttack({ x: 1, y: 1 });
  gameBoard.receiveAttack({ x: 1, y: 2 });
  gameBoard.receiveAttack({ x: 1, y: 3 });
  gameBoard.receiveAttack({ x: 1, y: 4 });

  expect(gameBoard.board[0][0].isHit).toBe(true);
  expect(gameBoard.board[0][1].isHit).toBe(true);
  expect(gameBoard.board[0][2].isHit).toBe(true);
  expect(gameBoard.board[0][3].isHit).toBe(true);
  expect(gameBoard.board[0][4].isHit).toBe(true);
  expect(gameBoard.board[0][5].isHit).toBe(true);

  expect(gameBoard.board[1][0].isHit).toBe(true);
  expect(gameBoard.board[1][5].isHit).toBe(true);

  expect(gameBoard.board[2][0].isHit).toBe(true);
  expect(gameBoard.board[2][1].isHit).toBe(true);
  expect(gameBoard.board[2][2].isHit).toBe(true);
  expect(gameBoard.board[2][3].isHit).toBe(true);
  expect(gameBoard.board[2][4].isHit).toBe(true);
  expect(gameBoard.board[2][5].isHit).toBe(true);
});

test("Gameboard shows a warning if you try to hit a coord multiple times", () => {
  const warnSpy = jest.spyOn(global.console, "warn");

  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  gameBoard.receiveAttack({ x: 2, y: 2 });
  gameBoard.receiveAttack({ x: 2, y: 2 });

  expect(warnSpy).toHaveBeenCalled();
});

test("gameboard sends hit to the correct ship when it has been hit", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  gameBoard.receiveAttack({ x: 0, y: 0 });
  expect(ship.hits).toBe(1);
  gameBoard.receiveAttack({ x: 0, y: 1 });
  gameBoard.receiveAttack({ x: 0, y: 2 });
  gameBoard.receiveAttack({ x: 0, y: 3 });

  expect(ship.isSunk()).toBe(true);
});

test("GameBoard correctly determines if all ships have been sunk", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  const ship2 = new Ship(4);
  gameBoard.placeShip(ship2, { x: 6, y: 0, axis: "x", length: 4 });

  gameBoard.receiveAttack({ x: 0, y: 0 });
  gameBoard.receiveAttack({ x: 0, y: 1 });
  gameBoard.receiveAttack({ x: 0, y: 2 });
  gameBoard.receiveAttack({ x: 0, y: 3 });

  expect(gameBoard.isGameOver()).toBe(false);

  gameBoard.receiveAttack({ x: 6, y: 0 });
  gameBoard.receiveAttack({ x: 6, y: 1 });
  gameBoard.receiveAttack({ x: 6, y: 2 });
  gameBoard.receiveAttack({ x: 6, y: 3 });

  expect(gameBoard.isGameOver()).toBe(true);
});

test("GameBoard correctly resets its board", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });
  gameBoard.receiveAttack({ x: 0, y: 0 });

  const oldBoard = gameBoard.board;

  gameBoard.resetBoard();

  const newGameBoard = gameBoard.board;

  expect(oldBoard).not.toEqual(newGameBoard);
});

test("GameBoard correctly deletes its current ships array", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ship = new Ship(4);
  gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4 });

  gameBoard.deleteShips();

  expect(gameBoard.ships).toStrictEqual([]);
});
