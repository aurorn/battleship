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
    gameBoard.placeShip(ship, { x: 0, y: 0, axis: "y", length: 4});

    expect(gameBoard.board[0][0]["ship"]).toEqual(ship);
    expect(gameBoard.board[1][0]["ship"]).toEqual(ship);
    expect(gameBoard.board[2][0]["ship"]).toEqual(ship);
    expect(gameBoard.board[3][0]["ship"]).toEqual(ship);
});


test("The gameboard class specifies if it contains a ship with the designated ID", () => {
    const gameBoard = new GameBoard();
    gameBoard.createBoard();

    const ship = new Ship(4, "battleship");
    gameBoard.placeShip(ship, { x: 0, y: 0, axis: "y", length: 4});

    expect(gameBoard.hasShip("battleship")).toBe(true);
    expect(gameBoard.hasShip("destroyer")).toBe(false);
});

test("Gameboard is able to remove a ship with specified ID", () => {
    const gameBoard = new GameBoard();
    gameBoard.createBoard();

    const ship = new Ship(4, "battleship");
    gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4});

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
    gameBoard.placeShip(ship, { x: 0, y: 0, axis: "x", length: 4});

    const ship2 = new Ship(4);
    gameBoard.placeShip(ship2, { x: 1, y: 5, axis: "x", length: 4});

    const ship3 = new Ship(4);
    gameBoard.placeShip(ship3, { x: 3, y: 0, axis: "x", length: 4});

    const ship4 = new Ship(4);
    gameBoard.placeShip(ship4, { x: 3, y: 5, axis: "x", length: 4});

    const ship5 = new Ship(4);
    gameBoard.placeShip(ship5, { x: 5, y: 0, axis: "x", length: 4});

    const ship6 = new Ship(4);
    expect(() => {
        gameBoard.placeShip(ship6, { x: 5, y: 5, axies: "x", length: 4})
    }).toThrow();
    
})