export default class Player {
  #gameBoard;

  #score = 0;

  constructor(gameBoard) {
    if (!gameBoard) {
      throw new TypeError("Players must have a gameBoard");
    }

    if (typeof gameBoard !== "object" || Array.isArray(gameBoard)) {
      throw new TypeError("gameBoard must be valid");
    }

    this.#gameBoard = gameBoard;
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  get score() {
    return this.#score;
  }

  increaseScore() {
    this.#score += 1;
  }

  resetScore() {
    this.#score = 0;
  }
}
