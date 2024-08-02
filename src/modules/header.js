export const createHeader = () => {
  const header = document.createElement("div");
  header.className = "header";

  document.body.appendChild(header);

  const headLogo = document.createElement("div");
  headLogo.className = "head-logo";

  header.appendChild(headLogo);

  const headTitleContainer = document.createElement("div");
  headTitleContainer.className = "head-title-container";

  header.appendChild(headTitleContainer);

  const navMenuBox = document.createElement("div");
  navMenuBox.className = "nav-menu-box";

  header.appendChild(navMenuBox);

  const logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src = "#";

  headLogo.appendChild(logoImg);

  const headTitle = document.createElement("h1");
  headTitle.className = "head-title";
  headTitle.innerText = "Battleship Game";

  headTitleContainer.appendChild(headTitle);

  const gameLink = document.createElement("a");
  const aboutLink = document.createElement("a");
  const gitLink = document.createElement("a");

  gameLink.className = "nav-menu-link";
  gameLink.innerText = "Game";
  gameLink.setAttribute("href", "#");

  aboutLink.className = "nav-menu-link";
  aboutLink.innerText = "About";
  aboutLink.setAttribute("href", "#");

  gitLink.className = "nav-menu-link";
  gitLink.innerText = "Github";
  gitLink.setAttribute("href", "#");

  navMenuBox.appendChild(gameLink);
  navMenuBox.appendChild(aboutLink);
  navMenuBox.appendChild(gitLink);
};
