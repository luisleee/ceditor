import React, { useState } from "react";
import ChainItem from "./ChainItem";
export default function ChainItemList({ items, onSelect, onAdd, chainName }) {
    const [selected, setSelected] = useState(null);
    function onClick(idx) {
        setSelected(idx);
        onSelect(idx);
    }
    return (
        <div id="chain-item-list">
            {!items ? (
                <p>no chain selected</p>
            ) : (
                <>
                    <p>chain: {chainName}</p>
                    <ul>
                        {items.length == 0 ? (
                            <li>no item</li>
                        ) : (
                            items.map(function (item, index) {
                                return (
                                    <ChainItem
                                        key={index}
                                        onClick={() => onClick(index)}
                                        selected={index == selected}
                                        {...{ index, type: item.type }}
                                    ></ChainItem>
                                );
                            })
                        )}
                        <li id="add-item" onClick={onAdd}>
                            add item
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}
