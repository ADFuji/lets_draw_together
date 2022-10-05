class Brush{
    constructor(id){
        this.id = id
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
        console.log('draw')
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
module.exports = Brush