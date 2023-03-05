import React, { useRef, useCallback } from "react";
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    ControlButton,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
    addEdge,
    updateEdge,
    Position,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ButtonEdge from "./ButtonEdge.js";
import { useChains } from "./Chains-hook.js";

import NodeWithDelete from "./NodeWithDelete";

const nodeTypes = {
    del: NodeWithDelete,
};
const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "del",

    style: {
        border: "2px solid #ff0071",
        background: "white",
        borderRadius: 20,
    },
};

const edgeDefaults = {
    type: "buttonedge",
    markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
};

const edgeTypes = {
    buttonedge: ButtonEdge,
};

const initialNodes = [
    {
        id: "0",
        position: { x: 0, y: 0 },
        data: { label: "0" },
        ...nodeDefaults,
    },
];

const initialEdges = [];

const getId = (() => {
    let id = 1;
    return () => id++;
})();

function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { selectChain, addChain } = useChains();

    const onConnect = (params) => {
        setEdges((eds) => addEdge({ ...params, ...edgeDefaults }, eds));
    };

    const onNodeClick = (_, node) => {
        selectChain(node.id);
    };

    const onNewChain = () => {
        const id = getId().toString();
        const newNode = {
            id,
            position: { x: 0, y: 0 },
            data: { label: id },
            ...nodeDefaults,
        };
        addChain(id);
        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div id="chains">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
                fitViewOptions={{ padding: 0.5 }}
                snapToGrid
            >
                <MiniMap pannable />
                <Controls>
                    <ControlButton onClick={onNewChain}>
                        <div>N</div>
                    </ControlButton>
                </Controls>
                <Background />
            </ReactFlow>
        </div>
    );
}

export default function Chain(props) {
    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}
