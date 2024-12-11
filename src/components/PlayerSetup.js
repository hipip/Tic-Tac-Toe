const PlayerSetup = (name) => {
  const cont = document.createElement("div");
  cont.className = "player-setup-container";

  const playerNameLabel = document.createElement("label");
  playerNameLabel.setAttribute("for", `${name}-name-inp`);
  playerNameLabel.textContent = name;

  const playerNameInp = document.createElement("input");
  playerNameInp.type = "text";
  playerNameInp.placeholder = "enter your name";
  playerNameInp.className = "player-name-inp";
  playerNameInp.id = `${name}-name-inp`;

  const selectMark = (e) => {
    const selected = document.querySelector(`#${name}-mark-btn.selected`);
    if (selected) selected.classList.remove("selected");
    e.currentTarget.classList.add("selected");
  };

  const xMarkBtn = document.createElement("button");
  xMarkBtn.className = "mark-btn";
  xMarkBtn.id = `${name}-mark-btn`;
  xMarkBtn.type = "button";
  xMarkBtn.textContent = "X";
  xMarkBtn.onclick = selectMark;

  const oMarkBtn = document.createElement("button");
  oMarkBtn.className = "mark-btn";
  oMarkBtn.id = `${name}-mark-btn`;
  oMarkBtn.type = "button";
  oMarkBtn.textContent = "O";
  oMarkBtn.onclick = selectMark;

  const d2 = document.createElement("div");
  d2.className = "flex-center";
  d2.appendChild(xMarkBtn);
  d2.appendChild(oMarkBtn);

  cont.appendChild(playerNameLabel);
  cont.appendChild(playerNameInp);
  cont.appendChild(d2);
  return cont;
};

export default PlayerSetup;
