import Brush from './Brush.js'
class Regular extends Brush{
    constructor(){
        super(id)
        this.type = 'regular'
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}
module.exports = Regular