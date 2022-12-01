import { generateCheckoutHtml, displayItemsInCart } from "./render.js";

export default function cart(){
	//Variables
	let storage = [];
	if (JSON.parse(localStorage.getItem('cart'))){
		storage = JSON.parse(localStorage.getItem('cart'));
	}
	let index;
	let cartObject = {};
	let cartSum = 0;

	//Queryselectors
	const addToCartButton = document.querySelector('.menu-item__add-to-cart');
	const itemName = document.querySelector('.menu-item__header');
	const itemAllergens =document.querySelector('.menu-item__allergens');
	const itemPrice = document.querySelector('.menu-item__price');
	const itemImage = document.querySelector('.menu-item__image');
	const cartLengthDiv = document.querySelector('.header__cart-items');
	const checkoutAreaDiv = document.querySelector('.checkout-area__cart-list');
	const checkoutAreaTotal = document.querySelector('.checkout-area__total');
	const clearCartButton = document.querySelector('.checkout-area__clear-cart');
	const purchaseButton = document.querySelector('.checkout-area__purchase');
	let quantityInput;
	let prices;
	let decreaseQuantityButton;
	let increaseQuantityButton;
	let removeButton;
	let cartItemDiv;

	//Eventlisteners
	window.addEventListener('load', handleWindowLoad);

	if (addToCartButton){
		console.log(addToCartButton)
		addToCartButton.addEventListener('click', handleAddToCartClick);
	}

	if (clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick);
	}
	if (purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick);
	}

	//Handlers
	function handleAddToCartClick(){
		createCartObject();
		let existInCart = verifyItemInCart();
		addItemToCart(existInCart);
		render();
	}

	function handleWindowLoad(){
		render();
	}

	function handleCartButtonClick(){
		clearStorageAndGoToHome();
	}

	function handleQuantityInputChange(event){
		calculateSum();
	}

	function handleDecreaseQuantityButtonClick(event){
		decreaseQuantity(event);
		calculateSum();
	}

	function handleIncreaseQuantityButtonClick(event){
		increaseQuantity(event);
		calculateSum();
	}

	function handleRemoveButtonClick(event){
		removeItem(event);
		render();
		calculateSum();
	}

	//Creates an object to be added to storage
	function createCartObject(){
		cartObject = {
			dishName: itemName.innerText,
			dishAllergens: itemAllergens.innerText,
			dishPrice: itemPrice.innerText,
			dishImage: itemImage.src,
			dishQuantity: 1,
			dishIndex: index
		};
	}

	//Checks if the item exist in the cart, increases quantity if not
	function verifyItemInCart(){
			if (storage){
				let test = storage.some(item =>{
					return item.dishName === cartObject.dishName;
				});
				if (test){
					let index = storage.findIndex(item =>{
						return item.dishName === itemName.innerText;
					})
					storage[index].dishQuantity = storage[index].dishQuantity +=1;
					
					localStorage.setItem('cart', JSON.stringify(storage));
				}
				return test;
			} else{
				return false;
			}	
	}

	//Adds to cart if it doesn't already exist
	function addItemToCart(variable){
		if (!variable){
			index = 0;
			cartObject.dishIndex=index;
			storage.push(cartObject);
			localStorage.setItem('cart', JSON.stringify(storage));
		}
	}

	//Renders HTML
	function render(){
		displayItemsInCart(storage, cartLengthDiv);
		if (checkoutAreaDiv && checkoutAreaTotal){
			//generateCheckoutHtml();
			generateCheckoutHtml(storage, checkoutAreaDiv);
			calculateSum();
			setCheckoutQueryselectors();
			setCheckoutEventHandlers();
		}

	}

	//Empties localstorage and navigates to index.html
	function clearStorageAndGoToHome(){
		localStorage.clear();
		window.location.href = "/";
	}

	//Calculates total value in the cart and displays it
	function calculateSum(){
		if (cartSum > 0){
			cartSum = 0;
			for (let index=0; index < quantityInput.length; index +=1){
				cartSum += parseInt(quantityInput[index].value)*parseInt(prices[index].innerText);
			}
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr';
		}else if (cartSum===0 && storage){
			cartSum = 0;
			storage.forEach(cartItem =>{
				cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity);
			})
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr';
		}

	}

	//Increases the quantity of a specific item in the cart
	function increaseQuantity(event){
		let quantityInputNumber = Number(quantityInput[event.currentTarget.dataset.index].value);
		quantityInputNumber +=1;
		quantityInput[event.currentTarget.dataset.index].value = quantityInputNumber;
	}

	//Decreases the quantity of a secific item in the cart
	function decreaseQuantity(event){
		if (quantityInput[event.currentTarget.dataset.index].value > 0){
			quantityInput[event.currentTarget.dataset.index].value -= 1;
		}
		if (Number(quantityInput[event.currentTarget.dataset.index].value) === 0){
			removeItem(event);
		}
	}

	//Sets the queryselectors
	function setCheckoutQueryselectors(){
		quantityInput = document.querySelectorAll('.checkout-area__item-quantity');
		prices = document.querySelectorAll('.checkout-area__item-price');
		decreaseQuantityButton = document.querySelectorAll('.checkout-area__decrease-button');
		increaseQuantityButton = document.querySelectorAll('.checkout-area__increase-button');
		removeButton = document.querySelectorAll('.checkout-area__remove-button');
		cartItemDiv = document.querySelectorAll('.checkout-area__cart-item');
	}

	//Sets eventhandlers
	function setCheckoutEventHandlers(){
		if (quantityInput){
			quantityInput.forEach(item =>{
				item.addEventListener('change', handleQuantityInputChange);
			})
		}
		if (decreaseQuantityButton){
			decreaseQuantityButton.forEach(Element =>{
				Element.addEventListener('click', handleDecreaseQuantityButtonClick);
			})
		}
	
		if (increaseQuantityButton){
			increaseQuantityButton.forEach(Element =>{
				Element.addEventListener('click', handleIncreaseQuantityButtonClick);
			})
		}
	
		if (removeButton){
			removeButton.forEach(element =>{
				element.addEventListener('click', handleRemoveButtonClick);
			})
		}
	}

	//Removes a specific item from the cart
	function removeItem(event){
		cartItemDiv.forEach(item => {
			if (item.dataset.index === event.currentTarget.dataset.index){
				item.remove();
				storage.splice(event.currentTarget.dataset.index, 1);
				localStorage.setItem('cart', JSON.stringify(storage));			
			}else if (item.dataset.index === event.currentTarget.parentElement.dataset.index){
				item.remove();
				storage.splice(event.currentTarget.parentElement.dataset.index, 1);
				localStorage.setItem('cart', JSON.stringify(storage));
			}
		})
	}
}