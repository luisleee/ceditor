import React from "react";
import { Handle, Position, NodeToolbar, useReactFlow } from "reactflow";
import { useChains } from "./Chains-hook";

export default function NodeWithDelete({ data, id }) {
    const { setNodes, setEdges } = useReactFlow();
    const { chain, setChains, deleteChain, selectChain } = useChains();
    const deleteProp = (prop, { [prop]: _, ...rest }) => rest;
    const onDelete = () => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        setEdges((eds) =>
            eds.filter((e) => e.source !== id && e.target !== id)
        );
        deleteChain(id);
        let changed = false;
        setChains((chs) =>
            chs.map((ch) => {
                if (ch.id === chain?.id) {
                    changed = true;
                }
                return {
                    ...ch,
                    next: deleteProp(id, ch.next),
                };
            })
        );
        if (changed) {
            selectChain(chain.id);
        }
    };

    return (
        <>
            <NodeToolbar
                isVisible={data.toolbarVisible}
                position={data.toolbarPosition}
            >
                <button onClick={onDelete}>delete</button>
            </NodeToolbar>
            <div style={{ padding: "10px 40px" }}>{data.label}</div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
}
