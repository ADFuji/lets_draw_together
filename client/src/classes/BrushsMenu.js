import Regular from './Brushs/Regular.js'
import Exponnential from './Brushs/Exponnential.js'
import Square from './Brushs/Square.js'
import Circle from './Brushs/Circle.js'
class BrushsMenu{
    constructor(div){
        this.position = {
            x: 0,
            y: 0
        }
        this.brushs = [new Regular(1), new Exponnential(2), new Square(3), new Circle(4)]
        this.current_brush = this.brushs[0]
        this.createMenu(div)
        this.fillMenu()
    }
    createMenu(div){
        this.div = document.createElement('div')
        this.div.style.position = 'absolute'
        this.div.style.top = '0px'
        this.div.style.left = '0px'
        this.div.style.width = '100px'
        this.div.style.height = '100px'
        this.div.style.backgroundColor = 'white'
        this.div.style.border = '1px solid black'
        this.div.style.display = 'none'
        div.appendChild(this.div)
        this.menu = this.div
    }
    fillMenu(){
        this.brushs.forEach(brush => {
            let brush_div = document.createElement('div')
            brush_div.id = brush.id
            brush_div.style.width = '100%'
            brush_div.style.height = '20px'
            brush_div.style.backgroundColor = brush.color
            brush_div.style.border = '1px solid black'
            brush_div.style.borderRadius = '5px'
            brush_div.style.cursor = 'pointer'
            brush_div.addEventListener('click', () => {
                this.current_brush = brush.id
            })
            this.menu.appendChild(brush_div)
        })
    }
    showMenu(){
        this.menu.style.display = 'block'
    }
    hideMenu(){
        this.menu.style.display = 'none'
    }
    setPosition(x, y){
        this.position.x = x
        this.position.y = y
        this.menu.style.top = this.position.y + 'px'
        this.menu.style.left = this.position.x + 'px'
    }
    getCurrentBrush(){
        return this.current_brush
    }
}
module.exports = BrushsMenu