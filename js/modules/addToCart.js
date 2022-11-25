export default function addToCart(){
	let cart = []

	const addToCartButton = document.querySelector('.menu-item__add-to-cart')
	const itemName = document.querySelector('.menu-item__header')

	if(addToCartButton){
		addToCartButton.addEventListener('click', handleAddToCartClick)

		function handleAddToCartClick(){
			console.log(localStorage.getItem('cart'))
			cart = JSON.parse(localStorage.getItem('cart'))
			console.log(cart)
			cart.push({
				dishName: itemName.innerText,
				dishPrice: 200
			})
			//cart.concat()


			localStorage.setItem('cart', JSON.stringify(cart))


		}
	}
	


	
}