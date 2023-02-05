const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const isFull = (index) => board[index] !== "";
  const getCell = (index) => board[index];
  const getBoard = () => board;
  const checkforWin = () => {
    if (
      (isFull(0) && board[0] === board[1] && board[1] === board[2]) ||
      (isFull(3) && board[3] === board[4] && board[4] === board[5]) ||
      (isFull(6) && board[6] === board[7] && board[7] === board[8]) ||
      (isFull(0) && board[0] === board[3] && board[3] === board[6]) ||
      (isFull(1) && board[1] === board[4] && board[4] === board[7]) ||
      (isFull(2) && board[2] === board[5] && board[5] === board[8]) ||
      (isFull(0) && board[0] === board[4] && board[4] === board[8]) ||
      (isFull(2) && board[2] === board[4] && board[4] === board[6])
    )
      return "win";
    else if (board.every((cell, index) => isFull(index))) return "tie";
    else return false;
  };
  const placeMark = (index, mark) => {
    if (!isFull(index)) {
      board[index] = mark;
      console.log(board);
      return true;
    }
    return false;
  };
  return { placeMark, getBoard, getCell, checkforWin };
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const initScoreBoard = (player1, player2) => {
    document.querySelector(".player1-name").innerText = player1.name;
    document.querySelector(".player1-mark").innerText = player1.mark;
    document.querySelector(".player1-score").innerText = player1.score;
    document.querySelector(".player2-name").innerText = player2.name;
    document.querySelector(".player2-mark").innerText = player2.mark;
    document.querySelector(".player2-score").innerText = player2.score;
  };
  const updateScoreBoard = (score) => {
    document.querySelector(".player1-score").innerText = score[0];
    document.querySelector(".player2-score").innerText = score[1];
  };
  const resetBoard = () => {
    cells.forEach((cell) => (cell.innerText = ""));
  };
  const updateBoard = () => cells.forEach((cell, index) => (cell.innerText = gameBoard.getCell(index)));
  const init = (() => {
    cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (gameBoard.placeMark(index, gameController.getCurrPlayer().mark)) {
          updateBoard();
          if ((st = gameBoard.checkforWin())) {
            if (st == "win") {
              console.log(`${gameController.getCurrPlayer().name} has won !`);
              gameController.incCurr();
            } else console.log("it's a Tie !");
            updateScoreBoard(gameController.getScores());
            updateBoard();
            return;
          }
          gameController.changeTurn();
        } else {
          console.log("cell already taken");
        }
      })
    );
  })();
  return { initScoreBoard, updateBoard, updateScoreBoard, resetBoard };
})();

const gameController = (() => {
  const player = (name, mark, score) => {
    const incrementScore = () => ++score;
    return { name, mark, score, incrementScore };
  };
  const p1 = player("john", "X", 0);
  const p2 = player("mark", "O", 0);
  displayController.initScoreBoard(p1, p2);
  var turn = p1;
  const incCurr = () => turn.score++;
  const getCurrPlayer = () => turn;
  const changeTurn = () => {
    if (turn === p1) turn = p2;
    else turn = p1;
  };
  const getScores = () => [p1.score, p2.score];
  return { getCurrPlayer, changeTurn, getScores, incCurr };
})();
