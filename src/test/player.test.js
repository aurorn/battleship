import GameBoard from "../modules/gameBoard";
import Player from "../modules/player";

test("Player class is correctly initialized if the correct Gameboard is given", () => {
    const gameBoard = new GameBoard();
    gameBoard.createBoard();
    expect(new Player(gameBoard)).not.toBeUndefined();
});

test("Player class throws an error if it doesn't get the correct gameboard", () => {
    expect(() => {
        new Player();
    }).toThrow();
    expect(() => {
        new Player(undefined);
    }).toThrow();
    expect(() => {
        new Player(null);
    }).toThrow();
});

test("Player class throws an error if the gameboard is not an object", () => {
    expect(() => {
        new Player("");
    }).toThrow();
    expect(() => {
        new Player([]);
    }).toThrow();
    expect(() => {
        new Player(function () {});
    }).toThrow();
});

test("Player class increments the score correctly", () => {
    const gameBoard = new GameBoard();
    gameBoard.createBoard();
    const player = new Player(gameBoard);

    expect(player.score).toBe(0);
    player.increaseScore();
    expect(player.score).toBe(1);
});

test("player class resets the score correctly", () => {
    const gameBoard = new GameBoard();
    gameBoard.createBoard();
    const player = new Player(gameBoard);

    player.increaseScore();
    expect(player.score).toBe(1);

    player.resetScore();
    expect(player.score).toBe(0);
});