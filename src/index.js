import "./styles/styles.css";
import { createNavBar } from "./modules/navBar";
import { createBoardTitles } from "./modules/boardTitles";
import DOM from "./modules/DOMloader";
import Loop from "./modules/gameLoop";

const loadUI = () => {
    const navBar = createNavBar();
    const boardTitlesContainer = createBoardTitles();
    document.body.prepend(navBar, boardTitlesContainer);
}

loadUI();
createNavBar();
createBoardTitles();
DOM.gameLoad();
Loop.gameLoop();


