import { Menu } from "./Menu.js";
import { Regular } from "../Tools/Brushs/Regular.js"
import { Exponnential } from "../Tools/Brushs/Exponnential.js"
import { Move } from "../Tools/Move.js"
export class MTools extends Menu {
    constructor(parent) {
        super(parent, 'MTools');
        this.tools = [new Regular(), new Exponnential(), new Move()];
        this.selectedTool = this.tools[0];
        this.selectedTool.element.className = 'brush_button_selected';
        this.menu.ul = document.createElement('ul');
        this.menu.ul.id = 'brushs_menu';
        this.menu.appendChild(this.menu.ul);
        this.tools.forEach(tool => {
            console.log(tool.element);
            tool.element.addEventListener('click', (e) => {
                console.log('click');
                this.selectedTool.element.classList.remove('brush_button_selected');
                this.selectedTool.element.classList.add('brush_button');
                this.selectedTool = tool;
                tool.element.className = 'brush_button_selected';
                document.querySelector('body').style.cursor = 'default';
            });
            this.menu.ul.appendChild(tool.element);
        })
        

    }
    getSelectedTool() {
        return this.selectedTool;
    }
    setSelectedTool(tool) {
        this.selectedTool = tool;
    }
    setColor(color) {
        this.tools.forEach(tool => {
            tool.color = color;
        });
    }
    setSize(size) {
        this.tools.forEach(tool => {
            tool.size = size;
        });
    }
}