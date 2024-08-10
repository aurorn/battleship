export default class ship {
  #length;
  #id;

  #hits = 0;

  constructor(length, id) {
    if (!length) throw new TypeError("Please Provide the Ship length.");

    if (typeof length !== "number") {
      throw new TypeError("The Ship length must be a number!");
    }

    if (length < 2 || length > 5) {
      throw new RangeError(
        "Ship length cannot be shorter than 2 or longer than 5 squares",
      );
    }

    this.#length = length;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
  get length() {
    return this.#length;
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
    return this.#hits === this.#length;
  }
}
