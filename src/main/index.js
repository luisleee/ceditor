const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let window = null;

function createWindow() {
    if (window) {
        return;
    }
    window = new BrowserWindow({
        webPreferences: {
            // preload: path.join(__dirname, "./preload.js"),
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: "#333544",
        minWidth: 450,
        minHeight: 350,
        height: 350,
        width: 450,
    });
    window.loadFile("../renderer/index.html").catch(console.error);
    window.on("close", () => (window = null));
}
app.on("ready", () => createWindow());
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", createWindow);

ipcMain.handle("click", () => {
    window.setBackgroundColor("blueviolet");
});
