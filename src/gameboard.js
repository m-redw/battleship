import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = [];
  }

  createGrid() {
    let columns = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      columns.push(row);
    }
    return columns;
  }

  placeShip(start, end) {
    // start and end pts need to be on same row or column
    if (start[0] !== end[0] && start[1] !== end[1]) {
      throw new Error("Ships can only be placed horizontally or vertically!");
    }
    if (
      start.some((coord) => coord < 0 || coord > 9) ||
      end.some((coord) => coord < 0 || coord > 9)
    ) {
      throw new Error("Coord value out of range (0-9)!");
    }

    const newShip = new Ship();
    this.ships.push(newShip);
    if (start[0] === end[0]) {
      newShip.length = Math.abs(start[1] - end[1]) + 1;
      this.#placeShipV(start, end, newShip);
    } else {
      newShip.length = Math.abs(start[0] - end[0]) + 1;
      this.#placeShipH(start, end, newShip);
    }
  }

  receiveAttack(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error("Coord value out of range (0-9)!");
    }

    if (this.grid[y][x] instanceof Ship) {
      this.grid[y][x].hit();
      this.grid[y][x] = "hit";
      return;
    } else if (this.grid[y][x] === "hit") {
      return;
    }
    this.grid[y][x] = "miss";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk);
  }

  #placeShipH(start, end, ship) {
    const yLevel = start[1];
    let startX;
    let endX;

    if (start[0] < end[0]) {
      startX = start[0];
      endX = end[0];
    } else {
      startX = end[0];
      endX = start[0];
    }

    for (let i = startX; i <= endX; i++) {
      this.grid[yLevel][i] = ship;
    }
  }

  #placeShipV(start, end, ship) {
    const xLevel = start[0];
    let startY;
    let endY;

    if (start[1] < end[1]) {
      startY = start[1];
      endY = end[1];
    } else {
      startY = end[1];
      endY = start[1];
    }

    for (let i = startY; i <= endY; i++) {
      this.grid[i][xLevel] = ship;
    }
  }
}
