export const createHeader = () => {
  const header = document.createElement('div');
  header.className = 'header';

  document.body.appendChild(header);

  const headLogo = document.createElement('div');
  headLogo.className = 'head-logo';

  header.appendChild(headLogo);

  const headTitleContainer = document.createElement('div');
  headTitleContainer.className = 'head-title-container';

  header.appendChild(headTitleContainer);

  const navMenuBox = document.createElement('div');
  navMenuBox.className = 'nav-menu-box';

  header.appendChild(navMenuBox);

  const logoImg = document.createElement('img');
  logoImg.className = 'logo-img';
  logoImg.src = '#';

  headLogo.appendChild(logoImg);

  const headTitle = document.createElement('h1');
  headTitle.className = 'head-title';
  headTitle.innerText = 'Battleship Game';

  headTitleContainer.appendChild(headTitle);

  const navMenu = document.createElement('ul');
  navMenu.className = 'nav-menu';

  navMenuBox.appendChild(navMenu);


};
