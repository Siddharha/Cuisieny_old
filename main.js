const electron = require('electron');
const windowStateKeeper = require('electron-window-state');
const url = require('url');
const path = require('path');

const {app,BrowserWindow, Menu, ipcMain,remote} = electron;

let mainWindow, addItemWindow;
let mainWindowState;
app.on('ready',function(){

    mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
      });


    mainWindow = new BrowserWindow({
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height,
        frame: false
    });

    mainWindowState.manage(mainWindow);
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'./main_window/mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed',function(){
        app.quit();
    });
    //mainWindow.webContents.openDevTools()
    
});

const lItem = ipcMain.on('mnu_action',function(e,action){
    console.log(action);
    var theWindow = BrowserWindow.getFocusedWindow();
    switch (action){
        case 0:
        console.log("closed!");
        theWindow.close();
            break;
        case 1:
           theWindow.maximize();
           break;

           case 2:
           theWindow.minimize();
           break;

    }
})

const lItem_add = ipcMain.on('mnu:Add',function(e,action){

    if (action){
        showAddItemWindow();
    
    }
})


const menuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Cuisine',
                accelerator: process.platform == 'darwin'? 'Command + Shift + A': 'Ctrl + Shift + A',
                click(){
                    console.log('Not Implemented yet!'); 
                }
},
{
    label:'Exit',
    accelerator: process.platform == 'darwin'? 'Command + Shift + X': 'Ctrl + Shift + X',
    click(){
        app.exit();
    }
}
]
    }
]

function showAddItemWindow(){
    addItemWindow = new BrowserWindow({
        width: 500,
        height:300,
        resizable:false,
        frame: false,
        parent:mainWindow
    });

    addItemWindow.loadURL(url.format({
        pathname:path.join(__dirname,'./main_window/subwindows/addItem.html'),
        protocol:'file:',
        slashes: true
    }));

    
}