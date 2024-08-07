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