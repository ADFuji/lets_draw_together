import { Menu } from "./Menu.js";
export class MColorThickness extends Menu {
    constructor(parent, mtools) {
        super(parent);
        this.mtools = mtools;
        this.menu.classList.add('colorThickness');
        this.menu.style.display = 'none';
        this.parent.appendChild(this.menu);
        this.color = document.createElement('input');
        this.color.type = 'color';
        this.color.value = '#000000';
        this.color.classList.add('color');
        this.thickness = document.createElement('input');
        this.thickness.type = 'range';
        this.thickness.min = '1';
        this.thickness.max = '100';
        this.thickness.value = '10';
        this.thickness.classList.add('thickness');
        this.addElement(this.color);
        this.addElement(this.thickness);
        this.mtools.setSize(this.thickness.value);
        this.mtools.setColor(this.color.value);
        this.color.addEventListener('change', (e) => {
            this.mtools.setColor(this.color.value);
        });
        this.thickness.addEventListener('change', (e) => {
            this.mtools.setSize(this.thickness.value);
        });
    }
    getColor() {
        return this.color.value;
    }
    getThickness() {
        return this.thickness.value;
    }
    setColor(color) {
        this.color.value = color;
    }
    setThickness(thickness) {
        this.thickness.value = thickness<=100||thickness>=1?10:thickness;
    }
    showMenu(x, y){
        this.menu.style.display = 'block';
        this.menu.style.left = x + 'px';
        this.menu.style.top = y + 'px';
        this.menu.style.position = 'absolute';
    }
    hideMenu() {
        this.menu.style.display = 'none';
    }
}