console.log('main process working');

const electron = require("electron");

const app = electron.app; 
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win, dimWindow, coloredWindow, framelessWindow;
let parentWindow, childWindow;
function createWindow(){
    //win = new BrowserWindow();
    // dimWindow = new BrowserWindow({
    //     width: 400, 
    //     height: 400, 
    //     maxWidth:800, 
    //     maxHeight:800
    // });
    
    //coloredWindow  = new BrowserWindow({backgroundColor: '#343434'});

    //framelessWindow = new BrowserWindow({backgroundColor: '#808080', frame:false});

    parentWindow = new BrowserWindow({title:'Parent',});
    childWindow = new BrowserWindow({
        title:'Child', 
        modal:true, 
        parent:parentWindow,
        width: 700, 
        height: 500,
        show: false
    });
    childWindow.loadURL('https://github.com');
    childWindow.once('ready-to-show',() => {
        childWindow.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-close', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});