import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type = "real") {
    this.type = type;
    this.gb = new Gameboard();
  }
}
