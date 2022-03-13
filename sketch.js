var gameBoard = null;
var frames = 0;
var canvasWidth = 500;
var canvasHeight = 500;
var blockSize = 10;
var speed = 0.1 * 60; // Draw runs at 60 frames / second

function setup() {
	let canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('p5-canvas');

	gameBoard = new GameBoard(
		canvasWidth / blockSize,
		canvasHeight / blockSize,
		0.2
	);

	background(200);
}

function draw() {
	runEvery(frames, speed, () => {
		// Generate new board.
		let updatedBoard = gameBoard.nextFrame();

		// Clear screen.
		background(200);

		// Draw squares based off board array values.
		updatedBoard.forEach((row, x) => {
			row.forEach((box, y) => {
				noStroke();
				fill(color(65));
				box ? square(x * blockSize, y * blockSize, blockSize) : false;
			});
		});
	});

	frames++;
}

// Function to run callback after x frames
function runEvery(currentFrames, refreshEvery, cb) {
	currentFrames % refreshEvery == 0 ? cb() : false;
}

class GameBoard {
	constructor(width, height, randomFactor) {
		this.width = width;
		this.height = height;
		this.randomFactor = randomFactor;
		this.board = [];

		// Generate array for board
		for (let i = 0; i < this.width; i++) {
			this.board.push([]);
			for (let j = 0; j < this.height; j++) {
				this.board[i].push(null);
			}
		}

		this.randomize(randomFactor);
	}

	randomize(randomFactor) {
		this.board.forEach((row, x) => {
			row.forEach((box, y) => {
				Math.random() <= randomFactor
					? (this.board[x][y] = 1)
					: (this.board[x][y] = 0);
			});
		});
	}

	nextFrame() {
		let newBoardArr = [];

		this.board.forEach((row, x) => {
			newBoardArr.push([]);
			row.forEach((box, y) => {
				let liveNeighborCount = this.getLiveNeighborCount(x, y);
				let cell = box;

				if (cell == 1) {
					// live cells
					liveNeighborCount < 2 ? (cell = 0) : false; // underpopulation
					liveNeighborCount == 2 || liveNeighborCount == 3 ? (cell = 1) : false; // generation
					liveNeighborCount > 3 ? (cell = 0) : false; // overpopulation
				} else {
					// dead cells
					liveNeighborCount == 3 ? (cell = 1) : false;
				}

				newBoardArr[x].push(cell);
			});
		});

		this.board = newBoardArr;
		return newBoardArr;
	}

	getLiveNeighborCount(x, y) {
		let liveNeighborCount = 0;

		if (this.board[x - 1]) {
			this.board[x - 1][y - 1] == 1 ? liveNeighborCount++ : false;
			this.board[x - 1][y] == 1 ? liveNeighborCount++ : false;
			this.board[x - 1][y + 1] == 1 ? liveNeighborCount++ : false;
		}

		if (this.board[x + 1]) {
			this.board[x + 1][y - 1] == 1 ? liveNeighborCount++ : false;
			this.board[x + 1][y] == 1 ? liveNeighborCount++ : false;
			this.board[x + 1][y + 1] == 1 ? liveNeighborCount++ : false;
		}

		this.board[x][y - 1] == 1 ? liveNeighborCount++ : false;
		this.board[x][y + 1] == 1 ? liveNeighborCount++ : false;

		return liveNeighborCount;
	}
}
