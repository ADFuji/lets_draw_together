import { BrushsMenu } from "../classes/Menu/BrushsMenu.js";
import { MTools } from "../classes/Menu/MTools.js";
export class Canvas{
    constructor(canvas, mtools, mcolorthickness){
        this.down =false;
        this.canvas = canvas;
        this.canvas.style.left = 0
        this.canvas.style.top = 0
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        this.mtools = mtools;
        this.mcolorthickness = mcolorthickness;
        this.addListeners()
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
    fillCanvas(color){
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fill();
    }
    //get mouse and touch input and position on the canvas
    getMousePosition(event){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return {x, y};
    }
    getTouchPosition(event){
        console.log(event)
        let rect = this.canvas.getBoundingClientRect();
        let x = event.changedTouches[0].clientX - rect.left;
        let y = event.changedTouches[0].clientY - rect.top;
        return {x, y};
    }
    setSelectedTool(tool){
        console.log(tool.type)
        this.selectedTool = tool;
    }
    //add event listeners to draw on the canvas with the current brush
    
    addListeners(){
        console.log(this.mtools)
        this.canvas.addEventListener('click', (event) => {
            let mousePosition = this.getMousePosition(event);
            if(this.mtools.getSelectedTool().name != "Exponnential"){
            this.mtools.getSelectedTool().draw(this.context, mousePosition.x, mousePosition.y);}
        });
        this.canvas.addEventListener("mousedown", (event) => {
            //if its not right click
            if(event.button != 2){
            this.down = true;
            let position = this.getMousePosition(event);
            this.mtools.getSelectedTool().start(position.x, position.y);}
        });
        this.canvas.addEventListener("mousemove", (event) => {
            let position = this.getMousePosition(event);
            if(this.down){
                console.log(this.mtools.getSelectedTool().type)
                if(this.mtools.getSelectedTool().type=="Tool"){
                    this.mtools.getSelectedTool().move(position.x, position.y, this.canvas);
                }
                else{
                    this.mtools.getSelectedTool().draw(this.context, position.x, position.y);
                }
        }
        });
        this.canvas.addEventListener("mouseup", (event) => {
            this.down = false;
            let position = this.getMousePosition(event);
            this.mtools.getSelectedTool().end(position.x, position.y, this.context);
        });
        this.canvas.addEventListener("touchstart", (event) => {
            this.down = true;
            let position = this.getMousePosition(event);
            this.brushmenu.getCurrentBrush().start(position.x, position.y);
        });
        this.canvas.addEventListener("touchmove", (event) => {
            event.preventDefault();
            let position = this.getMousePosition(event);
            if(this.down){
                console.log(this.currentBrush)
            if(this.brushmenu.getCurrentBrush().type=="Tool"){
                this.brushmenu.getCurrentBrush().move(position.x, position.y, this.canvas);
            }
            else{
                this.brushmenu.getCurrentBrush().draw(this.context, position.x, position.y);
            }
        }
        });
        this.canvas.addEventListener("touchend", (event) => {
            this.down = false;
            let position = this.getMousePosition(event);
            this.brushmenu.getCurrentBrush().end(position.x, position.y, this.context);
        });
        //display mcolorthickness menu when right clicking
        this.canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.mcolorthickness.showMenu(event.clientX, event.clientY);
        });
        //hide mcolorthickness menu when clicking out mcolorthickness menu
        document.addEventListener("click", (event) => {
            console.log(event.target)
            if(this.down || event.target != this.mcolorthickness.menu && event.target != this.mcolorthickness.color && event.target != this.mcolorthickness.thickness){
                this.mcolorthickness.hideMenu();
            }
        });
        /*
        //cancel draw when out of canvas
        document.addEventListener("mouseleave", (event) => {
            this.in = false;
            this.down = false;
        });
        //draw when in canvas
        document.addEventListener("mouseenter", (event) => {
            this.in = true;
        });
        
        //move the canvas with the mouse
        this.canvas.addEventListener("mousedown", (event) => {
            if(this.brushmenu.getCurrentBrush().name=="Move"){
            let position = this.getMousePosition(event);
            this.lastPosition = position;
            this.moving = true;}
        });
        this.canvas.addEventListener("mousemove", (event) => {
            if(this.moving){
                let position = this.getMousePosition(event);
                let dx = position.x - this.lastPosition.x;
                let dy = position.y - this.lastPosition.y;
                this.canvas.style.left = `${this.canvas.offsetLeft + dx}px`;
                this.canvas.style.top = `${this.canvas.offsetTop + dy}px`;
                console.log(this.canvas.style.left, this.canvas.offsetLeft)

                this.lastPosition = position;
            }
        });
        this.canvas.addEventListener("mouseup", (event) => {
            this.moving = false;
        });*/


    }
}