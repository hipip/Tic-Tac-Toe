import Board from "./classes/Board.js";

const b = new Board();
b.setMark(0, 0, "X");
console.log(b.toString());
b.setMark(0, 1, "X");
console.log(b.toString());
b.setMark(0, 2, "X");
console.log(b.toString());
console.log(b.isGameEnded());
