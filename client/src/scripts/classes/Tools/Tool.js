export class Tool{
    static id = 1
    constructor(name, type){
        this.id = Tool.id
        Tool.id++
        this.name = name
        this.type = type
        this.position = []
    }
    start(x,y){
        this.position = [[x,y]]
    }
    move(x,y){
        this.position.push([x,y])
    }
    end(x,y,ctx){
        this.position.push([x,y])
    }
}