export class Tool{
    static id = 1
    constructor(name, type){
        this.id = Tool.id
        Tool.id++
        this.name = name
        this.type = type
        this.position = []
        this.element = document.createElement('li')
        this.element.classList.add('brush_button')
        this.element.img = document.createElement('img')
        this.element.img.src = `./src/assets/icones/${this.type.toLowerCase()}s/${this.name}.png`
        this.element.appendChild(this.element.img)
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
    getName()
    {
        return this.name
    }
    getType()
    {
        return this.type
    }
    getPosition(){
        return this.position
    }
}