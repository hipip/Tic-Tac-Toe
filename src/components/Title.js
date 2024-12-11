const Title = (textContent) => {
  const title = document.createElement("h1");
  title.className = "main-title";
  title.textContent = textContent;
  return title;
};
export default Title;
