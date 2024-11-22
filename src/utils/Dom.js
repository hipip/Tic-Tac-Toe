const changePage = (newPage) => {
  const currentPage = document.querySelector(".page");
  currentPage.classList.remove("disappear", "appear");
  currentPage.classList.add("disappear");
  currentPage.addEventListener("animationend", () => {
    currentPage.remove();
    newPage.classList.add("appear");
    document.body.appendChild(newPage);
  });
};

const lockBoard = () => {
  document.querySelector("#board").classList.add("locked");
};

const unlockBoard = () => {
  document.querySelector("#board").classList.remove("locked");
};

const resetBoard = () => {
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
};

export { changePage, lockBoard, unlockBoard, resetBoard };
