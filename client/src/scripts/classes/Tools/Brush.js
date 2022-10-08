import {Tool} from "./Tool.js"
export class Brush extends Tool{
    constructor(name){
        super(name, "Brush")
        this.color = 'black'
        this.size = 1
        this.position = []
    }
    setColor(color){
        this.color = color
    }
    setSize(size){
        this.size = size
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
    }
    start(x,y){
        this.position = [[x,y]]
    }
    move(x,y){
        this.position.push([x,y])
    }
    end(x,y,ctx){
        this.position.push([x,y])
        this.position.forEach((pos) => {
            this.draw(ctx, pos[0], pos[1])
        })
    }  
}