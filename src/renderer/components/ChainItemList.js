import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import ChainItem from "./ChainItem";
import { useChains } from "./Chains-hook";
export default function ChainItemList() {
    const [selected, setSelected] = useState(null);
    const { chain, chainRef, updateChain, selectItem, addItem } = useChains();
    const inputRef = useRef(null);
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
        updateChain({ ...chainRef.current, name });
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
                    </p>
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
                        <p id="add-item" onClick={addItem}>
                            + add item
                        </p>
                    </ul>
                </>
            )}
        </div>
    );
}
