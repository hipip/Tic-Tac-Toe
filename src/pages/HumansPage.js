import PlayerSetup from "../components/PlayerSetup.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";

const HumansPage = () => {
  const cont = document.createElement("div");
  cont.className = "page";
  cont.id = "humans-page";

  const playersSetupContainer = document.createElement("div");
  playersSetupContainer.className = "players-setup-container";
  playersSetupContainer.appendChild(PlayerSetup("player-1"));
  playersSetupContainer.appendChild(PlayerSetup("player-2"));

  cont.appendChild(Title("Players Setup"));
  cont.appendChild(playersSetupContainer);
  cont.appendChild(Button("btn", "start-game-btn", "#ff4523", "Start Game"));

  return cont;
};

export default HumansPage;
