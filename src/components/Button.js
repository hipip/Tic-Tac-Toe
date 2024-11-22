const Button = (className, id, textContent, onClick = () => {}) => {
  const btn = document.createElement("button");
  btn.className = className;
  btn.id = id;
  btn.textContent = textContent;
  btn.onclick = onClick;
  btn.type = "button";
  return btn;
};

export default Button;
