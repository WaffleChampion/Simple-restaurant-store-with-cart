import { renderImage } from "./render.js";

export default function slideShow(){
	//Variables
	let currentIndex = 0;

	//Queryselectors
	const previousButton = document.querySelector('.slide-show__previous-image');
	const nextButton = document.querySelector('.slide-show__next-image');
	const slideShowImage = document.querySelectorAll('.slide-show__image');

	//Eventlisteners
	if (previousButton && nextButton && slideShowImage){
		previousButton.addEventListener('click', handlePreviousButtonClick);
		nextButton.addEventListener('click', handleNextButtonClick);
		setInterval(handleNextButtonClick, 3000);
	}

	//Handelers
	function handleNextButtonClick(){
		increaseIndex();
		renderImage(slideShowImage, currentIndex);
	}

	function handlePreviousButtonClick(){
		reduceIndex();
		renderImage(slideShowImage, currentIndex);
	}

	//reduces image index
	function reduceIndex(){
		if (currentIndex=== 0){
			currentIndex = slideShowImage.length-1;
		}else{
			currentIndex -=1;
		}
	}

	//Increases image index
	function increaseIndex(){
		if (currentIndex === slideShowImage.length-1){
			currentIndex=0; 
		}else {
			currentIndex+=1;
		}
	}

}