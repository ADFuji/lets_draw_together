import BrushMenu from './BrushMenu.js'
import Canvas from './Canvas.js'
/*const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  });*/

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => 'azdazd',
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  bmenu: () => BrushMenu,
    canvas: () => Canvas,
});