import slideShow from "./modules/slide-show.js";
import goToPage from "./modules/goToPage.js";
import printDishPage from "./modules/printDishPage.js";
import cart from "./modules/Cart.js";
import { generateMenuItemCards, generateSlideShowImages } from "./modules/render.js";

const cardsDiv = document.querySelector('.menu-cards__box');
const slideShowImageContainer = document.querySelector('.slide-show__container')

generateSlideShowImages(slideShowImageContainer)
generateMenuItemCards(cardsDiv)
goToPage();
slideShow();
printDishPage();
cart();
