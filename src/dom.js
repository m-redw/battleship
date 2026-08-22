import "./styles.css";

const gameboard1 = document.getElementById("gb1");
const gameboard2 = document.getElementById("gb2");

populateGB(gameboard1);
populateGB(gameboard2);

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile");
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
        row.appendChild(tile);
      }
    }

    gb.appendChild(row);
  }
}
