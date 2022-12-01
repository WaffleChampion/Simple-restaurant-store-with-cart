import { generateClickedMenuPage } from "./render.js";

export default function printDishPage(){
	//Variables
	let currentPage;
	if (localStorage.getItem('currentPage')){
		currentPage = localStorage.getItem('currentPage');
	} 

	//Queryselectors
	const pageOutput = document.querySelector('.menu-item');
	const header = document.querySelector('.menu-item__header');
	const image = document.querySelector('.menu-item__image');
	const description = document.querySelector('.menu-item__description');
	const allergens = document.querySelector('.menu-item__allergens');
	const price = document.querySelector('.menu-item__price');

	//Eventlistener
	window.addEventListener('load', handleWindowLoad);

	//handler
	function handleWindowLoad(){
		generateClickedMenuPage(pageOutput, header, image, description, allergens, price, currentPage);
	}
}