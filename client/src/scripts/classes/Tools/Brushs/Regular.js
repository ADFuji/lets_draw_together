import {Brush} from "../Brush.js";
export class Regular extends Brush{
    constructor(){
        super("Regular")
        this.last=[0,0]
    }
    draw(ctx,x,y){
        //super.draw(ctx)
        ctx.beginPath();
        ctx.moveTo(x,y)
        ctx.lineJoin = "round";
        ctx.lineCap = 'round';
        ctx.moveTo(this.last[0],this.last[1]);
        ctx.lineTo(x,y)
        ctx.fillStyle = this.color;
        //ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.miterLimit=1
        ctx.stroke()
        ctx.closePath();
        this.last=[x,y]
        super.move(x,y)
    }
    start(x,y){
        this.last=[x,y]
        super.start(x,y)
    }
    end(x,y,ctx){
        super.move('end','end')
        this.last.clear()
        super.position.clear()
        console.log(super.position)
        super.end(x,y,ctx)
    }
    drawAll(ctx){
        this.position.forEach((pos) => {
            this.draw(ctx, pos[0], pos[1])
        })
    }

}