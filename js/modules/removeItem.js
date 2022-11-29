export default function removeItem(){

	const removeButton = document.querySelectorAll('.checkout-area__remove-button');

	if(removeButton){
		removeButton.forEach(element =>{
			element.addEventListener('click', handleRemoveButtonClick)
		})
	}

	function handleRemoveButtonClick(event){
		const cartItemDiv = document.querySelectorAll('.checkout-area__cart-item')
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		cartItemDiv.forEach(item => {
			if(item.dataset.index === event.currentTarget.dataset.index){
				item.remove()
				currentCart.splice(event.currentTarget.dataset.index, 1)
				localStorage.setItem('cart', JSON.stringify(currentCart))
			}
		})
	}
	
}