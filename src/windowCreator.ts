import { BrowserWindow } from 'electron';
import * as path from 'path';

export default class windowCreator {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            windowCreator.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        windowCreator.mainWindow = null;
    }

    private static onReady() {
        windowCreator.mainWindow = new windowCreator.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true
            },
            titleBarStyle: 'hiddenInset'
        });
        windowCreator.mainWindow
            .loadURL('file://' + __dirname + '/../app.html');
        windowCreator.mainWindow.on('closed', windowCreator.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        windowCreator.BrowserWindow = browserWindow;
        windowCreator.application = app;
        windowCreator.application.on('window-all-closed', windowCreator.onWindowAllClosed);
        windowCreator.application.on('ready', windowCreator.onReady);
    }
}
