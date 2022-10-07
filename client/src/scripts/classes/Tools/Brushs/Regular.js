import {Brush} from "../Brush.js";
export class Regular extends Brush{
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