import React, { useState } from "react";
import ChainItem from "./ChainItem";
import { useChains } from "./Chains-hook";
export default function ChainItemList() {
    const [selected, setSelected] = useState(null);
    const { chain, selectItem, addItem } = useChains();
    const items = chain?.items;
    const chainName = chain?.id;
    const onClick = (idx) => {
        setSelected(idx);
        selectItem(idx);
    };
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
                        <li id="add-item" onClick={addItem}>
                            add item
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}
