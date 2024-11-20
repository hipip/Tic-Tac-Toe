import Cell from "./Cell.js";
const BoardElem = () => {
  const cont = document.createElement("div");
  cont.id = "board";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cont.appendChild(Cell(i, j));
    }
  }

  return cont;
};

export default BoardElem;
