import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { ipcRenderer } from "electron";

const container = document.getElementById("react-root");
const root = createRoot(container);
root.render(<App />);
