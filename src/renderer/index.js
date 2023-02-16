import React from "react";
import { render } from "react-dom";
import Words from "./components/Words";
import { ipcRenderer } from "electron";

const f = () => {
    ipcRenderer.invoke("click").catch();
};
render(<Words words="Aaaaaa" c={f} />, document.getElementById("react-root"));
