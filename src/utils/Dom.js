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
  document.querySelector("#boad").classList.remove("locked");
};

export { changePage, lockBoard, unlockBoard };
