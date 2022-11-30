import * as removeItem from "./removeItem.js";
import printCartList from "./printCartList.js";

export default function printCart(){

	let cartSum=0;
	printCartList(cartSum)
	const clearCartButton = document.querySelector('.checkout-area__clear-cart');

	const purchaseButton = document.querySelector('.checkout-area__purchase');
	const checkoutAreaTotal = document.querySelector('.checkout-area__total')

	calculateSum()
	if(clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick);
	}
	if(purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick);
	}
	const quantityInput = document.querySelectorAll('.checkout-area__item-quantity')
	const prices = document.querySelectorAll('.checkout-area__item-price')
	const decreaseQuantityButton = document.querySelectorAll('.checkout-area__decrease-button')
	const increaseQuantityButton = document.querySelectorAll('.checkout-area__increase-button')
	if(quantityInput){
		quantityInput.forEach(item =>{
			item.addEventListener('change', handleQuantityInputChange)
		})
	}
	if(decreaseQuantityButton, increaseQuantityButton){
		
		decreaseQuantityButton.forEach(Element =>{
			Element.addEventListener('click', handleDecreaseQuantityButtonClick)
		})
		
		increaseQuantityButton.forEach(Element =>{
			Element.addEventListener('click', handleIncreaseQuantityButtonClick)
		})
	}

	function calculateSum(){
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		if(currentCart){
			currentCart.forEach(cartItem =>{
				cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity)
			})
		}
	}

	function handleCartButtonClick(){
		localStorage.clear()
		window.location.href = "/";
	}

	function handleQuantityInputChange(event){
		cartSum = 0;
		for(let index=0; index <quantityInput.length; index +=1){
			cartSum += parseInt(quantityInput[index].value)*parseInt(prices[index].innerText)
			if(parseInt(event.currentTarget.value) === 0){
				removeItem.handleRemoveButtonClick(event)
			}
		}
		checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
	}

	function handleDecreaseQuantityButtonClick(event){
		if(quantityInput[event.currentTarget.dataset.index].value > 0){
			quantityInput[event.currentTarget.dataset.index].value -= 1
		}
		if(Number(quantityInput[event.currentTarget.dataset.index].value) === 0){
			removeItem.handleRemoveButtonClick(event)
		}
		handleQuantityInputChange(event)
	}

	function handleIncreaseQuantityButtonClick(event){
		let quantityInputNumber = Number(quantityInput[event.currentTarget.dataset.index].value)
		quantityInputNumber++
		quantityInput[event.currentTarget.dataset.index].value = quantityInputNumber
		handleQuantityInputChange(event)
	}
}