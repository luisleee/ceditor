import React from "react";
export default function ItemEditor({ item }) {
    return (
        <div id="item-editor">
            <h1>Item Editor</h1>
            {!item ? <p>no item</p> : <p>type: {item.type}</p>}
        </div>
    );
}
