import "./styles/styles.css";
import { createNavBar } from "./modules/navBar";
import DOM from "./modules/DOMloader";
import Loop from "./modules/gameLoop";

createNavBar();
DOM.gameLoad();
Loop.gameLoop();
