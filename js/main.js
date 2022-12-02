import slideShow from "./modules/slide-show.js";
import goToPage from "./modules/goToPage.js";
import printDishPage from "./modules/printDishPage.js";
import cart from "./modules/cart.js";
import { generateMenuItemCards, generateSlideShowImages } from "./modules/render.js";

const slideShowImageContainer = document.querySelector('.slide-show__container')
const cardsDiv = document.querySelector('.menu-cards__box');

if (slideShowImageContainer){
	generateSlideShowImages(slideShowImageContainer);
}

if (cardsDiv){
	generateMenuItemCards(cardsDiv);
}

goToPage();
slideShow();
printDishPage();
cart();
