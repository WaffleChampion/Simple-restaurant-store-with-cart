import { menuItems } from "./menu-items.js";

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

	render();

	function generateClickedMenuPage(){
		if (pageOutput){
			header.firstElementChild.innerText = menuItems[currentPage].name;
			image.src = menuItems[currentPage].image;
			description.innerText = menuItems[currentPage].description;
			allergens.innerText = menuItems[currentPage].info;
			price.innerText = menuItems[currentPage].price;		
		}
	}

	//handler
	function render(){
		generateClickedMenuPage();
	}
}