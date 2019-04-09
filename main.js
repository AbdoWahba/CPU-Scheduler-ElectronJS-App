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
  // const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
  // Menu.setApplicationMenu(mainMenu);
});

//handle chart window
// function creatAddWindow() {
//   addWindow = new BrowserWindow({
//     height: 1000,
//     width: 1000,
//     title: "Chart Window"
//   });
//   //load html into window
//   addWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, "chartWindow.html"),
//       protocol: "file:",
//       slashes: true
//     })
//   );
// }
//catch data
ipcMain.on("item:add", function(e, item) {
  // "use strict";
  // addWindow = new BrowserWindow({
  //   height: 1000,
  //   width: 1000,
  //   title: "Chart Window"
  // });
  // //load html into window
  // addWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "chartWindow.html"),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );
  // addWindow.show();
  // addWindow.focus();
  console.log(item);
});
// const mainMenuTemp = [
//   {
//     lable: "File",
//     submenue: [
//       {
//         lable: "add item",
//         click() {
//           creatAddWindow();
//         }
//       },
//       {
//         lable: "delete",
//         click() {
//           app.quit();
//         }
//       }
//     ]
//   }
// ];
