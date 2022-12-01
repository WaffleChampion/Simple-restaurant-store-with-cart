export default function cart(){
	let storage = []
	if(JSON.parse(localStorage.getItem('cart'))){
		storage = JSON.parse(localStorage.getItem('cart'));
	}
	let index
	let cartQuantity
	let cartObject = {}
	let cartSum = 0
	
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
	let quantityInput
	let prices
	let decreaseQuantityButton
	let increaseQuantityButton
	let removeButton
	let cartItemDiv

	if(addToCartButton){
		console.log(addToCartButton)
		addToCartButton.addEventListener('click', handleAddToCartClick);
	}

	window.addEventListener('load', handleWindowLoad);

	if(clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick);
	}
	if(purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick);
	}

	function handleAddToCartClick(){
		createCartObject();
		let existInCart = verifyItemInCart()
		addItemToCart(existInCart);
		render();
		console.log(storage)
	}

	function handleWindowLoad(){
		render();
	}

	function handleCartButtonClick(){
		clearStorageAndGoToHome();
	}

	function handleQuantityInputChange(event){
		calculateSum()
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
		removeItem(event)
		render()
		calculateSum()
	}

	function createCartObject(){
		cartObject = {
			dishName: itemName.innerText,
			dishAllergens: itemAllergens.innerText,
			dishPrice: itemPrice.innerText,
			dishImage: itemImage.src,
			dishQuantity: 1,
			dishIndex: index
		}
	}

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

	function addItemToCart(variable){
		if (!variable){
			index = 0
			cartObject.dishIndex=index
			storage.push(cartObject)

			localStorage.setItem('cart', JSON.stringify(storage))	
		}
	}

	function render(){
		displayItemsInCart()
		if(checkoutAreaDiv && checkoutAreaTotal){
			generateCheckoutHtml();
			calculateSum();
			
		}
		setQueryselectors();
	}

	function displayItemsInCart(){
		if(cartLengthDiv){
			let numberOfItemsInCart = JSON.parse(localStorage.getItem('cart'));
			cartLengthDiv.style.display='block'
			
	
			if(!numberOfItemsInCart){
				cartLengthDiv.style.display='none'
			}
			if(numberOfItemsInCart){
				cartLengthDiv.innerText = numberOfItemsInCart.length
			}
		}
	}

	function generateCheckoutHtml(){
		if(storage){
			checkoutAreaDiv.innerHTML=''
			// Creates Cards for each item in currentCart
			storage.forEach((cartItem, index) =>{
				// Creating Html Elements
				let itemDiv = document.createElement('div');
				let itemName = document.createElement('h2');
				let itemPrice = document.createElement('p');
				let itemAllergens = document.createElement('p')
				let itemImage = document.createElement('img')
				let itemQuantity = document.createElement('input')
				let quantityDiv = document.createElement('div')
				let removeButton = document.createElement('button')
				let increaseButton = document.createElement('button')
				let decreaseButton = document.createElement('button')

				// Setting attributes for the created Html Elements
				itemDiv.setAttribute('class', 'checkout-area__cart-item')
				itemDiv.setAttribute('data-index', index)
				itemName.setAttribute('class', 'checkout-area__item-name');
				itemPrice.setAttribute('class', 'checkout-area__item-price');
				itemAllergens.setAttribute('class', 'checkout-area__item-info')
				itemQuantity.setAttribute('type', 'number')
				itemQuantity.setAttribute('class', 'checkout-area__item-quantity')
				itemQuantity.setAttribute('value', cartItem.dishQuantity)
				itemQuantity.setAttribute('min', 0)
				itemQuantity.setAttribute('data-index', index)
				itemImage.setAttribute('src', cartItem.dishImage)
				itemImage.setAttribute('class', 'checkout-area__item-image')
				removeButton.setAttribute('class', 'checkout-area__remove-button')
				removeButton.setAttribute('data-index', index)
				increaseButton.setAttribute('class', 'checkout-area__increase-button')
				increaseButton.setAttribute('data-index', index)
				decreaseButton.setAttribute('class', 'checkout-area__decrease-button')
				decreaseButton.setAttribute('data-index', index)
				quantityDiv.setAttribute('class', 'checkout-area__quantity-container')

				// Setting what is displayed in the Html Elements
				itemName.innerText='Item name: '+cartItem.dishName;
				itemPrice.innerText=cartItem.dishPrice;
				itemAllergens.innerText=cartItem.dishAllergens
				removeButton.innerText='remove'
				increaseButton.innerText='+';
				decreaseButton.innerText='-'

				// Attaching the Html Elements to parent
				quantityDiv.append(
					decreaseButton, 
					itemQuantity, 
					increaseButton )
				itemDiv.append(itemName, 
					itemAllergens,  
					itemPrice, 
					itemImage, 
					quantityDiv, 
					removeButton);
				checkoutAreaDiv.append(itemDiv);
			})
		}
	}

	function clearStorageAndGoToHome(){
		localStorage.clear()
		window.location.href = "/";
	}

	function calculateSum(){
		if(cartSum > 0){
			cartSum = 0
			console.log(cartItemDiv)
			console.log(quantityInput.length)
			for(let index=0; index < quantityInput.length; index +=1){
				cartSum += parseInt(quantityInput[index].value)*parseInt(prices[index].innerText)
			}
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
		}else if (cartSum===0 && storage){
			cartSum = 0
			storage.forEach(cartItem =>{
				cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity)
			})
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
		}

	}

	function increaseQuantity(event){
		let quantityInputNumber = Number(quantityInput[event.currentTarget.dataset.index].value)
		quantityInputNumber +=1
		quantityInput[event.currentTarget.dataset.index].value = quantityInputNumber
	}

	function decreaseQuantity(event){
		if(quantityInput[event.currentTarget.dataset.index].value > 0){
			quantityInput[event.currentTarget.dataset.index].value -= 1
		}
		if(Number(quantityInput[event.currentTarget.dataset.index].value) === 0){
			removeItem(event)
		}
	}

	function setQueryselectors(){
		quantityInput = document.querySelectorAll('.checkout-area__item-quantity');
		prices = document.querySelectorAll('.checkout-area__item-price');
		decreaseQuantityButton = document.querySelectorAll('.checkout-area__decrease-button');
		increaseQuantityButton = document.querySelectorAll('.checkout-area__increase-button');
		removeButton = document.querySelectorAll('.checkout-area__remove-button');
		cartItemDiv = document.querySelectorAll('.checkout-area__cart-item');
		
		if(quantityInput){
			quantityInput.forEach(item =>{
				item.addEventListener('change', handleQuantityInputChange)
			})
		}
		if(decreaseQuantityButton){
			decreaseQuantityButton.forEach(Element =>{
				Element.addEventListener('click', handleDecreaseQuantityButtonClick)
			})
		}
	
		if (increaseQuantityButton){
			increaseQuantityButton.forEach(Element =>{
				Element.addEventListener('click', handleIncreaseQuantityButtonClick)
			})
		}
	
		if(removeButton){
			removeButton.forEach(element =>{
				element.addEventListener('click', handleRemoveButtonClick)
			})
		}
	}

	function removeItem(event){
		cartItemDiv.forEach(item => {
			if(item.dataset.index === event.currentTarget.dataset.index){
				item.remove()
				storage.splice(event.currentTarget.dataset.index, 1)
				localStorage.setItem('cart', JSON.stringify(storage))			
				//checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
			}else if(item.dataset.index === event.currentTarget.parentElement.dataset.index){
				item.remove()
				storage.splice(event.currentTarget.parentElement.dataset.index, 1)
				localStorage.setItem('cart', JSON.stringify(storage))
				//checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
			}
		})
	}
}


