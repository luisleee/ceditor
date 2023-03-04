import React, { useCallback } from "react";
import useState from "react-usestateref";
import Chains from "./Chains";
import ChainItemList from "./ChainItemList";
import ItemEditor from "./ItemEditor";

import "../style/index.css";
import useChains from "./useChains";

export default function App() {
    const initialChains = [{ id: "0", items: [] }];
    const [chains, chain, item, selectChain, addChain, selectItem, addItem] =
        useChains(initialChains);

    console.log(chains);

    return (
        <>
            <Chains onSelect={selectChain} onAdd={addChain}></Chains>
            <div id="bottom-pane">
                <ChainItemList
                    items={chain?.items}
                    chainName={chain?.id}
                    onSelect={selectItem}
                    onAdd={addItem}
                ></ChainItemList>
                <ItemEditor item={item}></ItemEditor>
            </div>
        </>
    );
}
