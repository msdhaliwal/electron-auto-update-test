const { app, BrowserWindow, Menu } = require("electron");
let win;
const { autoUpdater } = require("electron-updater")
autoUpdater.checkForUpdatesAndNotify();
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) createWindow();
});

autoUpdater.on('checking-for-update', _=>{
  win.webContents.send('message', 'checking for update');
});

autoUpdater.on('update-available', info=>{
  win.webContents.send('message', 'update available');
});

autoUpdater.on('update-not-available', info=>{
  win.webContents.send('message', 'update not available');
});

autoUpdater.on('error', err=>{
  win.webContents.send('message', `error in auto-updater ${err.toString()}`);
});

autoUpdater.on('download-progress', progressObj=>{
  win.webContents.send('message', `Download in progress: speed ${progressObj.bytesPerSecond}`);
});

autoUpdater.on('update-downloaded', progressObj=>{
  win.webContents.send('message', 'update downloaded and will be installed once app is closed');
});