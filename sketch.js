var gameBoard = null;
var frames = 0;
var canvasWidth = 500;
var canvasHeight = 500;
var blockSize = 10;
var speed = 0.1 * 60; // Draw runs at 60 frames / second

var pause = false;

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
		let updatedBoard = gameBoard.board;
		!pause ? (updatedBoard = gameBoard.nextFrame()) : false;

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

function mouseClicked(event) {
	console.log();
	// Check if mouse was clicked on canvas before running function
	if (mouseX <= canvasWidth && mouseY <= canvasHeight) {
		gameBoard.setCellState(
			Math.ceil(mouseX / 10) - 1,
			Math.ceil(mouseY / 10) - 1,
			!event.altKey
		);
	}
}

function play_pause_button() {
	pause = !pause;
	pause
		? (document.querySelector('#play_pause_button').innerHTML = 'Play')
		: (document.querySelector('#play_pause_button').innerHTML = 'Pause');
}

function randomize_button() {
	gameBoard.randomize();
}

function clear_button() {
	gameBoard.clearBoard();
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

	randomize(randomFactor = this.randomFactor) {
		this.board.forEach((row, x) => {
			row.forEach((box, y) => {
				Math.random() <= randomFactor
					? (this.board[x][y] = true)
					: (this.board[x][y] = false);
			});
		});
	}

	nextFrame() {
		let nextFrameBoard = [];

		this.board.forEach((row, x) => {
			nextFrameBoard.push([]);
			row.forEach((val, y) => {
				let liveNeighborCount = this.getLiveNeighborCount(x, y);

				if (val) {
					// live cells
					liveNeighborCount < 2 || liveNeighborCount > 3 ? (val = !val) : false;
				} else {
					// dead cells
					liveNeighborCount == 3 ? (val = !val) : false;
				}

				nextFrameBoard[x].push(val);
			});
		});

		this.board = nextFrameBoard;
		return this.board;
	}

	getLiveNeighborCount(x, y) {
		let liveNeighborCount = 0;

		if (this.board[x - 1]) {
			this.board[x - 1][y - 1] == true ? liveNeighborCount++ : false;
			this.board[x - 1][y] == true ? liveNeighborCount++ : false;
			this.board[x - 1][y + 1] == true ? liveNeighborCount++ : false;
		}

		if (this.board[x + 1]) {
			this.board[x + 1][y - 1] == true ? liveNeighborCount++ : false;
			this.board[x + 1][y] == true ? liveNeighborCount++ : false;
			this.board[x + 1][y + 1] == true ? liveNeighborCount++ : false;
		}

		this.board[x][y - 1] == true ? liveNeighborCount++ : false;
		this.board[x][y + 1] == true ? liveNeighborCount++ : false;

		return liveNeighborCount;
	}

	setCellState(x, y, state = true) {
		this.board[x][y] = state;
	}

	clearBoard() {
		this.board = [];
		for (let i = 0; i < this.width; i++) {
			this.board.push([]);
			for (let j = 0; j < this.height; j++) {
				this.board[i].push(0);
			}
		}
		return this.board;
	}
}
