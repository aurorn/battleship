export const createNavBar = () => {
  const navBar = document.createElement("div");
  navBar.className = "navBar";

  const navLogo = document.createElement("div");
  navLogo.className = "nav-logo";

  navBar.appendChild(navLogo);

  const navTitleContainer = document.createElement("div");
  navTitleContainer.className = "nav-title-container";

  navBar.appendChild(navTitleContainer);

  const navMenuBox = document.createElement("div");
  navMenuBox.className = "nav-menu-box";

  navBar.appendChild(navMenuBox);

  const logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src = "#";

  navLogo.appendChild(logoImg);

  const navTitle = document.createElement("h1");
  navTitle.className = "nav-title";
  navTitle.innerText = "BATTLESHIP";

  navTitleContainer.appendChild(navTitle);

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
  gitLink.setAttribute("href", "https://github.com/aurorn");

  navMenuBox.appendChild(gameLink);
  navMenuBox.appendChild(aboutLink);
  navMenuBox.appendChild(gitLink);

  return navBar;
};
