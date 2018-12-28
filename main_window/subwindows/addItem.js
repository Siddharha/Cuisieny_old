const electron = require('electron');
const {ipcRenderer} = electron;

function mnuAction(options){
ipcRenderer.send('mnu_action',options);
}