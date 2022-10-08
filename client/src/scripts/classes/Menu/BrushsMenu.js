import { Regular } from "../Tools/Brushs/Regular.js"
import { Exponnential } from "../Tools/Brushs/Exponnential.js"
import { Move } from "../Tools/Move.js"
export class BrushsMenu{
    constructor(div){
        this.position = {
            x: 0,
            y: 0
        }
        this.brushs = [new Regular(), new Exponnential(), new Move()]
        this.current_brush = this.brushs[0]
        this.last_current_brush=this.brushs[0]
        this.preCursor = document.querySelector('body').style.cursor
        this.createMenu(div)
        this.fillMenu()
    }
    createMenu(div){
        this.div = document.createElement('ul')
        this.div.setAttribute('id', 'brushs_menu')
        div.appendChild(this.div)
        this.menu = this.div
    }
    fillMenu(){
        this.brushs.forEach(brush => {
            let brush_div = document.createElement('li')
            let img = document.createElement('img')
            img.src = `./src/assets/icones/${brush.type=="Brush"?"brushs":"tools"}/${brush.name}.png`
            brush_div.id = brush.name
            brush_div.setAttribute('class', 'brush_button')
            brush_div.appendChild(img)
            brush_div.style.cursor = 'pointer'
            brush_div.addEventListener('click', (e) => {
                this.last_current_brush.div.setAttribute('class', 'brush_button')
                this.current_brush = brush
                brush_div.setAttribute('class', 'brush_button_selected')
                this.last_current_brush=brush
                console.log(brush.name, brush.type)
                document.querySelector('body').style.cursor = this.preCursor
            })
            brush.div=brush_div
            this.menu.appendChild(brush_div)
        })
    }
    showMenu(){
        this.menu.style.display = 'intial'
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
