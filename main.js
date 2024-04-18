const { BrowserWindow, app } = require('electron');
const { ipcMain } = require('electron');

const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 1280,
        backgroundColor: '#666666',
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'; script-src 'self'",
        }
    });

    // win.removeMenu();

    win.loadFile('index.html');
}

function getAudioFiles() {
    const audioDir = path.join(__dirname, 'public', 'audio');
    
    fs.readdir(audioDir, (err, files) => {
        if (err) {
            return console.error('Unable to read directory:', err);
        }
        console.log('Audio files:', files);
    });
}

ipcMain.on('request-audio-files', (event) => {
    const audioDir = path.join(__dirname, 'public', 'audio');
    fs.readdir(audioDir, (err, files) => {
        if (err) {
            event.reply('response-audio-files', { error: err.message });
        } else {
            event.reply('response-audio-files', { files });
        }
    });
});

getAudioFiles();  // Call the function to print the files


app.whenReady().then(createWindow);

