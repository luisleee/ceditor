import React, { useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import ChainItem from "./ChainItem";
import { useChains } from "./Chains-hook";
export default function ChainItemList({ editNext }) {
    const inputRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const { chain, updateChain, selectItem, addItem } = useChains();
    const { setNodes } = useReactFlow();

    const items = chain?.items;
    const chainId = chain?.id;
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = chain?.name;
        }
    }, [chain]);

    const onClick = (idx) => {
        setSelected(idx);
        selectItem(idx);
    };

    const setLabel = () => {
        const name = inputRef.current.value;
        setNodes((nds) =>
            nds.map((n) =>
                n.id !== chainId
                    ? n
                    : { ...n, data: { ...n.data, label: name } }
            )
        );
        updateChain({ name });
    };

    return (
        <div id="chain-item-list">
            {!items ? (
                <p>no chain selected</p>
            ) : (
                <>
                    <p>
                        chain:
                        <input type="text" ref={inputRef} onChange={setLabel} />
                        <button onClick={() => editNext(true)}>
                            edit next
                        </button>
                        <button onClick={() => editNext(false)}>
                            edit item
                        </button>
                    </p>
                    <ul id="item-list">
                        {items.length == 0 ? (
                            <li>no item</li>
                        ) : (
                            items.map((item, index) => (
                                <ChainItem
                                    key={index}
                                    onClick={() => {
                                        editNext(false);
                                        onClick(index);
                                    }}
                                    selected={index == selected}
                                    {...{ index, type: item.type }}
                                ></ChainItem>
                            ))
                        )}
                        <p className="add-item" onClick={addItem}>
                            + add item
                        </p>
                    </ul>
                </>
            )}
        </div>
    );
}
