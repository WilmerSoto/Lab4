let color = "#000000"

function setup(){
    const canvas = createCanvas(800,600)
    canvas.position(500, 50)
    canvas.parent("canvas-container")
    canvas.background(255)
    canvas.style('border', '2px solid black')

    let colorPicker = select("#colorpicker")
    if (colorPicker.changed(changeColor)){
        color = colorPicker.value()
    }
}

function mouseDragged(){
    stroke(color)
    strokeWeight(4)
    line(mouseX, mouseY, pmouseX, pmouseY)
}

function changeColor(){
    color = this.value()
}