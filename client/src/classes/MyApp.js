const {app, BrowserWindow, Menu} = require('electron')
process.stdout.write('your output to command prompt console or node js ')
const path = require('path')
class MyApp {
    //attributes to save name of the app and the version
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.width = 800;
        this.height = 600;
        app.setUserTasks([
            {
              program: process.execPath,
              arguments: '--new-window',
              iconPath: process.execPath,
              iconIndex: 0,
              title: 'Nouvelle fenêtre',
              description: 'Créer une nouvelle fenêtre'
            }
        ])
        app.whenReady().then(() => {
            this.createWindow()
            

            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) createWindow()
              })
        })
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit()
        })

    }
    //method to create the window
    createWindow() {
        const win = new BrowserWindow({
            autoHideMenuBar: true,
            width: this.width,
            height: this.height,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
              },
        });
        //win.loadURL('http://fuji.studio')
        win.loadFile('./index.html');
        win.maximize();
    }
    //method to create the menu
    createMenu() {
        const template = [
            {
                label: 'Fichier',
                submenu: [
                    {
                        label: 'Nouvelle fenêtre',
                        accelerator: 'CmdOrCtrl+N',
                        click: () => {
                            this.createWindow()
                        }
                    },
                    {
                        label: 'Quitter',
                        accelerator: 'CmdOrCtrl+Q',
                        click: () => {
                            app.quit()
                        }
                    }
                ]
            }
        ]
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }
}
module.exports = {MyApp};