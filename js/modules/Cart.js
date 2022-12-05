import { menuItems } from "./menu-items.js";

export default function cart(){
	//Variables
	let currentCartItems = [];
	let currentActiveMenuPage = [];
	if (localStorage.getItem('cart')){
		currentCartItems = JSON.parse(localStorage.getItem('cart'));
	}
	if (localStorage.getItem('currentPage')){
		currentActiveMenuPage = localStorage.getItem('currentPage');
	}
	let cartObject = {};

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

	//empty variables to hold queryselector elements when the elements are created
	let quantityInput = [];
	let cartItemDiv = [];

	render();
	//Eventlisteners

	if (addToCartButton){
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
		const itemInCart = verifyItemInCart();
		if (itemInCart) {
			changeItemQuantityInCart();
		} else {
			addItemToCart();
		}
		render();
	}

	function handleCartButtonClick(){
		clearStorageAndGoToHome();
	}

	function handleQuantityInputChange(event){
		updateQuantity(event);
		render();
	}

	function handleDecreaseQuantityButtonClick(event){
		decreaseQuantity(event);
		render();
	}

	function handleIncreaseQuantityButtonClick(event){
		increaseQuantity(event);
		render();
	}

	function handleRemoveButtonClick(event){
		removeItem(event);
		render();

	}

	//Creates an object to be added to storage
	function createCartObject(){
		cartObject = {
			dishName: menuItems[currentActiveMenuPage].name,
			dishAllergens: menuItems[currentActiveMenuPage].info,
			dishPrice: menuItems[currentActiveMenuPage].price,
			dishImage: menuItems[currentActiveMenuPage].image,
			dishQuantity: 1,
		};
	}

	//Checks if the item exist in the cart, increases quantity if not
	function verifyItemInCart(){
			if (currentCartItems){
				let checkIfItemExist = currentCartItems.some(item =>{
					return item.dishName === cartObject.dishName;
				});
				
				return checkIfItemExist;
			} else{
				return false;
			}	
	}

	function changeItemQuantityInCart(){
		let indexOfExistingItem = currentCartItems.findIndex(item =>{
			return item.dishName === cartObject.dishName;
		})
		currentCartItems[indexOfExistingItem].dishQuantity = currentCartItems[indexOfExistingItem].dishQuantity +=1;
	}

	//Adds to cart if it doesn't already exist
	function addItemToCart(){
		currentCartItems.push(cartObject);		
	}

	//Empties localstorage and navigates to index.html
	function clearStorageAndGoToHome(){
		localStorage.clear();
		window.location.href = "/";
	}

	//Calculates total value in the cart and displays it
	function calculateSum() {
		const cartItems = currentCartItems;
		
		return cartItems.reduce((total, currentCartItem) => {
			return total + (currentCartItem.dishPrice * currentCartItem.dishQuantity);
		}, 0);

	}

	function generateCheckoutHtml(storage, checkoutAreaDiv) {
		if (storage && checkoutAreaDiv) {
			checkoutAreaDiv.innerHTML='';
			// Creates Cards for each item in currentCart
			storage.forEach((cartItem, index) => {
				const itemDiv = createMenuItemDOMElement(cartItem, index);
				checkoutAreaDiv.append(itemDiv);
			});
		}
	}

	function createMenuItemDOMElement(cartItem, index) {
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
		itemQuantity.setAttribute('min', 1);
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
		itemName.innerText = 'Item name: '+ cartItem.dishName;
		itemPrice.innerText = cartItem.dishPrice + ' kr';
		itemAllergens.innerText = cartItem.dishAllergens;
		removeButton.innerText = 'remove';
		increaseButton.innerText = '+';
		decreaseButton.innerText = '-';

		quantityInput.push(itemQuantity);
		cartItemDiv.push(itemDiv);

		itemQuantity.addEventListener('change', handleQuantityInputChange);
	
		decreaseButton.addEventListener('click', handleDecreaseQuantityButtonClick);

		increaseButton.addEventListener('click', handleIncreaseQuantityButtonClick);

		removeButton.addEventListener('click', handleRemoveButtonClick);

		// Attaching the Html Elements to parent
		quantityDiv.append(
			decreaseButton, 
			itemQuantity, 
			increaseButton 
		);

		itemDiv.append(
			itemName, 
			itemAllergens,  
			itemPrice, 
			itemImage, 
			quantityDiv, 
			removeButton
		);

		return itemDiv;
	}

	function updateQuantity(event) {
		const selectedQuantityInput = event.currentTarget.dataset.index;
		let currentQuantityValue;
		currentQuantityValue = quantityInput[selectedQuantityInput].value
		currentCartItems[selectedQuantityInput].dishQuantity = currentQuantityValue;
	}

	//Increases the quantity of a specific item in the cart
	function increaseQuantity(event){
		currentCartItems[event.currentTarget.dataset.index].dishQuantity +=1
	}

	//Decreases the quantity of a secific item in the cart
	function decreaseQuantity(event){
		if (currentCartItems[event.currentTarget.dataset.index].dishQuantity > 1){
			currentCartItems[event.currentTarget.dataset.index].dishQuantity -= 1;
		}
	}

	function displayItemsInCart(storage, cartLengthDiv){
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

	//Removes a specific item from the cart
	function removeItem(event){
		cartItemDiv.forEach(item => {
			if (item.dataset.index === event.currentTarget.parentElement.dataset.index) {
				item.remove();
				currentCartItems.splice(event.currentTarget.parentElement.dataset.index, 1);
			}
		})
	}

	function saveToLocalStorage(){
		localStorage.setItem('cart', JSON.stringify(currentCartItems));
	}

	function getLocalStorage() {
		currentCartItems = JSON.parse(localStorage.getItem('cart'));

	}

	function renderCartSum(){
		const cartSum = calculateSum();
		checkoutAreaTotal.innerText = 'Total: ' + cartSum + ' kr';
	}

	//Renders HTML
	function render() {
		displayItemsInCart(currentCartItems, cartLengthDiv);
		if (checkoutAreaDiv && checkoutAreaTotal){
			generateCheckoutHtml(currentCartItems, checkoutAreaDiv);
			renderCartSum();
		}
		saveToLocalStorage();
	}
}