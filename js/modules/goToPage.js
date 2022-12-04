import { menuItems } from "./menuItems.js";

export default function goToPage(){
	//Queryselectors
	const homeIcon = document.querySelector('.header__image');
	const cartIcon = document.querySelector('.header__cart-icon');
	const cardsDiv = document.querySelector('.menu-cards__box');

	render();

	//Eventlisteners
	homeIcon.addEventListener('click', handleGoToHomeClick);
	cartIcon.addEventListener('click', handleGoToCartClick);

	//Handlers
	function handleMenuItemCardClick(event){
		navigateToClickedItemPage(event);
	}

	function handleGoToHomeClick(){
		navigateToIndex();
	}

	function handleGoToCartClick(){
		navigateToCheckoutPage();
	}

	//Navigates to the clicked cards items page
	function navigateToClickedItemPage(event){
		console.log(window.location);
		let clickedCard = event.currentTarget.dataset.index;
		window.location.href = "/html-pages/menu-item.html";
		localStorage.setItem('currentPage', clickedCard);
	}

	//Navigates to index
	function navigateToIndex(){
		window.location.href = "/";
	}

	//Navigates to checkout
	function navigateToCheckoutPage(){
		window.location.href = "/html-pages/checkout.html";
	}

		//Renders a clickable card for each item in menuitems
	function createMenuCardsDomElement(item, index){
		const articleElement = document.createElement('article');
		const buttonElement = document.createElement('button');
		const headerElement = document.createElement('header');
		const h2Element = document.createElement('h2');
		const imageElement = document.createElement('img');
		const divElement = document.createElement('div');
		const pElement = document.createElement('p');

		articleElement.setAttribute('class', 'menu-cards__card');
		buttonElement.setAttribute('data-index', index);
		buttonElement.setAttribute('class', 'menu-cards__card-button')
		imageElement.setAttribute('class', 'menu-cards__figure-image');
		divElement.setAttribute('class', 'menu-cards__card-content');

		h2Element.innerText = item.name;
		imageElement.src = item.image;
		pElement.innerText = item.description;

		buttonElement.addEventListener('click', handleMenuItemCardClick);


		headerElement.append(h2Element);
		divElement.append(pElement);
		articleElement.append(headerElement, imageElement, divElement);
		buttonElement.append(articleElement);

		return buttonElement;
	}

	function generateMenuItemCards(){
		if(cardsDiv){
			menuItems.forEach((item, index) =>{
				const buttonElement = createMenuCardsDomElement(item, index)

				cardsDiv.append(buttonElement);
			})
		}
	}

	function render(){
		generateMenuItemCards();
	}
}