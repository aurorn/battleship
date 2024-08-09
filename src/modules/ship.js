export default class ship {
  #size;
  #id;

  #hits = 0;

  constructor(size, id) {
    if (!size) throw new TypeError("Please Provide the Ship size.");

    if (typeof size !== "number") {
      throw new TypeError("The Ship size must be a number!");
    }

    if (size < 2 || size > 5) {
      throw new RangeError(
        "Ship size cannot be shorter than 2 or longer than 5 squares",
      );
    }

    this.#size = size;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
  get size() {
    return this.#size;
  }
  get hits() {
    return this.#hits;
  }

  hit() {
    if (this.isSunk()) {
      throw new RangeError("This Ship has been sunk already.");
    }
    this.#hits += 1;
  }

  isSunk() {
    return this.#hits === this.#size;
  }
}
