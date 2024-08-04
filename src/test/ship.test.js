import Ship from "../modules/ship";


test("Ship is correctly called if the length is between 2 and 5", () => {
  expect(new Ship(2)).not.toBeUndefined();
});

test("Ship sets the entered private length when the entered length is within bounds", () => {
  const ship = new Ship(2);
  expect(ship.length).toBe(2);
});
