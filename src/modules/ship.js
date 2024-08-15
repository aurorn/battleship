export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.isSunk = false;
  }

  hit() {
    this.health -= 1;
    this.checkIfSunk();
  }

  healthCheck() {
    return this.health;
  }

  checkIfSunk() {
    if (this.health <= 0) {
      this.isSunk = true;
    } else {
      this.isSunk = false;
    }
  }

  partialHit() {
    if (this.isSunk === false && this.health < this.length) {
      return true;
    } else {
      return false;
    }
  }
}
