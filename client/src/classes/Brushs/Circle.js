class Circle{
    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColor = color;
        this.strokeColor = color;

    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
    setFirstPoint(x, y){
        this.x = x;
        this.y = y;
    }
    setSecondPoint(x, y){
        this.size = Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2));
    }

}
module.exports = Circle