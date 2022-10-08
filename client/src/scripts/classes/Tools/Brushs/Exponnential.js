import {Brush} from "../Brush.js";
export class Exponnential extends Brush{
    constructor(){
        super()
        this.name = 'Exponnential'
    }
    draw(ctx,x,y){
        ctx.beginPath();
        ctx.arc(x, y, this.size*this.i, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        this.i=this.i>100?100:this.i+.4
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