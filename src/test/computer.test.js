import Computer from "../modules/computer";
import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";

test("Computer places ships randomly on the board", () => {
  const gameBoard = new GameBoard();
  gameBoard.createBoard();

  const ships = [
    new Ship(2),
    new Ship(3),
    new Ship(3),
    new Ship(4),
    new Ship(5),
  ];
  const computer = new Computer(gameBoard);
  computer.placeShips(ships);
  expect(computer.gameBoard.ships.length).toBe(5);
  computer.gameBoard.ships.forEach((ship) => {
    expect(ship.shipInstance).toBeInstanceOf(Ship);
  });
});

test("computer generates a random atk", () => {
  const enemyGameBoard = new GameBoard();
  enemyGameBoard.createBoard();

  const atk = Computer.genRandAtk(enemyGameBoard.board);
  expect(atk.x >= 0 || atk.y >= 0 || atk.x <= 9 || atk.y <= 9).toBe(true);
});

test("Computer generates multiple random attacks", () => {
  const enemyGameBoard = new GameBoard();
  enemyGameBoard.createBoard();

  for (let i = 0; i < 99; i++) {
    let atk;
    do {
      atk = Computer.genRandAtk(enemyGameBoard.board);
    } while (enemyGameBoard.board[atk.x][atk.y].isHit);
    enemyGameBoard.receiveAttack(atk);
  }

  let noOfHits = 0;

  enemyGameBoard.board.forEach((x) => {
    x.forEach((y) => {
      if (y.isHit) noOfHits += 1;
    });
  });

  expect(noOfHits).toBe(99);
});

test("Computer guesses the next after hitting a ship", () => {
  const enemyGameBoard = new GameBoard();
  enemyGameBoard.createBoard();

  const ship = new Ship(4);
  enemyGameBoard.placeShip(ship, { x: 1, y: 1, axis: "y", length: 4 });

  const compGameBoard = new GameBoard();
  compGameBoard.createBoard();
  const computer = new Computer(compGameBoard);

  let atkCoords = computer.genAtkCoords(enemyGameBoard.board);

  let atkInfo = enemyGameBoard.receiveAttack(atkCoords);

  while (!atkInfo.hitShip) {
    atkCoords = computer.genAtkCoords(enemyGameBoard.board);
    atkInfo = enemyGameBoard.receiveAttack(atkCoords);
  }

  const guessAtk = computer.genAtkCoords(enemyGameBoard.board);
  expect(
    (guessAtk.x === atkCoords.x && guessAtk.y === atkCoords.y + 1) ||
      (guessAtk.x === atkCoords.x && guessAtk.y === atkCoords.y - 1) ||
      (guessAtk.y === atkCoords.y && guessAtk.x === atkCoords.x + 1) ||
      (guessAtk.y === atkCoords.y && guessAtk.x === atkCoords - 1),
  ).toBe(true);
});
