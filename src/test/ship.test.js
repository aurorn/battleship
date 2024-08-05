import Ship from "../modules/ship"

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
  })

  test("Ship class throws an Error if entered parameter is not between 1 - 5", () => {
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
