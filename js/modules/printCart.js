export default function printCart(){
	console.log(JSON.parse(localStorage.getItem('cart')))
}