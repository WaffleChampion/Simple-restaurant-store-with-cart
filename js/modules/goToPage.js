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

		 switch (clickedCard) {
			case "margherita":
				window.location.href = "/html-pages/menuMargherita.html"
				break;
			case "hawaii":
				window.location.href = "/html-pages/menuHawaiian.html"
				break;
			case "chicken":
				window.location.href = "/html-pages/menuChicken.html"
				break;
			case "meatballs":
				window.location.href = "/html-pages/menuMeatballs.html"
				break;
			case "peperoni":
				window.location.href = "/html-pages/menuPeperoni.html"
				break;
			case "vegetarian":
				window.location.href = "/html-pages/menuVegetarian.html"
				break;
		
			default:
				break;
		}
	}

	function handleGoToHomeClick(){
		window.location.href = "/";
	}

	function handleGoToCartClick(){
		window.location.href = "/html-pages/checkout.html"
	}
}