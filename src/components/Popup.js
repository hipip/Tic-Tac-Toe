const Popup = (textContent, bgColor) => {
  const cont = document.createElement("div");
  cont.className = "popup";
  cont.style.setProperty("--bg-color", bgColor);

  const p = document.createElement("p");
  p.textContent = textContent;
  cont.appendChild(p);

  setTimeout(() => {
    cont.classList.add("disappear");
    cont.ontransitionend = () => {
      cont.remove();
    };
  }, 4000);

  return cont;
};

export default Popup;
