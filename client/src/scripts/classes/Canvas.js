class Canvas{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        this.currentBrush = null;
    }
    constructor(canvas, brush){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        this.currentBrush = brush;
        this.addListeners();
    }
    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawImage(image, x, y, width, height){
        this.context.drawImage(image, x, y, width, height);
    }
    drawText(text, x, y, color, font){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, x, y);
    }
    drawRect(x, y, width, height, color){
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
    drawCircle(x, y, radius, color){
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }
    drawLine(x1, y1, x2, y2, color){
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = color;
        this.context.stroke();
    }
    drawBrush(brush){
        brush.draw(this.context);
    }
    setPixel(x, y, color){
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
    }
    getPixel(x, y){
        return this.context.getImageData(x, y, 1, 1).data;
    }
    getPixelColor(x, y){
        let data = this.getPixel(x, y);
        return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    }
    getPixelAlpha(x, y){
        let data = this.getPixel(x, y);
        return data[3];
    }
    getAllPixels(){
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    }
    setAllPixels(data){
        this.context.putImageData(data, 0, 0);
    }
    //get mouse and touch input and position on the canvas
    getMousePosition(event){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return {x, y};
    }
    getTouchPosition(event){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.touches[0].clientX - rect.left;
        let y = event.touches[0].clientY - rect.top;
        return {x, y};
    }
    setCurrentBrush(brush){
        this.currentBrush = brush;
    }
    //add event listeners to draw on the canvas with the current brush
    addListeners(){
        this.canvas.addEventListener("mousedown", (event) => {
            let position = this.getMousePosition(event);
            this.currentBrush.start(position.x, position.y);
        });
        this.canvas.addEventListener("mousemove", (event) => {
            let position = this.getMousePosition(event);
            this.currentBrush.move(position.x, position.y);
        });
        this.canvas.addEventListener("mouseup", (event) => {
            let position = this.getMousePosition(event);
            this.currentBrush.end(position.x, position.y, this.context);
        });
        this.canvas.addEventListener("touchstart", (event) => {
            let position = this.getTouchPosition(event);
            this.currentBrush.start(position.x, position.y);
        });
        this.canvas.addEventListener("touchmove", (event) => {
            let position = this.getTouchPosition(event);
            this.currentBrush.move(position.x, position.y);
        });
        this.canvas.addEventListener("touchend", (event) => {
            let position = this.getTouchPosition(event);
            this.currentBrush.end(position.x, position.y, this.context);
        });
    }

}
module.exports = {Canvas};