import { MySocket } from './socket.js';
import { Canvas } from './classes/Canvas.js';
import { MTools } from './classes/Menu/MTools.js';
import { MColorThickness } from './classes/Menu/MColorThickness.js';

window.onload=async ()=>{
    let socket = new MySocket();
    await socket.login();

    let mtools = new MTools(document.querySelector('#main_page'));
    let mcolorthickness = new MColorThickness(document.querySelector('#main_page'),mtools);
    let canvas = new Canvas(socket, document.getElementById('lets_draw'), mtools, mcolorthickness);
    await canvas.init()
    

}
