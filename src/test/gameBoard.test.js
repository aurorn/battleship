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
})