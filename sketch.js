var board = [];
var canvas = null;
var frames = 0;

function setup() {
	canvas = createCanvas(500, 500);
	canvas.parent('p5-canvas');

	board = randomizeArray(50, 50, 0.2);

	background(200);
}

function draw() {
	// set remainder to however many frames you want to wait for before redraw.
	if (frames % 5 == 0) {
		// Generate new board.
		board = applyRules(board);
		console.log(board);

		// Clear screen.
		background(200);

		// Draw squares based off board array values.
		board.forEach((row, x) => {
			row.forEach((box, y) => {
				box ? square(x * 10, y * 10, 10) : false;
			});
		});
	}

	frames++;
}

// Functions requires how many x and y dimensions to make the array, and what
// percentage you wish for the squares to be generated at in decimal form.
function randomizeArray(x, y, randomFactor) {
	let boardArr = [];
	for (let i = 0; i < x; i++) {
		boardArr.push([]);
		for (let j = 0; j < y; j++) {
			if (Math.random() <= randomFactor) {
				boardArr[i].push(1);
			} else {
				boardArr[i].push(0);
			}
		}
	}
	return boardArr;
}

function applyRules(arr) {
	let newBoardArr = [];

	arr.forEach((row, x) => {
		newBoardArr.push([]);
		row.forEach((box, y) => {
			let liveNegibourCount = getNegibours(arr, x, y);
			let cell = box;

			if (cell == 1) {
				// live cells
				liveNegibourCount < 2 ? (cell = 0) : false; // underpopulation
				liveNegibourCount == 2 || liveNegibourCount == 3 ? (cell = 1) : false; // generation
				liveNegibourCount > 3 ? (cell = 0) : false; // overpopulation
			} else {
				// dead cells
				liveNegibourCount == 3 ? (cell = 1) : false;
			}

			newBoardArr[x].push(cell);
		});
	});

	return newBoardArr;
}

function getNegibours(arr, x, y) {
	let liveNegibours = 0;

	if (arr[x - 1] != undefined) {
		arr[x - 1][y - 1] == 1 ? liveNegibours++ : false;
		arr[x - 1][y] == 1 ? liveNegibours++ : false;
		arr[x - 1][y + 1] == 1 ? liveNegibours++ : false;
	}

	if (arr[x + 1] != undefined) {
		arr[x + 1][y - 1] == 1 ? liveNegibours++ : false;
		arr[x + 1][y] == 1 ? liveNegibours++ : false;
		arr[x + 1][y + 1] == 1 ? liveNegibours++ : false;
	}

	arr[x][y - 1] == 1 ? liveNegibours++ : false;
	arr[x][y + 1] == 1 ? liveNegibours++ : false;

	return liveNegibours;
}
