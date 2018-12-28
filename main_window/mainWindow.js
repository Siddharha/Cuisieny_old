const electron = require('electron');
const {ipcRenderer} = electron;

function mnuAction(type){
    console.log("close window!");
        ipcRenderer.send('mnu_action',type);
}

function addItem(){
    ipcRenderer.send('mnu:Add',true);
}