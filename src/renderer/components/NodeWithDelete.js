import React from "react";
import { Handle, Position, NodeToolbar, useReactFlow } from "reactflow";
import { useChains } from "./Chains-hook";

export default function NodeWithDelete({ data, id }) {
    const { setNodes } = useReactFlow();
    const { deleteChain} = useChains();
    const onDelete = () => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        deleteChain(id);
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
