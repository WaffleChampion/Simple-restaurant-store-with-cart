export default function addToCart(){
	let cart = []
	let index

	const addToCartButton = document.querySelector('.menu-item__add-to-cart');
	const itemName = document.querySelector('.menu-item__header');
	const itemAllergens =document.querySelector('.menu-item__allergens')
	const itemPrice = document.querySelector('.menu-item__price')
	const itemImage = document.querySelector('.menu-item__image')
	const cartLengthDiv = document.querySelector('.header__cart-items')

	displayItemsInCart()

	if(addToCartButton){
		addToCartButton.addEventListener('click', handleAddToCartClick)
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

	function handleAddToCartClick(){
		let object = {
			dishName: itemName.innerText,
			dishAllergens: itemAllergens.innerText,
			dishPrice: itemPrice.innerText,
			dishImage: itemImage.src,
			dishQuantity: 1,
			dishIndex: index
		}
			if(JSON.parse(localStorage.getItem('cart'))){
				cart = JSON.parse(localStorage.getItem('cart'));
				
				let test = cart.some(item =>{
					return item.dishName === itemName.innerText 
					
				})

				if (test){
						let index = cart.findIndex(item =>{
							return item.dishName === itemName.innerText 
						})
						cart[index].dishQuantity = cart[index].dishQuantity +=1
						
						localStorage.setItem('cart', JSON.stringify(cart))
						
					}

					if(!test){
						index +=1
						object.dishIndex=index
						cart.push(object)
						//index = cart.length 

						localStorage.setItem('cart', JSON.stringify(cart))
						
					} 
				
				
			}else{
				index = 0
				object.dishIndex=index
				cart.push(object)
				console.log(object)
	
				localStorage.setItem('cart', JSON.stringify(cart))	
				
			}	
			displayItemsInCart()	
		}
	

}