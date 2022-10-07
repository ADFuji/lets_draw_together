import {Tool} from "../Tool"
export class Square{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColor = 'black';
        this.strokeColor = 'black';
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
    setFirstPoint(x, y){
        this.x = x;
        this.y = y;
    }
    setSize(x,y){
        this.size = Math.abs(x-this.x);
    }

}