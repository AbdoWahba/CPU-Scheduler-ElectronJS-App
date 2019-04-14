const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
//listen for app to be ready

app.on("ready", function() {
  //create new window
  mainWindow = new BrowserWindow({});
  //load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );
});

function creatAddWindow() {
  addWindow = new BrowserWindow({
    height: 1000,
    width: 1000,
    title: "Chart Window"
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "chartWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

ipcMain.on("item:add", function(e, item) {
  creatAddWindow();
  addWindow.show();
  addWindow.focus();
  addWindow.webContents.send("item:ele", item);
  console.log(item);
});
