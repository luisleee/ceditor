import React from "react";
import { useChains } from "./Chains-hook";
export default function ItemEditor() {
    const { item, itemRef, updateItem } = useChains();
    const setType = (type) => {
        updateItem({ ...itemRef.current, type });
    };

    const types = [
        "none",
        "dialog",
        "image",
        "music",
        "option",
        "task",
        "map",
        "mind",
        "symbol",
        "transition",
    ];
    return (
        <div id="item-editor">
            <h1>Item Editor</h1>
            {!item ? (
                <p>no item selected</p>
            ) : (
                <>
                    <p>
                        type:
                        {types.map((type) => (
                            <span key={type}>
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    defaultChecked={item.type == type}
                                    onClick={() => setType(type)}
                                />
                                {type}
                            </span>
                        ))}
                    </p>
                </>
            )}
        </div>
    );
}
