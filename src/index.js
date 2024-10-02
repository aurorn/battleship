import "./styles/styles.css";
import { createNavBar } from "./modules/navBar";
import { initLoad } from "./modules/initLoad";

const loadUI = () => {
  const navBar = createNavBar();
  document.body.prepend(navBar);
};

loadUI();
initLoad();
