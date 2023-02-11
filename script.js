/**
 * AI Levels :
 *    - easy : makes random moves in the legal places
 *    - medium I don't know
 *    - hard : uses minmax  algorithm , unbeatable
 */

const easyAI = (mark) => {
  const incScore = () => score++;
  const play = () => {
    const choices = gameBoard.getEmptyCells();
    const choice = choices[Math.floor(Math.random() * choices.length)];
    gameBoard.placeMark(choice, mark);
  };
  return { name: "Easy Robot", type: "AI", score: 0, mark, play };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const isFull = (index) => board[index] !== "";
  const getCell = (index) => board[index];
  const getBoard = () => board;
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    displayController.updateBoard();
  };
  const getEmptyCells = () => {
    let r = [];
    for (let [index, cell] of board.entries()) if (!isFull(index)) r.push(index);
    return r;
  };
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
    if ((st = gameBoard.checkforWin())) {
      if (st == "win") {
        displayWinner(`${gameController.getCurrPlayer().name} is the winner !!`);
        gameController.incCurr();
      } else displayWinner("it's a Tie !");
      updateScoreBoard(gameController.getScores());
      lockBoard();
      updateInfoText("");
      return true;
    }
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
        if (p1Name && p1Mark) gameController.startGameHumanoid(p1Name, p1Mark, aiLevel);
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
    p2 = easyAI(pMark === "X" ? "O" : "X");
    curr = p1;
    displayController.startGame(p1, p2);
  };

  const incCurr = () => curr.score++;
  const getCurrPlayer = () => curr;
  const changeTurn = () => {
    if (curr === p1) curr = p2;
    else curr = p1;
  };

  const getScores = () => [p1.score, p2.score];
  return { getCurrPlayer, changeTurn, getScores, incCurr, startGameHuman, startGameHumanoid };
})();
