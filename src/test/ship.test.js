import Ship from "../modules/ship";


test("hit", () => {
  let smallShip = new Ship("submarine", 2);
  smallShip.hit();
  expect(smallShip.healthCheck()).toBe(1);
  expect(smallShip.isSunk).toBe(false);
})
test("sunk", () => {
  let largeShip = new Ship("carrier", 5);
  largeShip.hit();
  largeShip.hit();
  largeShip.hit();
  largeShip.hit();
  largeShip.hit();
  expect(largeShip.isSunk).toBe(true);
})