//class to create a tool to move the view
import {Tool} from './Tool.js'
export class Move extends Tool{
    constructor(id){
        super("Move", "Tool")
        this.lastPosition = [0,0];
        
    }
    start(x,y){
        this.lastPosition = [x,y];
        document.querySelector('body').style.cursor = 'grab'
    }
    move(x,y,canvas){
        let dx = x - this.lastPosition[0];
        let dy = y - this.lastPosition[1];
        canvas.style.left = `${canvas.offsetLeft + dx}px`;
        canvas.style.top = `${canvas.offsetTop + dy}px`;
        this.lastPosition = [x,y];
        document.querySelector('body').style.cursor = 'grabbing'

    }
    end(x,y,ctx){
        document.querySelector('body').style.cursor = 'grab' 
    }
}