let color = "#000000";
let socket;
let canvas;

function setup(){
    canvas = createCanvas(800, 600);
    centerCanvas();
    background(255);
    canvas.parent("canvas")
    canvas.style('border', '2px solid black');

    socket = io.connect("http://localhost:3000")

    socket.on('mouse', data => {
		stroke(data.color);
        strokeWeight(data.strokeWeight);
		line(data.x, data.y, data.px, data.py);
	});

    socket.on('clearCanvas', () => {
        clear();
        background(255);
    });

    const colorPicker = select("#colorpicker");
    const clearBtn = select("#clearbtn");
    const downloadBtn = select("#downloadbtn");

    colorPicker.changed(changeColor);
    clearBtn.mousePressed(() => {
        clear();
        background(255);
        socket.emit('clearCanvas');
        console.log("clearCanvas emmited");
	});

    downloadBtn.mousePressed(() =>{
        saveCanvas(canvas, "Mi canvas.jpg");
    });
}

function mouseDragged(){
    stroke(color);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
    sendMouse(mouseX, mouseY, pmouseX, pmouseY);
}

function windowResized() {
	centerCanvas()
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


