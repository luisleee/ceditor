import React from "react";
import { ReactFlowProvider } from "reactflow";
import Chains from "./Chains";
import ChainItemList from "./ChainItemList";
import ItemEditor from "./ItemEditor";

import "../style/index.css";
import ChainsProvider from "./Chains-hook";

const initialChains = [];
export default function App() {
    return (
        <>
            <ChainsProvider initialChains={initialChains}>
                <ReactFlowProvider>
                    <Chains></Chains>
                    <div id="bottom-pane">
                        <ChainItemList></ChainItemList>
                        <ItemEditor></ItemEditor>
                    </div>
                </ReactFlowProvider>
            </ChainsProvider>
        </>
    );
}
