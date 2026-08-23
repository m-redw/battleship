import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type = "real") {
    this.type = type;
    this.gb = new Gameboard();
    this.previousShots = new Set();
    this.shotsList = [];
  }

  resetGB() {
    this.gb = new Gameboard();
  }
}
