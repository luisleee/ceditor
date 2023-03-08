import React from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    ControlButton,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Position,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ButtonEdge from "./ButtonEdge.js";
import NodeWithDelete from "./NodeWithDelete";
import { useChains } from "./Chains-hook.js";

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

const initialNodes = [];

const initialEdges = [];

const getId = (() => {
    let id = 0;
    return () => id++;
})();

export default function Chain() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { setChains, chain, selectChain, addChain } =
        useChains();

    const onConnect = (params) => {
        setEdges((eds) => addEdge({ ...params, ...edgeDefaults }, eds));
        const { source, target } = params;
        setChains((chs) =>
            chs.map((ch) =>
                ch.id !== source
                    ? ch
                    : {
                          ...ch,
                          next: {
                              [target]: { options: {} },
                              ...ch.next,
                          },
                      }
            )
        );
        if (chain?.id === source) {
            selectChain(chain.id);
        }
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
                        <div title="new chain">N</div>
                    </ControlButton>
                </Controls>
                <Background />
            </ReactFlow>
        </div>
    );
}
