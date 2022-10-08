import {Brush} from "../Brush.js";
export class Regular extends Brush{
    constructor(){
        super("Regular")
        this.last=[0,0]
    }
    draw(ctx,x,y){
        super.draw(ctx)
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.lineCap = 'round';
        ctx.moveTo(this.last[0],this.last[1]);
        ctx.lineTo(x,y)
        ctx.fillStyle = this.color;
        //ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.miterLimit=1
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