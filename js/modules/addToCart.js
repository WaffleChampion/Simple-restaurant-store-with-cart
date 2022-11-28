export default function addToCart(){
	let cart = []

	const addToCartButton = document.querySelector('.menu-item__add-to-cart');
	const itemName = document.querySelector('.menu-item__header');
	const itemAllergens =document.querySelector('.menu-item__allergens')
	const itemPrice = document.querySelector('.menu-item__price')
	const itemImage = document.querySelector('.menu-item__image')


	if(addToCartButton){
		addToCartButton.addEventListener('click', handleAddToCartClick)
	}
	function handleAddToCartClick(){
			if(JSON.parse(localStorage.getItem('cart'))){
				cart = JSON.parse(localStorage.getItem('cart'))
				cart.push({
					dishName: itemName.innerText,
					dishAllergens: itemAllergens.innerText,
					dishPrice: itemPrice.innerText,
					dishImage: itemImage.src
				})
				localStorage.setItem('cart', JSON.stringify(cart))
			}else{
				cart.push({
					dishName: itemName.innerText,
					dishAllergens: itemAllergens.innerText,
					dishPrice: itemPrice.innerText,
					dishImage: itemImage.src
				})

				localStorage.setItem('cart', JSON.stringify(cart))
				
			}
			location.reload();
		}
	

}