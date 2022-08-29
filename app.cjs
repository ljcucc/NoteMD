const { app, BrowserWindow } = require('electron');

function createWindow(){
  const win = new BrowserWindow({ title: "YeeChat", width: 800, height: 600 })
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow()
  require("./index.js");

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})