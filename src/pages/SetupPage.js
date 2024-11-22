import PlayerSetup from "../components/PlayerSetup.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Popup from "../components/Popup.js";
import { changePage } from "../utils/Dom.js";
import GamePage from "./GamePage.js";
import Player from "../classes/Player.js";
import AiSetup from "../components/AiSetup.js";
import EasyAi from "../classes/EasyAi.js";

const SetupPage = (mode) => {
  const BODY = document.body;
  const cont = document.createElement("div");
  cont.className = "page";
  cont.id = "setup-page";

  const playersSetupContainer = document.createElement("div");
  playersSetupContainer.className = "players-setup-container";
  playersSetupContainer.appendChild(PlayerSetup("player-1"));
  if (mode === "human")
    playersSetupContainer.appendChild(PlayerSetup("player-2"));
  else playersSetupContainer.appendChild(AiSetup());

  const startHumanGame = () => {
    const playerOne = new Player(
      document.querySelector("#player-1-name-inp").value.trim(),
      document.querySelector("#player-1-mark-btn.selected")?.textContent
    );

    const playerTwo = new Player(
      document.querySelector("#player-2-name-inp").value.trim(),
      document.querySelector("#player-2-mark-btn.selected")?.textContent
    );

    if (
      playerOne.name !== "" &&
      playerTwo.name !== "" &&
      playerOne.mark &&
      playerTwo.mark &&
      playerOne.mark !== playerTwo.mark
    ) {
      changePage(GamePage(playerOne, playerTwo));
    } else {
      if (playerOne.name === "" || playerTwo.name === "") {
        BODY.appendChild(Popup("Please enter a name for your players", "red"));
      } else if (!playerOne.mark) {
        BODY.appendChild(Popup("Player One should select a mark", "red"));
      } else if (!playerTwo.mark) {
        BODY.appendChild(Popup("Player Two should select a mark", "red"));
      } else {
        BODY.appendChild(Popup("Players should have different marks", "red"));
      }
    }
  };

  const startRobotGame = () => {
    const playerOne = new Player(
      document.querySelector("#player-1-name-inp").value.trim(),
      document.querySelector("#player-1-mark-btn.selected")?.textContent
    );
    const aiDifficulty =
      document.querySelector(".ai-btn.selected")?.textContent;
    if (!playerOne.name)
      BODY.appendChild(Popup("player 1, enter your name!", "red"));
    else if (!playerOne.mark)
      BODY.appendChild(Popup("player 1, choose your mark!", "red"));
    else if (!aiDifficulty) {
      BODY.appendChild(Popup("Please choose AI difficulty!", "red"));
    } else {
      const aiMark = playerOne.mark === "X" ? "O" : "X";
      const Ai = new EasyAi(aiMark);
      changePage(GamePage(playerOne, Ai));
    }
  };

  cont.appendChild(Title("Players Setup"));
  cont.appendChild(playersSetupContainer);
  cont.appendChild(
    Button(
      "btn",
      "start-game-btn",
      "Start Game",
      mode === "human" ? startHumanGame : startRobotGame
    )
  );

  return cont;
};

export default SetupPage;
