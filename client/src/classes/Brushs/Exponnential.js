import Brush from "./Brush";
class Exponnential extends Brush{
    constructor(id){
        super(id)
        this.type = 'exponnential'
        this.i=1
    }
    draw(ctx,x,y){
        ctx.beginPath();
        ctx.arc(x, y, this.size*this.i, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.i=this.i>20?20:this.i+1
    }
}
module.exports = Exponnential