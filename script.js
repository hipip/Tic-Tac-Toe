/**
 * AI Levels :
 *    - easy : makes random moves in the legal places
 *    - medium I don't know
 *    - hard : uses minmax  algorithm , unbeatable
 */
const AI = (level, mark) => {
  let humanMark = mark === "X" ? "O" : "X";

  const easyAI = () => {
    const incrementScore = () => score++;
    const play = () => {
      console.log("tf");
      const indexes = gameBoard.getEmptyCells(gameBoard.getBoard());
      const index = indexes[Math.floor(Math.random() * indexes.length)];
      gameBoard.placeMark(index, mark);
    };
    return { name: "Easy Robot", type: "AI", score: 0, mark, play };
  };

  const hardAI = () => {
    const minimax = (b, depth, maximizingPlayer) => {
      let stat = gameBoard.checkforWin(b);
      if (stat === mark) return 1;
      else if (stat === humanMark) return -1;
      else if (stat === "tie") return 0;

      if (maximizingPlayer) {
        let maxVal = -Infinity;
        let emptyCells = gameBoard.getEmptyCells(b);
        for (let i of emptyCells) {
          b[i] = mark;
          maxVal = Math.max(maxVal, minimax(b, depth + 1, false));
          b[i] = "";
        }
        return maxVal;
      } else {
        let minVal = Infinity;
        let emptyCells = gameBoard.getEmptyCells(b);
        for (let i of emptyCells) {
          b[i] = humanMark;
          minVal = Math.min(minVal, minimax(b, depth + 1, true));
          b[i] = "";
        }
        return minVal;
      }
    };
    const play = () => {
      let boardCp = [...gameBoard.getBoard()];
      let bestScore = -Infinity;
      let bestPlace;
      let emptyIndexes = gameBoard.getEmptyCells(boardCp);
      for (let i of emptyIndexes) {
        boardCp[i] = mark;
        let score = minimax(boardCp, 0, false);
        boardCp[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestPlace = i;
        }
      }
      gameBoard.placeMark(bestPlace, mark);
    };
    return { name: "SUPER ROBOTO", type: "AI", score: 0, mark, play };
  };
  if (level === "easy") return easyAI();
  else if (level === "hard") return hardAI();
};

const gameBoard = (() => {
  var board = ["", "", "", "", "", "", "", "", ""];
  const isFull = (b = board, index) => b[index] !== "";
  const getCell = (index) => board[index];
  const getBoard = () => board;
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    displayController.updateBoard();
  };
  const getEmptyCells = (b = board) => {
    let r = [];
    for (let [index, cell] of b.entries()) if (!isFull(b, index)) r.push(index);
    return r;
  };
  /* returns the mark of the winner if ther is one , returns 0 if it's a tie else -1 */
  const checkforWin = (b = board) => {
    // diagonal win
    if ((isFull(b, 0) && b[0] === b[4] && b[4] === b[8]) || (isFull(b, 2) && b[2] === b[4] && b[4] === b[6])) return b[4];

    // horizontal win
    for (let i = 0; i < b.length; i += 3) if (isFull(b, i) && b[i] === b[i + 1] && b[i + 1] === b[i + 2]) return b[i];

    // vertical win
    for (let i = 0; i < 3; i++) if (isFull(b, i) && b[i] === b[i + 3] && b[i + 3] === b[i + 6]) return b[i];

    if (b.every((cell, index) => isFull(b, index))) return "tie";

    return null;
  };
  const placeMark = (index, mark) => {
    if (!isFull(board, index)) {
      board[index] = mark;
      displayController.updateBoard();
      return true;
    }
    return false;
  };
  return { placeMark, getBoard, getCell, checkforWin, resetBoard, getEmptyCells };
})();

