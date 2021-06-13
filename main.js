const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

function createWindow() {
	const win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.loadFile(`${__dirname}/app/index.html`);

	win.webContents.openDevTools();

	ipcMain.on('toMain', (event, args) => {
		console.log(event);
		console.log(args);
		win.webContents.send('fromMain', 'got');
	});
};

app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true }, forceDownload: false })
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	createWindow();

	console.log(app.getPath('userData'));

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	});
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})


