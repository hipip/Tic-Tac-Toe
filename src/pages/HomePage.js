import Button from "../components/Button.js";
const HomePage = () => {
  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.className = "main-title";
  title.textContent = "Which Species do you want to play against ?";

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";

  btnContainer.appendChild(Button("btn", "human-btn", "#ff7500", "Human 🙋"));
  btnContainer.appendChild(Button("btn", "robot-btn", "#dc143c", "Robot 🤖"));

  container.appendChild(title);
  container.appendChild(btnContainer);
  return container;
};

export default HomePage;
