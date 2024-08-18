import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";


test("board test", () => {
    let test = new GameBoard();
    test.board[3][5] = "test";
    expect(test.board[3][5]).toEqual("test");
})