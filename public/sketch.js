let color = "#000000";
let socket;
let canvas;

function setup(){
    const canvas = createCanvas(800, 600);
    canvas.position(500, 50);
    canvas.parent("canvas-container");
    background(255);
    canvas.style('border', '2px solid black');

    socket = io.connect("http://localhost:3000")

    socket.on('mouse', data => {
		stroke(data.color);
        strokeWeight(data.strokeWeight);
		line(data.x, data.y, data.px, data.py);
	});

    let colorPicker = select("#colorpicker");
    colorPicker.changed(changeColor);
}

function mouseDragged(){
    stroke(color);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
    sendMouse(mouseX, mouseY, pmouseX, pmouseY);
}

function windowResized() {
	centerCanvas()
	canvas.resizeCanvas(windowWidth / 2, windowHeight / 2, false)
}

function sendMouse(x, y, pX, pY){
    const data = {
        x: x,
        y: y,
        px: pX,
        py: pY,
        color: color,
        strokeWeight: 4
    };
    socket.emit("mouse", data);
}

function centerCanvas() {
	const x = (windowWidth - width) / 2;
	const y = (windowHeight - height) / 2;
	canvas.position(x, y);
};

function changeColor(){
    color = this.value();
}