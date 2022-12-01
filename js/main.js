import slideShow from "./modules/slide-show.js";
import goToPage from "./modules/goToPage.js";
import printDishPage from "./modules/printDishPage.js";
import cart from "./modules/Cart.js";
import { generateMenuItemCards } from "./modules/render.js";

const cardsDiv = document.querySelector('.menu-cards__box');

generateMenuItemCards(cardsDiv)
goToPage();
slideShow();
printDishPage();
cart();
