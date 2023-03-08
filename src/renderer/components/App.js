import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import Chains from "./Chains";
import ChainItemList from "./ChainItemList";
import ItemEditor from "./ItemEditor";
import NextEditor from "./NextEditor";

import "../style/index.css";
import ChainsProvider from "./Chains-hook";

const initialChains = [];
export default function App() {
    const [editingNext, editNext] = useState(false);
    return (
        <>
            <ChainsProvider initialChains={initialChains}>
                <ReactFlowProvider>
                    <Chains></Chains>
                    <div id="bottom-pane">
                        <ChainItemList editNext={editNext}></ChainItemList>
                        <div id="main-editor">
                            {editingNext ? (
                                <NextEditor></NextEditor>
                            ) : (
                                <ItemEditor></ItemEditor>
                            )}
                        </div>
                    </div>
                </ReactFlowProvider>
            </ChainsProvider>
        </>
    );
}
