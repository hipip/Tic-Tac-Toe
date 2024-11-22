import { setMark } from "../utils/Dom.js";
import Ai from "./Ai.js";
import Board from "./Board.js";
export default class EasyAi extends Ai {
  constructor(mark) {
    super("Easy AI", mark, EasyAi.play);
  }

  /**
   * the play function for easy ai which just picks a random place
   * @param {Board} board
   */
  static play(board) {
    const possibleMoves = board.getPossibleMoves();
    const randomMove =
      possibleMoves[parseInt(Math.random() * possibleMoves.length)];
    const [i, j] = randomMove;
    setMark(i, j, this.mark);
  }
}
