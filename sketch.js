var board = [];
var canvas = null;
var frames = 0;

function setup() {
	canvas = createCanvas(500, 500);
	canvas.parent('p5-canvas');

	board = randomizeArray(50, 50, 0.01);

	background(200);
}

function draw() {
	if (frames % 20 == 0) {
		board = randomizeArray(50, 50, 0.01);

		background(200);

		board.forEach((row, x) => {
			row.forEach((box, y) => {
				box ? square(x * 10, y * 10, 10) : false;
			});
		});
	}

	frames++;
}

function randomizeArray(x, y, randomFactor) {
	let board = [];
	for (let i = 0; i < x; i++) {
		board.push([]);
		for (let j = 0; j < y; j++) {
			if (Math.random() <= randomFactor) {
				board[i].push(1);
			} else {
				board[i].push(0);
			}
		}
	}
	return board;
}
