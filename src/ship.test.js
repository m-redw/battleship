import { Ship } from "./ship.js";

const newShip = new Ship(1);

test("Ship values correct", () => {
  expect(newShip.length).toBe(1);
  expect(newShip.hits).toBe(0);
  expect(newShip.sunk).toBe(false);
});

test.skip("Ship hit", () => {
  newShip.hit();
  expect(newShip.hits).toBe(1);
});

test("Ship sunk", () => {
  expect(newShip.isSunk()).toBe(false);
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