const displayController = (() => {
  const selectModeContainer = document.querySelector(".select-mode-container");
  const startForm = document.querySelector(".players-form");
  const p1Marks = document.querySelectorAll(".player1-mark-");
  const p2Marks = document.querySelectorAll(".player2-mark-");
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
  const updateBoard = () => cells.forEach((cell, index) => (cell.innerText = gameBoard.getCell(index)));
  const displayWinner = (text) => {
    document.querySelector(".round-end-text").innerText = text;
    document.querySelector(".winner-container").classList.remove("hidden");
  };
  const lockBoard = () => {
    document.querySelector(".game-board").classList.add("locked");
  };
  const unlockBoard = () => {
    document.querySelector(".game-board").classList.remove("locked");
  };
  const startGame = (p1, p2) => {
    document.querySelector(".game-container").classList.remove("hidden");
    document.querySelector(".splash-screen-container").classList.add("hidden");
    initScoreBoard(p1, p2);
    updateInfoText(`It's ${p1.name}'s Turn ! `);
  };
  const updateInfoText = (txt) => {
    document.querySelector(".info-text").innerText = txt;
  };
  const checkForEnd = () => {
    let st = gameBoard.checkforWin();
    if (!st) return;
    else if (st === "X" || st === "O") {
      let winner = gameController.getPlayerByMark(st);
      displayWinner(`${winner.name} is the winner !!`);
      gameController.incCurr();
    } else displayWinner("it's a Tie !");
    updateScoreBoard(gameController.getScores());
    lockBoard();
    updateInfoText("");
    return true;
  };
  const init = (() => {
    const aiLevels = document.querySelectorAll(".ai-level");
    aiLevels.forEach((e) =>
      e.addEventListener("click", (e) => {
        aiLevels.forEach((lvl) => lvl.classList.remove("selected"));
        e.target.classList.toggle("selected");
      })
    );
    document.querySelector("#human-btn").addEventListener("click", () => {
      selectModeContainer.classList.add("hide");
      document.querySelector(".seetings-container").classList.remove("hide");
      document.querySelector(".seetings-container").classList.add("human-mode");
      document.querySelector(".ai-seeting").remove();
    });
    document.querySelector("#humanoid-btn").addEventListener("click", () => {
      selectModeContainer.classList.add("hide");
      document.querySelector(".seetings-container").classList.remove("hide");
      document.querySelector(".seetings-container").classList.add("humanoid-mode");
      document.querySelector(".p2-setting").remove();
    });
    p1Marks.forEach((mark, index) => {
      mark.addEventListener("click", (e) => {
        if (!p2Marks[index].classList.contains("selected")) {
          mark.classList.add("selected");
        } else {
          p2Marks[index].classList.remove("selected");
          p2Marks[index === 1 ? 0 : 1].classList.add("selected");
        }
        p1Marks[index].classList.add("selected");
        p1Marks[index === 1 ? 0 : 1].classList.remove("selected");
      });
    });
    p2Marks.forEach((mark, index) => {
      mark.addEventListener("click", (e) => {
        if (!p1Marks[index].classList.contains("selected")) {
          mark.classList.add("selected");
        } else {
          p1Marks[index].classList.remove("selected");
          p1Marks[index === 1 ? 0 : 1].classList.add("selected");
        }
        p2Marks[index].classList.add("selected");
        p2Marks[index === 1 ? 0 : 1].classList.remove("selected");
      });
    });
    startForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const p1Name = startForm["player1-name"].value.trim();
      const p1Mark = document.querySelector(".player1-mark-.selected")?.textContent;
      if (document.querySelector(".seetings-container").classList.contains("human-mode")) {
        const p2Name = startForm["player2-name"].value.trim();
        const p2Mark = document.querySelector(".player2-mark-.selected")?.textContent;
        console.log(p1Name, p1Mark, p2Name, p2Mark);
        if (p1Name && p2Name && p1Mark && p2Mark) gameController.startGameHuman(p1Name, p1Mark, p2Name, p2Mark);
      } else {
        const aiLevel = document.querySelector("input[name='level']:checked").value;
        if (p1Name && p1Mark && aiLevel) gameController.startGameHumanoid(p1Name, p1Mark, aiLevel);
      }
    });
    cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (!gameBoard.placeMark(index, gameController.getCurrPlayer().mark)) {
          updateInfoText(`Illegal Move by ${gameController.getCurrPlayer().name} !`);
          return;
        } else if (checkForEnd()) "";
        else {
          gameController.changeTurn();
          updateInfoText(`It's ${gameController.getCurrPlayer().name}'s Turn ! `);
          if (gameController.getCurrPlayer().type === "AI") {
            updateInfoText(`the AI is thinking ...`);
            lockBoard();
            setTimeout(() => {
              gameController.getCurrPlayer().play();
              checkForEnd();
              gameController.changeTurn();
              updateInfoText(`It's ${gameController.getCurrPlayer().name}'s Turn ! `);
              unlockBoard();
            }, 1500);
          }
        }
      })
    );
    document.querySelector(".restart-btn").addEventListener("click", (e) => {
      gameBoard.resetBoard();
      unlockBoard();
      e.target.parentElement.classList.add("hidden");
    });
  })();
  return { initScoreBoard, updateBoard, updateScoreBoard, displayWinner, startGame };
})();

const gameController = (() => {
  const player = (name, mark) => {
    const incrementScore = () => ++score;
    return { name, type: "human", mark, score: 0, incrementScore };
  };
  var curr;
  var p1, p2;
  const startGameHuman = (p1Name, p1Mark, p2Name, p2Mark) => {
    p1 = player(p1Name, p1Mark);
    p2 = player(p2Name, p2Mark);
    curr = p1;
    displayController.startGame(p1, p2);
  };

  const startGameHumanoid = (pName, pMark, aiLevel) => {
    p1 = player(pName, pMark);
    let aiMark = pMark === "X" ? "O" : "X";
    p2 = AI(aiLevel, aiMark);
    curr = p1;
    displayController.startGame(p1, p2);
  };

  const incCurr = () => curr.score++;
  const getCurrPlayer = () => curr;
  const changeTurn = () => {
    if (curr === p1) curr = p2;
    else curr = p1;
  };

  const getPlayerByMark = (mark) => {
    return p1.mark === mark ? p1 : p2;
  };

  const getScores = () => [p1.score, p2.score];
  return { getCurrPlayer, changeTurn, getScores, incCurr, startGameHuman, startGameHumanoid, getPlayerByMark };
})();
