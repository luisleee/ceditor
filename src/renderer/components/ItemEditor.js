import React from "react";
import { useChains } from "./Chains-hook";
export default function ItemEditor() {
    const { item } = useChains();
    return (
        <div id="item-editor">
            <h1>Item Editor</h1>
            {!item ? <p>no item</p> : <p>type: {item.type}</p>}
        </div>
    );
}
