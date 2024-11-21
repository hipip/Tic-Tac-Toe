const changePage = (newPage) => {
  const currentPage = document.querySelector(".page");
  currentPage.style.animation = "disappear .4s ease forwards";
  newPage.style.animation = "disappear .4s ease-in-out forwards reverse";
  currentPage.addEventListener("animationend", () => {
    currentPage.remove();
    document.body.appendChild(newPage);
  });
};

export { changePage };
