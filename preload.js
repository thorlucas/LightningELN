// From https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron

const { app, contextBridge } = require('electron');
const fs = require('fs').promises;
const path = require('path');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
/*
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
*/

// FIXME: for some reason, app is undefined. Hm.
// app.getPath('userData');
const appDataPath = '/Users/thorcorreia/Library/Application\ Support/LightningELN';

contextBridge.exposeInMainWorld('fs', {
	readFile: (filePath) => {
		const fullPath = path.join(appDataPath, filePath);
		console.log(`Reading file at ${fullPath}`);
		return fs.readFile(fullPath, 'utf-8');
	},
	writeFile: (filePath, data) => {
		const fullPath = path.join(appDataPath, filePath);
		console.log(`Writing file at ${fullPath}`);
		return fs.writeFile(fullPath, data);
	},
	readDir: (dirPath) => {
		const fullPath = path.join(appDataPath, dirPath);
		return fs.readdir(fullPath);
	},
});
