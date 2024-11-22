const SubTitle = (textContent) => {
  const subTitle = document.createElement("h2");
  subTitle.className = "sub-title";
  subTitle.textContent = textContent;
  return subTitle;
};
export default SubTitle;
