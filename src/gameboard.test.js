import { Gameboard } from "./gameboard.js";

const newGB = new Gameboard();

newGB.placeShip([0, 0], [0, 3]);

newGB.receiveAttack(0, 0);
newGB.receiveAttack(9, 0);
newGB.receiveAttack(0, 1);
newGB.receiveAttack(0, 2);
newGB.receiveAttack(0, 3);

console.log(newGB.grid);
console.log(newGB.allShipsSunk());
