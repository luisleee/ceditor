import React from "react";
import Chains from "./Chains";
import ChainItemList from "./ChainItemList";
import ItemEditor from "./ItemEditor";

import "../style/index.css";
import ChainsProvider from "./Chains-hook";

const initialChains = [{ id: "0", items: [] }];
export default function App() {
    return (
        <>
            <ChainsProvider initialChains={initialChains}>
                <Chains></Chains>
                <div id="bottom-pane">
                    <ChainItemList></ChainItemList>
                    <ItemEditor></ItemEditor>
                </div>
            </ChainsProvider>
        </>
    );
}
