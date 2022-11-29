export function removeItem(passedEvent){
	let passedData = passedEvent


	const removeButton = document.querySelectorAll('.checkout-area__remove-button');


	if(removeButton){
		removeButton.forEach(element =>{
			element.addEventListener('click', handleRemoveButtonClick)
		})
	}
	if(passedData){
		handleRemoveButtonClick(passedData)
	}
}

export function handleRemoveButtonClick(event){
		const checkoutAreaTotal = document.querySelector('.checkout-area__total')
	let cartSum=0;
	const cartItemDiv = document.querySelectorAll('.checkout-area__cart-item')
	let currentCart = JSON.parse(localStorage.getItem('cart'));
	
	cartItemDiv.forEach(item => {
		if(item.dataset.index === event.currentTarget.dataset.index){
			item.remove()
			currentCart.splice(event.currentTarget.dataset.index, 1)
			localStorage.setItem('cart', JSON.stringify(currentCart))
			currentCart.forEach(cartItem =>{
				cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity)
			})
			
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
		}else if(item.dataset.index === event.currentTarget.parentElement.dataset.index){
			item.remove()
			currentCart.splice(event.currentTarget.parentElement.dataset.index, 1)
			localStorage.setItem('cart', JSON.stringify(currentCart))
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
		}
	})
}