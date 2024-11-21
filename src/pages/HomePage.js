import Button from "../components/Button.js";
import Title from "../components/Title.js";
import { changePage } from "../utils/Dom.js";
import HumansPage from "./HumansPage.js";
const HomePage = () => {
  const container = document.createElement("div");
  container.id = "home-page";
  container.className = "page";

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";

  btnContainer.appendChild(
    Button("btn", "human-btn", "#ff7500", "Human 🙋", () =>
      changePage(HumansPage())
    )
  );
  btnContainer.appendChild(Button("btn", "robot-btn", "#dc143c", "Robot 🤖"));

  container.appendChild(Title("Which Species do you want to play against ?"));
  container.appendChild(btnContainer);
  return container;
};

export default HomePage;
