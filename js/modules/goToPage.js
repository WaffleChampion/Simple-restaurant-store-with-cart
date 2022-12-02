export default function goToPage(){
	//Queryselectors
	const menuItemCardsButton  = document.querySelectorAll('.menu-cards__card');
	const homeIcon = document.querySelector('.header__image');
	const cartIcon = document.querySelector('.header__cart-icon');

	//Eventlisteners
	menuItemCardsButton.forEach(item =>{
		item.addEventListener('click', handleMenuItemCardClick);
	});
	homeIcon.addEventListener('click', handleGoToHomeClick);
	cartIcon.addEventListener('click', handleGoToCartClick);

	//Handlers
	function handleMenuItemCardClick(event){
		navigateToClickedItemPage(event);
	}

	function handleGoToHomeClick(){
		navigateToIndex();
	}

	function handleGoToCartClick(){
		navigateToCheckoutPage();
	}

	//Navigates to the clicked cards items page
	function navigateToClickedItemPage(event){
		console.log(window.location);
		let clickedCard = event.currentTarget.dataset.index;
		window.location.href = "/html-pages/menu-item.html";
		localStorage.setItem('currentPage', clickedCard);
	}

	//Navigates to index
	function navigateToIndex(){
		window.location.href = "/";
	}

	//Navigates to checkout
	function navigateToCheckoutPage(){
		window.location.href = "/html-pages/checkout.html";
	}
}