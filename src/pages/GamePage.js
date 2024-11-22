import Title from "../components/Title.js";
import SubTitle from "../components/SubTitle.js";
import { board } from "../utils/Settings.js";
import { lockBoard, resetBoard, unlockBoard } from "../utils/Dom.js";
import Popup from "../components/Popup.js ";
import Button from "../components/Button.js";

const Cell = (i, j) => {
  const c = document.createElement("p");
  c.className = "cell";
  c.id = `cell-${i}-${j}`;
  return c;
};

const GamePage = (playerOne, playerTwo) => {
  const cont = document.createElement("div");
  cont.className = "page";
  cont.id = "game-page";

  const playerNames = document.createElement("div");
  playerNames.className = "player-names-cont";
  playerNames.appendChild(SubTitle(`${playerOne.name} ${playerOne.mark}`));
  playerNames.appendChild(SubTitle(`${playerTwo.name} ${playerTwo.mark}`));

  let currentPlayer = playerOne;

  const BoardElem = () => {
    const cont = document.createElement("div");
    cont.id = "board";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cont.appendChild(Cell(i, j));
      }
    }

    cont.onclick = (e) => {
      const target = e.target;
      if (
        target.tagName === "P" &&
        target.textContent === "" &&
        !cont.classList.contains("locked")
      ) {
        const [, i, j] = target.id.split("-");
        const currentMark = currentPlayer.mark;
        if (board.setMark(i, j, currentMark)) {
          target.textContent = currentMark;
          currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
          const result = board.isGameEnded();
          if (result === "X" || result === "O") {
            lockBoard();
            const winner = playerOne.mark === result ? playerOne : playerTwo;
            document.body.appendChild(
              Popup(`${winner.name} is the winner`, "#00a508")
            );
          } else if (result === "tie") {
            lockBoard();
            document.body.appendChild(Popup(`It's a tie`, "#4001a5"));
          } else {
            if (currentPlayer.name.includes("AI")) {
              currentPlayer.play(board);
              currentPlayer =
                currentPlayer === playerOne ? playerTwo : playerOne;
            }
          }
        }
      }
    };

    return cont;
  };

  const resetGame = () => {
    board.reset();
    resetBoard();
    unlockBoard();
    currentPlayer = playerOne;
  };

  cont.appendChild(Title("Tic Tac Toe"));
  cont.appendChild(playerNames);
  cont.appendChild(BoardElem());
  cont.appendChild(Button("btn", "play-again-btn", "reset Game", resetGame));

  return cont;
};

export default GamePage;
