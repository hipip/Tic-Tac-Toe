export default class Board {
  constructor() {
    this.mat = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  /**
   * checks if a cell is empty or not
   * @param {Number} i
   * @param {Number} j
   * @returns {Boolean} true if cell is empty
   */
  isEmpty(i, j) {
    return this.mat[i][j] === 0;
  }

  /**
   * sets a mark in the specified cell
   * @param {Number} i row index
   * @param {Number} j Column index
   * @param {String} mark X or O
   * @returns {Boolean} true if the mark was placed successfully, false otherwise
   */
  setMark(i, j, mark) {
    if (this.isEmpty(i, j)) {
      this.mat[i][j] = mark;
      return true;
    } else return false;
  }

  /**
   * checks for a horizontal win the index line
   * @param {Number} line
   * @returns {String | Boolean} the mark of the winner or false
   */
  horizontalWinHelper(line) {
    const [a, b, c] = this.mat[line];
    return a !== 0 && a === b && b === c ? a : false;
  }

  /**
   *
   * @returns {String | Boolean} the mark of the winner or false
   */
  horizontalWin() {
    return (
      this.horizontalWinHelper(0) ||
      this.horizontalWinHelper(1) ||
      this.horizontalWinHelper(2)
    );
  }

  /**
   *
   * @param {Number} col
   * @returns {String | Boolean} the mark of the winner vertically or false
   */
  verticalWinHelper(col) {
    const [a, b, c] = [this.mat[0][col], this.mat[1][col], this.mat[2][col]];
    return a !== 0 && a === b && b === c ? a : false;
  }

  /**
   *
   * @returns {String | Boolean} the mark of the winner vertically or false
   */
  verticalWin() {
    return (
      this.verticalWinHelper(0) ||
      this.verticalWinHelper(1) ||
      this.verticalWinHelper(2)
    );
  }

  /**
   *
   * @returns {String | Boolean} the mark of the player who won diagonally or false
   */
  diagonalWin() {
    const [a, b, c] = [this.mat[0][0], this.mat[1][1], this.mat[2][2]];
    const [d, e, f] = [this.mat[0][2], this.mat[1][1], this.mat[2][0]];
    return (a !== 0 && a === b && b === c) || (d !== 0 && d === e && e === f)
      ? this.mat[1][1]
      : false;
  }

  /**
   * checks if the board is full
   * @returns {Boolean} returns true if the board is full
   */
  isBoardFull() {
    return this.mat.flat().every((cell) => cell !== 0);
  }

  /**
   * checks if game has ended
   * @returns {String | Boolean} the mark of the winning player or false if game not ended yet
   */
  isGameEnded() {
    let winner =
      this.horizontalWin() || this.verticalWin() || this.diagonalWin();
    if (winner) return winner;
    if (this.isBoardFull()) return "tie";
    return false;
  }

  /**
   * resets the board to the initial state
   */
  reset() {
    this.mat = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  /**
   * clones the current board
   * @returns {Board}
   */
  clone() {
    const newBoard = new Board();
    newBoard.mat = this.mat.map((row) => [...row]); // Deep copy
    return newBoard;
  }

  /**
   * returns indexes of possible moves
   * @returns {Array}
   */
  getPossibleMoves() {
    const moves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.isEmpty(i, j)) moves.push([i, j]);
      }
    }
    return moves;
  }

  toString() {
    let str = "\n";
    for (let i = 0; i < 3; i++) {
      str += this.mat[i].join(" | ") + "\n";
      if (i < 2) str += "---------\n";
    }
    return str;
  }
}
