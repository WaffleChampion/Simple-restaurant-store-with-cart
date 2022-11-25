export default function printCart(){
	let cartSum=0;
	console.log(JSON.parse(localStorage.getItem('cart')))
	const clearCartButton = document.querySelector('.checkout-area__clear-cart');
	const checkoutAreaDiv = document.querySelector('.checkout-area__cart-list');
	const purchaseButton = document.querySelector('.checkout-area__purchase');

	if(clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick)
	}
	if(purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick)
	}

	printCartList();

	function handleCartButtonClick(){
		localStorage.clear()
		window.location.href = "/";
	}

	function printCartList(){
		if(checkoutAreaDiv){
			let currentCart = JSON.parse(localStorage.getItem('cart'))

			currentCart.forEach(cartItem =>{
				cartSum +=cartItem.dishPrice;
				let itemDiv = document.createElement('div');
				let itemName = document.createElement('h2');
				let itemPrice = document.createElement('p');
				itemName.innerText='Item name: '+cartItem.dishName
				itemPrice.innerText='Price: '+cartItem.dishPrice
				itemDiv.append(itemName, itemPrice);
				checkoutAreaDiv.append(itemDiv);
			})
			console.log( cartSum)
		}
		
	}
}