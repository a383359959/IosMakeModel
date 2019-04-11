const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        mainWindow = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

ipc.on('open-error-dialog', function (event, arg) {
    dialog.showErrorBox("错误", "asd" + arg);
});
