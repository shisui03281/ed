// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, app } = require('electron');

// バージョン情報をレンダラープロセスに公開
contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => app.getVersion()
});
