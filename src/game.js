import "./styles.css";
import { populateGB, setTurnLabel, setWinLabel } from "./dom.js";
import { Player } from "./player.js";

// DOM
const gameboard1DOM = document.getElementById("gb1");
const gameboard2DOM = document.getElementById("gb2");
populateGB(gameboard1DOM);
populateGB(gameboard2DOM);
setTurnLabel("Place your ships.");

// Game
const p1 = new Player();
const p2 = new Player();
let turn = 1;

// Ship placement
const placeButton = document.getElementById("place-ship");
const submitShipButton = document.getElementById("submit-ship");

let currentPlayerSelecting = 1;

placeButton.addEventListener("click", () => {
  if (currentPlayerSelecting === 1) {
    randomizeGB(p1, gameboard1DOM);
  } else {
    randomizeGB(p2, gameboard2DOM);
  }
});

function randomizeGB(player, playerGBDOM) {
  player.resetGB();
  removeGBDisplay(playerGBDOM);
  randomlyPlaceShips(4, player);
  randomlyPlaceShips(3, player);
  randomlyPlaceShips(3, player);
  randomlyPlaceShips(2, player);
  console.log(player.gb.grid);
  populateGB(playerGBDOM, player.gb.grid);
}

submitShipButton.addEventListener("click", () => {
  if (submitShipButton.textContent === "Next Player") {
    resetGBDisplay(gameboard1DOM);
    currentPlayerSelecting = 2;
    submitShipButton.textContent = "Start Game";
  } else {
    resetGBDisplay(gameboard2DOM);
    const body = document.querySelector("body");
    body.removeChild(placeButton);
    body.removeChild(submitShipButton);

    startGame();
  }
});

function randomlyPlaceShips(shipLength, player) {
  let randX = Math.floor(Math.random() * (9 - (shipLength - 1)));
  let randY = Math.floor(Math.random() * (9 - (shipLength - 1)));
  let randRotation = Math.round(Math.random());

  if (randRotation === 0) {
    while (
      !checkShipV([randX, randY], [randX, randY + shipLength - 1], player)
    ) {
      randX = Math.floor(Math.random() * (9 - shipLength - 1));
      randY = Math.floor(Math.random() * (9 - shipLength - 1));
    }
    player.gb.placeShip([randX, randY], [randX, randY + shipLength - 1]);
  } else {
    while (!checkShipH([randX, randY], [randX + shipLength, randY], player)) {
      randX = Math.floor(Math.random() * (9 - shipLength - 1));
      randY = Math.floor(Math.random() * (9 - shipLength - 1));
    }
    player.gb.placeShip([randX, randY], [randX + shipLength - 1, randY]);
  }
}

function removeGBDisplay(gameboard) {
  while (gameboard.firstChild) {
    gameboard.removeChild(gameboard.firstChild);
  }
}

function resetGBDisplay(gameboard) {
  const gridNodes = Array.from(gameboard.children).map((row) =>
    Array.from(row.children),
  );

  for (const rows of gridNodes) {
    for (const node of rows) {
      node.classList.remove("hit");
    }
  }
}

function checkShipH(start, end, player) {
  const yLevel = start[1];
  let startX = start[0];
  let endX = end[0];

  for (let i = startX; i <= endX; i++) {
    if (player.gb.grid[yLevel][i] !== null) return false;
  }
  return true;
}

function checkShipV(start, end, player) {
  const xLevel = start[0];
  let startY = start[1];
  let endY = end[1];

  for (let i = startY; i <= endY; i++) {
    if (player.gb.grid[i][xLevel] !== null) return false;
  }
  return true;
}

// place ship4 h or v
// place ship3 ignoring where ship 4 was placed h or v
// repeat until ship2 placedd

// Actualy game
function startGame() {
  const gb1Tiles = document.querySelectorAll("#gb1 .tile");
  const gb2Tiles = document.querySelectorAll("#gb2 .tile");
  setTurnLabel("Player 1's Turn.  ");

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
      setTurnLabel("Player 1's Turn.  ");
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
      setTurnLabel("Player 2's Turn.  ");
    });
  });
}

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
