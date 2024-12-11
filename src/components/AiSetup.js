import SubTitle from "./SubTitle.js";
import Button from "./Button.js";
const AiSetup = () => {
  const cont = document.createElement("div");
  cont.className = "ai-setup-container";

  const selectDifficulty = (e) => {
    e.currentTarget.textContent === "Easy"
      ? hardAiBtn.classList.remove("selected")
      : easyAiBtn.classList.remove("selected");

    e.currentTarget.classList.add("selected");
  };

  const easyAiBtn = Button(
    "btn ai-btn",
    "easy-ai-btn",
    "Easy",
    selectDifficulty
  );
  const hardAiBtn = Button(
    "btn ai-btn",
    "hard-ai-btn",
    "Unbeatable",
    selectDifficulty
  );

  cont.appendChild(SubTitle("Ai Level"));
  cont.appendChild(easyAiBtn);
  cont.appendChild(hardAiBtn);

  return cont;
};

export default AiSetup;
