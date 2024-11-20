const Button = (className, id, color, textContent, onClick = () => {}) => {
  const btn = document.createElement("button");
  btn.className = className;
  btn.id = id;
  btn.style.setProperty("--color", color);
  btn.textContent = textContent;
  btn.onclick = onClick;
  btn.type = "button";
  return btn;
};

export default Button;
