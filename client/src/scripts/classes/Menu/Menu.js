//class to make menu
export class Menu {
    constructor(parent, name) {
        this.parent = parent;
        this.menu = document.createElement('div');
        this.menu.classList.add(name);
        //this.menu.style.display = 'none';
        this.parent.appendChild(this.menu);
    }
    showMenu(x,y) {
        //this.menu.style.display = 'fixed';
    }
    hideMenu() {
        //this.menu.style.display = 'none';
    }
    addElement(element) {
        this.menu.appendChild(element);
    }
    removeElement(element) {
        this.menu.removeChild(element);
    }
}