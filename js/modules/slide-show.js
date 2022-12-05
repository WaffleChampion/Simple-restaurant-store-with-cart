import { menuItems } from "./menu-items.js";

export default function slideShow(){
	//Variables
	let currentIndex = 0;

	let slideShowImages = []

	//Queryselectors
	const slideShowImageContainer = document.querySelector('.slide-show__container')
	const previousButton = document.querySelector('.slide-show__previous-image');
	const nextButton = document.querySelector('.slide-show__next-image');


	render();
	//Eventlisteners
	if (previousButton && nextButton && slideShowImages){
		previousButton.addEventListener('click', handlePreviousButtonClick);
		nextButton.addEventListener('click', handleNextButtonClick);
		setInterval(handleNextButtonClick, 3000);
	}

	//Handelers
	function handleNextButtonClick(){
		increaseIndex();
		renderImage(slideShowImages, currentIndex);
	}

	function handlePreviousButtonClick(){
		reduceIndex();
		renderImage(slideShowImages, currentIndex);
	}

	//reduces image index
	function reduceIndex(){
		if (currentIndex=== 0){
			currentIndex = slideShowImages.length-1;
		}else{
			currentIndex -=1;
		}
	}

	//Increases image index
	function increaseIndex(){
		if (currentIndex === slideShowImages.length-1){
			currentIndex=0; 
		}else {
			currentIndex+=1;
		}
	}

	function renderImage(slideShowImage, currentIndex){
		for (let image of slideShowImage){
			image.classList.remove('slide-show__image--active');
		}
		slideShowImage[currentIndex].classList.add('slide-show__image--active');
	}

	function generateSlideShowImages(){
		if(slideShowImageContainer){
			menuItems.forEach((item, index)=> {
				const figureElement = document.createElement('figure');
				const imageElement = document.createElement('img');
	
				figureElement.setAttribute('class', 'slide-show__object');
				if (index === 0){
					imageElement.setAttribute('class', 'slide-show__image slide-show__image--active');
				}else {
					imageElement.setAttribute('class', 'slide-show__image');
				}
	
				imageElement.src = item.image;

				slideShowImages.push(imageElement);
	
				figureElement.append(imageElement);
				slideShowImageContainer.append(figureElement);
			})
		}
	}

	function render() {
		generateSlideShowImages()
	}

}