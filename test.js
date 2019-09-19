const { autoUpdater } = require("electron-updater")
console.log("Logged Output: autoUpdater", autoUpdater)
autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on('checking-for-update', _=>{
  console.log('here');
  setTimeout(() => {
    mainWindow.webContents.send('console', 'checking for update');
    mainWindow.webContents.send('message', { msg: 'checking for update'});
    mainWindow.webContents.send('checking for update');
  }, 10000);
});

autoUpdater.on('update-available', info=>{
  mainWindow.webContents.send('console', 'update available');
});

autoUpdater.on('update-not-available', info=>{
  mainWindow.webContents.send('console', 'update not available');
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('error', err=>{
  mainWindow.webContents.send('console', `error in auto-updater ${err.toString()}`);
});

autoUpdater.on('download-progress', progressObj=>{
  mainWindow.webContents.send('console', `Download in progress: speed ${progressObj.bytesPerSecond}`);
});

autoUpdater.on('update-downloaded', progressObj=>{
  autoUpdater.quitAndInstall();
  mainWindow.webContents.send('update_downloaded');
});