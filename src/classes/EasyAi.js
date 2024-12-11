import { setMark } from "../utils/Dom.js";
import Board from "./Board.js";
export default class EasyAi {
  constructor(mark) {
    this.name = "Easy AI";
    this.mark = mark;
  }

  /**
   * the play function for easy ai which just picks a random place
   * @param {Board} board
   */
  play(board) {
    const possibleMoves = board.getPossibleMoves();
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const [i, j] = randomMove;
    board.setMark(i, j, this.mark);
    setMark(i, j, this.mark);
  }
}
