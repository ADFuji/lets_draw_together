/*const BrushMenu = versions.bmenu()
const Canvas = versions.canvas()

const brushmenu = new BrushMenu(document.getElementById("menu"));
brushmenu.showMenu();
const canvas = new Canvas(document.getElementById("lets_draw"), brushmenu);
*/
class Brush{
    constructor(id){
        this.id = id
        this.color = 'black'
        this.size = 1
        this.position = []
    }
    setColor(color){
        this.color = color
    }
    setSize(size){
        this.size = size
    }
    draw(ctx){
        console.log('draw')
    }
    start(x,y){
        this.position = [[x,y]]
    }
    move(x,y){
        this.position.push([x,y])
    }
    end(x,y,ctx){
        this.position.push([x,y])
        this.position.forEach((pos) => {
            this.draw(ctx, pos[0], pos[1])
        })
    }  
}
class Regular extends Brush{
    constructor(id){
        super(id)
        this.type = 'regular'
    }
    draw(ctx,x,y){
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}
class Exponnential extends Brush{
    constructor(id){
        super(id)
        this.type = 'exponnential'
        this.i=1
    }
    draw(ctx,x,y){
        ctx.beginPath();
        ctx.arc(x, y, this.size*this.i, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        this.i=this.i>50?50:this.i+0.4
    }
    start(x,y){
        this.i=1
        //super.start(x,y)
    }
    end(x,y,ctx){
        this.i=1
        //super.end(x,y,ctx)
    }

}
class BrushsMenu{
    constructor(div){
        this.position = {
            x: 0,
            y: 0
        }
        this.brushs = [new Regular(1), new Exponnential(2)]
        this.current_brush = this.brushs[0]
        this.createMenu(div)
        this.fillMenu()
    }
    createMenu(div){
        this.div = document.createElement('div')
        this.div.style.position = 'absolute'
        this.div.style.top = '0px'
        this.div.style.left = '0px'
        this.div.style.width = '100px'
        this.div.style.height = '100px'
        this.div.style.backgroundColor = 'white'
        this.div.style.border = '1px solid black'
        this.div.style.display = 'none'
        div.appendChild(this.div)
        this.menu = this.div
    }
    fillMenu(){
        this.brushs.forEach(brush => {
            let brush_div = document.createElement('div')
            brush_div.id = brush.id
            brush_div.style.width = '100%'
            brush_div.style.height = '20px'
            brush_div.style.backgroundColor = brush.color
            brush_div.style.border = '1px solid black'
            brush_div.style.borderRadius = '5px'
            brush_div.style.cursor = 'pointer'
            brush_div.addEventListener('click', () => {
                this.current_brush = brush
                console.log(this.current_brush)
            })
            this.menu.appendChild(brush_div)
        })
    }
    showMenu(){
        this.menu.style.display = 'block'
    }
    hideMenu(){
        this.menu.style.display = 'none'
    }
    setPosition(x, y){
        this.position.x = x
        this.position.y = y
        this.menu.style.top = this.position.y + 'px'
        this.menu.style.left = this.position.x + 'px'
    }
    getCurrentBrush(){
        return this.current_brush
    }
}
class Canvas{
    constructor(canvas){
        this.down =false;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        this.brushmenu = new BrushsMenu(document.getElementById('menu'))
        this.brushmenu.showMenu()
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
        console.log(event)
        let rect = this.canvas.getBoundingClientRect();
        let x = event.changedTouches[0].clientX - rect.left;
        let y = event.changedTouches[0].clientY - rect.top;
        return {x, y};
    }
    setCurrentBrush(brush){
        this.currentBrush = brush;
    }
    //add event listeners to draw on the canvas with the current brush
    
    addListeners(){
        this.canvas.addEventListener("mousedown", (event) => {
            this.down = true;
            let position = this.getMousePosition(event);
            this.brushmenu.getCurrentBrush().start(position.x, position.y);
        });
        this.canvas.addEventListener("mousemove", (event) => {
            let position = this.getMousePosition(event);
            if(this.down){
                console.log(this.currentBrush)
            this.brushmenu.getCurrentBrush().draw(this.context, position.x, position.y);}
        });
        this.canvas.addEventListener("mouseup", (event) => {
            this.down = false;
            let position = this.getMousePosition(event);
            this.brushmenu.getCurrentBrush().end(position.x, position.y, this.context);
        });
        this.canvas.addEventListener("touchstart", (event) => {
            //let position = this.getTouchPosition(event);
            this.down = true;
            //console.log(event)
            //this.brushmenu.getCurrentBrush().start(position.x, position.y);
        });
        this.canvas.addEventListener("touchmove", (event) => {
            event.preventDefault();
            if(this.down){
                console.log(event)
                let position = this.getTouchPosition(event);
                this.brushmenu.getCurrentBrush().draw(this.context, position.x, position.y);
            }
        });
        this.canvas.addEventListener("touchend", (event) => {
            this.down = false;
            //let position = this.getTouchPosition(event);
            console.log(this.getTouchPosition(event))
            //this.brushmenu.getCurrentBrush().end(position.x, position.y, this.context);
        });
        //event listener to draw when this.down==true
     

    }

}

let canvas = new Canvas(document.getElementById('lets_draw'))
