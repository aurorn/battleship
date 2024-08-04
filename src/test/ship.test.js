import ship from "../modules/ship";

test("Ship is correctly called if the length is between 2 and 5", () => {
  expect(new ship(2)).not.toBeUndefined();
});
