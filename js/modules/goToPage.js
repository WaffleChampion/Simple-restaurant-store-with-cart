export default function goToPage(){
	const menuItemCards = document.querySelectorAll('.menu-cards__card');
	const homeIcon = document.querySelector('.header__image');
	const cartIcon = document.querySelector('.header__cart-icon');

	menuItemCards.forEach(item =>{
		item.addEventListener('click', handleMenuItemCardClick);
	});
	homeIcon.addEventListener('click', handleGoToHomeClick);
	cartIcon.addEventListener('click', handleGoToCartClick);

	function handleMenuItemCardClick(event){
		let clickedCard = event.currentTarget.dataset.menu;
		window.location.href = "/html-pages/menu-item.html"
		localStorage.setItem('currentPage', clickedCard)
	}

	function handleGoToHomeClick(){
		window.location.href = "/";
	}

	function handleGoToCartClick(){
		window.location.href = "/html-pages/checkout.html"
	}
}