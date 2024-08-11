import Ship from "../modules/ship";

test("Ship is correctly called if the length is between 2 and 5", () => {
  expect(new Ship(2)).not.toBeUndefined();
});

test("Ship sets the entered private length when the entered length is within bounds", () => {
  const ship = new Ship(2);
  expect(ship.length).toBe(2);
});

test("Ship class throws an Error if no parameter is entered", () => {
  expect(() => {
    Ship();
  }).toThrow();
  expect(() => {
    Ship(undefined);
  }).toThrow();
  expect(() => {
    Ship(null);
  }).toThrow();
});

test("Ship class throws an Error if entered parameter is a number", () => {
  expect(() => {
    Ship({});
  }).toThrow();
  expect(() => {
    Ship("");
  }).toThrow();
  expect(() => {
    Ship([]);
  }).toThrow();
});

test("Ship class throws an Error if entered parameter is not between 2 - 5", () => {
  expect(() => {
    Ship(-2);
  }).toThrow();
  expect(() => {
    Ship(0);
  }).toThrow();
  expect(() => {
    Ship(6);
  }).toThrow();
});

test("When a Ship is hit, the hit counter is up +1", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("When a ship is sunk, the hit method throws an error", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(() => {
    ship.hit();
  }).toThrow();
});

test("the isSunk method correctly asseses that the ship has been sunk", () => {
  const ship = new Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
