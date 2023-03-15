const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const fs = require("fs/promises");

let window = null;

function openFile() {
    dialog
        .showOpenDialog(window, {
            filters: [
                { name: "JSON document", extensions: ["json"] },
                { name: "All Files", extensions: ["*"] },
            ],
        })
        .then(({ canceled, filePaths }) => {
            if (!canceled) {
                return fs.readFile(filePaths[0]);
            }
        })
        .then((buff) => {
            const str = buff.toString();
            const json = JSON.parse(str);
            window.webContents.send("openFile", json);
        })
        .catch((err) => {
            console.error(err);
            dialog.showErrorBox("Error", "There's something wrong...");
        });
}

function saveFile() {
    window.webContents.send("saveFile");
}

ipcMain.on("saveFile", (evt, obj) => {
    const str = JSON.stringify(obj);
    dialog
        .showSaveDialog(window, {
            filters: [
                { name: "JSON document", extensions: ["json"] },
                { name: "All Files", extensions: ["*"] },
            ],
        })
        .then(({ canceled, filePath }) => {
            if (!canceled) {
                return fs.writeFile(filePath, str);
            }
        })
        .catch((err) => {
            console.error(err);
            dialog.showErrorBox("Error", "There's something wrong...");
        });
});

let menuTemplate = [
    {
        label: "File",
        submenu: [
            { label: "Open", accelerator: "Ctrl+O", click: openFile },
            { label: "Save", accelerator: "Ctrl+S", click: saveFile },
            { role: "quit" },
        ],
    },
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
        ],
    },
    {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
    },
];

function createWindow() {
    if (window) {
        return;
    }
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: "#333544",
        minWidth: 750,
        minHeight: 550,
        width: 1500,
        height: 1100,
    });
    window.loadFile("dist/renderer/index.html").catch(console.error);
    window.on("close", () => (window = null));
}
app.on("ready", () => createWindow());
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", createWindow);
