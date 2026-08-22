import "./styles.css";
import { populateGB, setTurnLabel, setWinLabel } from "./dom.js";
import { Player } from "./player.js";

// DOM
const gameboard1DOM = document.getElementById("gb1");
const gameboard2DOM = document.getElementById("gb2");
populateGB(gameboard1DOM);
populateGB(gameboard2DOM);
const gb1Tiles = document.querySelectorAll("#gb1 .tile");
const gb2Tiles = document.querySelectorAll("#gb2 .tile");

// Game
const p1 = new Player();
const p2 = new Player();

let turn = 1;

p1.gb.placeShip([0, 0], [0, 3]);
p1.gb.placeShip([2, 0], [2, 2]);
p1.gb.placeShip([2, 7], [2, 4]);

setTurnLabel("Player 1");

gb1Tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (turn === 1 || turn === 0) return;

    const classes = Array.from(tile.classList);
    const x = classes[2];
    const y = classes[3] ?? classes[2];
    const hitStatus = p1.gb.receiveAttack(x, y);

    if (hitStatus === true) {
      tile.classList.replace("new", "hit");
      tile.textContent = "O";

      if (p1.gb.allShipsSunk()) {
        turn = 0;
        setWinLabel("Player 2");
      }

      return;
    }

    tile.textContent = "X";
    tile.classList.replace("new", "miss");
    turn = 1;
    setTurnLabel("Player 1");
  });
});

gb2Tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (turn === 2 || turn === 0) return;

    const classes = Array.from(tile.classList);
    const x = classes[2];
    const y = classes[3] ?? classes[2];
    const hitStatus = p2.gb.receiveAttack(x, y);

    if (hitStatus === true) {
      tile.classList.replace("new", "hit");
      tile.textContent = "O";

      if (p2.gb.allShipsSunk()) {
        turn = 0;
        setWinLabel("Player 1");
      }

      return;
    }

    tile.textContent = "X";
    tile.classList.replace("new", "miss");
    turn = 2;
    setTurnLabel("Player 2");
  });
});

// initialize gameboards
// place ships

// get turn
// cover/disable wrong gameboard
// get tile selected by player/cpu
// call receiveAttack on that gameboard
// if hit, same turn
// if no hit, end turn and change turn to other player

// if all ships are destroyed on a gameboard,
//    determine winner and end game
