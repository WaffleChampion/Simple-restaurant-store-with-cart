//imports menuitems array
import { menuItems } from "./menuItems.js";

//Creates Html cards for each item in storage
export function generateCheckoutHtml(storage, checkoutAreaDiv){
	if (storage && checkoutAreaDiv){
		checkoutAreaDiv.innerHTML='';
		// Creates Cards for each item in currentCart
		storage.forEach((cartItem, index) =>{
			// Creating Html Elements
			let itemDiv = document.createElement('div');
			let itemName = document.createElement('h2');
			let itemPrice = document.createElement('p');
			let itemAllergens = document.createElement('p');
			let itemImage = document.createElement('img');
			let itemQuantity = document.createElement('input');
			let quantityDiv = document.createElement('div');
			let removeButton = document.createElement('button');
			let increaseButton = document.createElement('button');
			let decreaseButton = document.createElement('button');

			// Setting attributes for the created Html Elements
			itemDiv.setAttribute('class', 'checkout-area__cart-item');
			itemDiv.setAttribute('data-index', index);
			itemName.setAttribute('class', 'checkout-area__item-name');
			itemPrice.setAttribute('class', 'checkout-area__item-price');
			itemAllergens.setAttribute('class', 'checkout-area__item-info');
			itemQuantity.setAttribute('type', 'number');
			itemQuantity.setAttribute('class', 'checkout-area__item-quantity');
			itemQuantity.setAttribute('value', cartItem.dishQuantity);
			itemQuantity.setAttribute('min', 0);
			itemQuantity.setAttribute('data-index', index);
			itemImage.setAttribute('src', cartItem.dishImage);
			itemImage.setAttribute('class', 'checkout-area__item-image');
			removeButton.setAttribute('class', 'checkout-area__remove-button');
			removeButton.setAttribute('data-index', index);
			increaseButton.setAttribute('class', 'checkout-area__increase-button');
			increaseButton.setAttribute('data-index', index);
			decreaseButton.setAttribute('class', 'checkout-area__decrease-button');
			decreaseButton.setAttribute('data-index', index);
			quantityDiv.setAttribute('class', 'checkout-area__quantity-container');

			// Setting what is displayed in the Html Elements
			itemName.innerText='Item name: '+cartItem.dishName;
			itemPrice.innerText=cartItem.dishPrice;
			itemAllergens.innerText=cartItem.dishAllergens;
			removeButton.innerText='remove';
			increaseButton.innerText='+';
			decreaseButton.innerText='-';

			// Attaching the Html Elements to parent
			quantityDiv.append(
				decreaseButton, 
				itemQuantity, 
				increaseButton );
			itemDiv.append(itemName, 
				itemAllergens,  
				itemPrice, 
				itemImage, 
				quantityDiv, 
				removeButton);
			checkoutAreaDiv.append(itemDiv);
		});
	}
}

//Displays the number of items in the cart
 export function displayItemsInCart(storage, cartLengthDiv){
	if (cartLengthDiv){
		let numberOfItemsInCart = storage;
		cartLengthDiv.style.display='block';
			
		if (!numberOfItemsInCart){
			cartLengthDiv.style.display='none';
		}
		if (numberOfItemsInCart){
			cartLengthDiv.innerText = numberOfItemsInCart.length;
		}
	}
}
 	//Generates page content
export function generateClickedMenuPage(pageOutput, header, image, description, allergens, price, currentPage){
	if (pageOutput){
		header.firstElementChild.innerText = menuItems[currentPage].name;
		image.src = menuItems[currentPage].image;
		description.innerText = menuItems[currentPage].description;
		allergens.innerText = menuItems[currentPage].info;
		price.innerText = menuItems[currentPage].price;		
	}
}

//renders current image
export function renderImage(slideShowImage, currentIndex){
	for (let image of slideShowImage){
		image.classList.remove('slide-show__image--active');
	}
	slideShowImage[currentIndex].classList.add('slide-show__image--active');
}

export function generateMenuItemCards(cardsDiv){
	if(cardsDiv){
		menuItems.forEach((item, index) =>{
			const articleElement = document.createElement('article');
			const headerElement = document.createElement('header');
			const h2Element = document.createElement('h2');
			const imageElement = document.createElement('img');
			const divElement = document.createElement('div');
			const pElement = document.createElement('p');

			articleElement.setAttribute('class', 'menu-cards__card');
			articleElement.setAttribute('data-index', index);
			imageElement.setAttribute('class', 'menu-cards__figure-image');
			divElement.setAttribute('class', 'menu-cards__card-content')

			h2Element.innerText = item.name;
			imageElement.src = item.image;
			pElement.innerText = item.description;

			headerElement.append(h2Element);
			divElement.append(pElement);
			articleElement.append(headerElement, imageElement, divElement);
			cardsDiv.append(articleElement);
			
		})
	}
}