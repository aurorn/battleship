import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";

test("Gameboard is called correctly", () => {
    expect(new GameBoard()).not.toBeUndefined();
});