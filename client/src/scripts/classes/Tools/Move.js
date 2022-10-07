//class to create a tool to move the view
import {Tool} from './Tool.js'
class Move extends Tool{
    constructor(id){
        super(id, "Move", "Tool")
    }
    end(x,y){
        super.end(x,y)
        let dx = this.position[0][0]-this.position[1][0]
        let dy = this.position[0][1]-this.position[1][1]
        super.position = []
        return [dx,dy]
    }
}