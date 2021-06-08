//constants and variables

let inputdir = {
	x: 0,
	y: 0
};
const foodsound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const movingSound = new Audio('move.mp3');

let lastPaintTime = 0;
let snakeArr = [
	{x: 14, y: 15}
];
let food = {
	x: 6,
	y: 5
};
let score = 0;
let speed= 10;
//functions


//here main becomes game loop
function main(ctime) {
	window.requestAnimationFrame(main);
	
	if((ctime - lastPaintTime)/1000 < 1/speed){
		return;
	}
	lastPaintTime = ctime;
	gameEngine();

}

function Collide(snake){
	for(let i =1; i< snakeArr.length; i++){
		//if bump in itself
		if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
			return true;
		}
		//if bump in wall
		if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y>=20 || snake[0].y <=0){
			return true;
		}
	}
}

function gameEngine() {
	//part 1: updating snake array and food

	if(Collide(snakeArr)){
		gameOver.play();
		inputdir = {x: 0, y: 0};
		alert(`Game Over! Hit Enter to restart`);
		snakeArr=[{x: 13, y:15}];
		score = 0;
	}
	//if snake eats food, increment the score and regenerate food
	if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
		foodsound.play();
		score+= 1;
		scoreboard.innerHTML= "Score: " +score;
		snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y})
		let a= 2;
		let b= 16;
		food = {x: Math.round(a+ (b-a)* Math.random()) , y: Math.round(a+ (b-a)* Math.random())}
	}

	//moving the snake

	for(let i= snakeArr.length-2; i>= 0; i--){
		snakeArr[i+1] = {...snakeArr[i]};
	}

	snakeArr[0].x += inputdir.x;
	snakeArr[0].y += inputdir.y;

	//part 2: display the snake array and food

	// Display the snake
	board.innerHTML = "";
	snakeArr.forEach((e, index) => {
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;

		if (index === 0) {
			snakeElement.classList.add('snakehead');
		} else {
			snakeElement.classList.add('snake');
			
		}
	
		board.appendChild(snakeElement);
	});
	
	// Display the food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	board.appendChild(foodElement);

}


//main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
	inputdir = {x:0 , y:1} // start the game
	movingSound.play();
	switch (e.key){
		case "ArrowUp":
			console.log("ArrowUp");
			inputdir.x = 0;
			inputdir.y = -1;
			break;
		case "ArrowDown":
			console.log("ArrowDown");
			inputdir.x = 0;
			inputdir.y = 1;
			break;
		case "ArrowLeft":
			console.log("ArrowLeft");
			inputdir.x = -1;
			inputdir.y = 0;
			break;
		case "ArrowRight":
			console.log("ArrowRight");
			inputdir.x = 1;
			inputdir.y = 0;
			break;
		default:
			break;
	}
});