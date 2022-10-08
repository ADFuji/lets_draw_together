import {Brush} from "../Brush.js";
export class Regular extends Brush{
    constructor(){
        super()
        this.name = 'Regular'
        this.last=[0,0]
    }
    draw(ctx,x,y){
        ctx.beginPath();
        ctx.moveTo(this.last[0],this.last[1]);
        ctx.lineTo(x,y)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke()
        this.last=[x,y]
    }
    start(x,y){
        this.last=[x,y]
    }
    end(x,y,ctx){
        this.last=[x,y]
    }

}