export default function printDishPage(){
	const pageOutput = document.querySelector('.menu-item')
	const header = document.querySelector('.menu-item__header')
	const image = document.querySelector('.menu-item__image')
	const description = document.querySelector('.menu-item__description')
	const allergens = document.querySelector('.menu-item__allergens')
	const price = document.querySelector('.menu-item__price')

	if(pageOutput){
		generateCurrentPage()
	}

	function generateCurrentPage(){
		let currentPage = localStorage.getItem('currentPage')

		switch (currentPage) {
			case "margherita":
				header.firstElementChild.innerText = 'Pizza Margherita'
				image.src = '/assets/img/pizzamargheritatop.jpg'
				description.innerText = 'plain pizza with cheese and tomato'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 200'
				break;
			case "hawaii":
				header.firstElementChild.innerText = 'Pizza Hawaii'
				image.src = '/assets/img/pizza_hawaiana.jpg'
				description.innerText = 'Pizza with pineapple'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 270'
				break;
			case "chicken":
				header.firstElementChild.innerText = 'Pizza with Chicken'
				image.src = '/assets/img/Pizza-med-kylling-tomat-ruccola.jpg'
				description.innerText = 'Pizza with chicken and tomato'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 300'
				break;
			case "meatballs":
				header.firstElementChild.innerText = 'Pizza with Meatballs'
				image.src = '/assets/img/meatballs.jpg'
				description.innerText = 'Pizza with meatballs, onion and peperoni'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 250'
				break;
			case "peperoni":
				header.firstElementChild.innerText = 'Pizza with Peperoni'
				image.src = '/assets/img/Gluten-Free-Pizza-3.2-480x360.jpg'
				description.innerText = 'Pizza with cheese and peperoni'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 250'
				break;
			case "vegetarian":
				header.firstElementChild.innerText = 'Pizza Vegetarian'
				image.src = '/assets/img/pesto-pizza-93f270b.jpg'
				description.innerText = 'Vegetarian pizza with and asortment of stuff'
				allergens.innerText = 'Allergens: egg, wheat'
				price.innerText = 'Price: 290'
				break;
		
			default:
				break;
		}
	}

	function generateMargherita(){
		const header = document.querySelector('.menu-item__header')
		const image = document.querySelector('.menu-item__image')
		const description = document.querySelector('.menu-item__description')
		const allergens = document.querySelector('.menu-item__allergens')
		const price = document.querySelector('.menu-item__price')

		header.firstElementChild.innerText = 'Pizza Margherita'
		image.src = '/assets/img/pizzamargheritatop.jpg'
		description.innerText = 'plain pizza with cheese and tomato'
		allergens.innerText = 'Allergens: egg, wheat'
		price.innerText = 'Price: 200'
	}

}