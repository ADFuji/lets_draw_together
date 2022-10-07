class Tool{
    constructor(id, name, type){
        this.id = id
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
export default Tool