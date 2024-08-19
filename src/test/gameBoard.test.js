import Gameboard from "../modules/gameBoard";
import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";


test("board test", () => {
    let test = new GameBoard();
    test.board[3][5] = "test";
    expect(test.board[3][5]).toEqual("test");
  })

test("Gameboard accepts the targeted squares as the ship name", () => {
    let gameBoard = new GameBoard();
    gameBoard.placeShip(5, 9, "cruiser");
    expect(gameBoard.board[5][9]).toBe("cruiser")
})

test("Ship class gets placed on the board", () => {
    let gameBoard = new GameBoard();
    let ship = new Ship("cruiser", 3);
    gameBoard.placeShip(3, 4, ship);
    expect(gameBoard.board[3][4]).toEqual(ship);
})

test("Ship receives attack", () => {
    let gameBoard = new GameBoard();
    let ship = new Ship("cruiser", 3);
    gameBoard.placeShip(3, 4, ship);
    gameBoard.receiveAttack(3, 4);
    expect(ship.healthCheck()).toBe(2);
})

test("Miss testing", () => {
    let gameBoard = new GameBoard();
    let ship = new Ship("cruiser", 3);
    gameBoard.placeShip(3, 4, ship);
    gameBoard.receiveAttack(3, 5);
    expect(gameBoard.board[3][5]).toBe("miss");
})

test("Miss logging", () => {
    let gameBoard = new GameBoard();
    let ship = new Ship("cruiser", 3);
    gameBoard.placeShip(3, 4, ship);
    gameBoard.receiveAttack(3, 5);
    gameBoard.receiveAttack(3, 6);
    gameBoard.receiveAttack(3, 4);
    expect(gameBoard.logMisses()).toEqual([(3, 5), (3, 6)]);
})