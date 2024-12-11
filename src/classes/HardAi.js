import { setMark } from "../utils/Dom.js";
import Board from "./Board.js";

export default class HardAi {
  constructor(mark) {
    this.name = "Hard AI";
    this.mark = mark;
  }

  /**
   * the play function for Hard Ai (uses minimax algorithm)
   * @param {Board} board
   */
  play(board) {
    let bestScore = -Infinity;
    let bestMove;

    for (const [i, j] of board.getPossibleMoves()) {
      board.setMark(i, j, this.mark);
      let score = this.minimax(board, false);
      board.resetMark(i, j);
      if (score > bestScore) {
        bestScore = score;
        bestMove = [i, j];
      }
    }

    const [i, j] = bestMove;
    board.setMark(i, j, this.mark);
    setMark(i, j, this.mark);
  }

  /**
   * the classic minimax algorithm without alpha-beta pruning
   * @param {Board} board
   * @param {Boolean} isMaximizing
   */
  minimax(board, isMaximizing) {
    const res = board.isGameEnded();
    if (res === this.mark) return 1; // case where the AI is the winner
    else if (res === "tie") return 0; // case where it's a tie
    else if (res && res !== this.mark) return -1; // case where the human player is the winner

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const [i, j] of board.getPossibleMoves()) {
        board.setMark(i, j, this.mark);
        let score = this.minimax(board, false);
        board.resetMark(i, j);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let humanMark = this.mark === "X" ? "O" : "X";
      let bestScore = Infinity;
      for (const [i, j] of board.getPossibleMoves()) {
        board.setMark(i, j, humanMark);
        let score = this.minimax(board, true);
        board.resetMark(i, j);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
