const Cell = (i, j) => {
  const c = document.createElement("p");
  c.className = "cell";
  c.id = `cell-${i}-${j}`;
  return c;
};

export default Cell;
