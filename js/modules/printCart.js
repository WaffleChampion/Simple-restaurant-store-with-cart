export default function printCart(){
	let cartSum=0;
	console.log(JSON.parse(localStorage.getItem('cart')))
	const clearCartButton = document.querySelector('.checkout-area__clear-cart');
	const checkoutAreaDiv = document.querySelector('.checkout-area__cart-list');
	const purchaseButton = document.querySelector('.checkout-area__purchase');

	if(clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick);
	}
	if(purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick);
	}

	printCartList();

	function handleCartButtonClick(){
		localStorage.clear()
		window.location.href = "/";
	}

	function printCartList(){
		if(checkoutAreaDiv){
			let currentCart = JSON.parse(localStorage.getItem('cart'));

			currentCart.forEach(cartItem =>{
				cartSum +=cartItem.dishPrice;
				let itemDiv = document.createElement('div');
				let itemName = document.createElement('h2');
				let itemPrice = document.createElement('p');
				let itemAllergens = document.createElement('p')
				let itemImage = document.createElement('img')
				itemDiv.setAttribute('class', 'checkout-area__cart-item')
				itemName.setAttribute('class', 'checkout-area__item-name');
				itemPrice.setAttribute('class', 'checkout-area__item-price');
				itemAllergens.setAttribute('class', 'checkout-area__item-info')
				itemImage.setAttribute('src', cartItem.dishImage)
				itemImage.setAttribute('class', 'checkout-area__item-image')
				itemName.innerText='Item name: '+cartItem.dishName;
				itemPrice.innerText=cartItem.dishPrice;
				itemAllergens.innerText=cartItem.dishAllergens
				itemDiv.append(itemName, itemAllergens,  itemPrice, itemImage);
				checkoutAreaDiv.append(itemDiv);
			})
		}
		
	}
}