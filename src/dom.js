export { populateGB, setTurnLabel, setWinLabel };

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile", "new");
  return tile;
}

function populateGB(gb) {
  for (let i = -1; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    const rowLabel = document.createElement("div");
    rowLabel.classList.add("grid-label");
    row.append(rowLabel);

    if (i === -1) {
      rowLabel.textContent = "";
      for (let j = 0; j < 10; j++) {
        const colLabel = document.createElement("div");
        colLabel.classList.add("grid-label");
        colLabel.textContent = j;
        row.appendChild(colLabel);
      }
    } else {
      rowLabel.textContent = i;
      for (let j = 0; j < 10; j++) {
        const tile = createTile();
        tile.classList.add(`${i}`, `${j}`);
        row.appendChild(tile);
      }
    }

    gb.appendChild(row);
  }
}

function setTurnLabel(player) {
  const turnLabel = document.getElementById("turn-label");
  turnLabel.textContent = `${player}'s Turn.  `;
}

function setWinLabel(player) {
  const winLabel = document.getElementById("win-label");
  winLabel.textContent = `${player} Wins!`;
}
