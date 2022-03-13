function setup() {
	canvas = createCanvas(500, 500);
	canvas.parent('p5-canvas');

	background(200);
}

function draw() {
	noStroke();
	square(50, 50, 50);
}
