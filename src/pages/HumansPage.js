import PlayerSetup from "../components/PlayerSetup.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Popup from "../components/Popup.js";
import { changePage } from "../utils/Dom.js";
import GamePage from "../pages/GamePage.js";
import Player from "../classes/Player.js";

const HumansPage = () => {
  const cont = document.createElement("div");
  cont.className = "page";
  cont.id = "humans-page";

  const playersSetupContainer = document.createElement("div");
  playersSetupContainer.className = "players-setup-container";
  playersSetupContainer.appendChild(PlayerSetup("player-1"));
  playersSetupContainer.appendChild(PlayerSetup("player-2"));

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
      const BODY = document.body;
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

  cont.appendChild(Title("Players Setup"));
  cont.appendChild(playersSetupContainer);
  cont.appendChild(
    Button("btn", "start-game-btn", "#ff4523", "Start Game", startHumanGame)
  );

  return cont;
};

export default HumansPage;
