import { Player } from "./player.js";

const P1 = new Player();
const P2 = new Player();

let turn = "1"; // "1" as in player 1

export function initGame() {
  setPlayerTypes();
}

function setPlayerTypes() {
  const nameP1 = prompt("Player 1 name. Enter nothing if CPU.");
  const nameP2 = prompt("Player 2 name. Enter nothing if CPU.");
  if (!nameP1) {
    P1.type = "cpu";
  }
  if (!nameP2) {
    P2.type = "cpu";
  }
}
