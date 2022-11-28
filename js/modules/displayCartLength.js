export default function displayCartLength(){
	const cartLengthDiv = document.querySelector('.header__cart-items')

	if(cartLengthDiv){
		let numberOfItemsInCart = JSON.parse(localStorage.getItem('cart'));

		cartLengthDiv.innerText = numberOfItemsInCart.length
	}
}