export default function slideShow(){
	let currentIndex = 0;

	const previousButton = document.querySelector('.slide-show__previous-image');
	const nextButton = document.querySelector('.slide-show__next-image');
	const slideShowImage = document.querySelectorAll('.slide-show__image');

	if(previousButton && nextButton){
		previousButton.addEventListener('click', handlePreviousButtonClick);
	nextButton.addEventListener('click', handleNextButtonClick);

	function handleNextButtonClick(){
		reduceIndex()
		renderImage();
	}

	function handlePreviousButtonClick(){
		increaseIndex()
		renderImage();
	}

	function reduceIndex(){
		if(currentIndex=== 0){
			currentIndex = slideShowImage.length-1;
		}else{
			currentIndex -=1;
		}
	}

	function increaseIndex(){
		if(currentIndex === slideShowImage.length-1){
			currentIndex=0; 
		}else{
			currentIndex+=1;
		}
	}

	function renderImage(){
		for(let image of slideShowImage){
			image.classList.remove('slide-show__image--active')
		}
		slideShowImage[currentIndex].classList.add('slide-show__image--active')
	}
	}
	

}