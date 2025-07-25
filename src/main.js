const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  // 起動時にアップデートを確認
  autoUpdater.checkForUpdatesAndNotify();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アップデーターのイベントを監視
autoUpdater.on('checking-for-update', () => {
  console.log('アップデートをチェック中...');
});

autoUpdater.on('update-available', (info) => {
  console.log('アップデートが見つかりました:', info);
});

autoUpdater.on('update-not-available', (info) => {
  console.log('アップデートはありません:', info);
});

autoUpdater.on('error', (err) => {
  console.log('アップデートエラー:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log('ダウンロード進捗:', progressObj);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('アップデートのダウンロードが完了しました。再起動してインストールします:', info);
  autoUpdater.quitAndInstall();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
