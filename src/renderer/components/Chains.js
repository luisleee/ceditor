import React, { useRef, useCallback } from "react";
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
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

const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
        border: "2px solid #ff0071",
        background: "white",
        borderRadius: 20,
    },
};

const edgeDefaults = {
    markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
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

function Flow({ onSelect, onAdd }) {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const edgeUpdateSuccessful = useRef(true);
    const edgeUpdateWithTarget = useRef(false);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { project } = useReactFlow();

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => addEdge({ ...params, ...edgeDefaults }, eds));
        },
        [setEdges]
    );

    const onConnectEnd = useCallback(
        (event) => {
            if (!edgeUpdateSuccessful.current || edgeUpdateWithTarget.current) {
                return;
            }
            const targetIsPane =
                event.target.classList.contains("react-flow__pane");

            if (targetIsPane) {
                const { top, left } =
                    reactFlowWrapper.current.getBoundingClientRect();
                const id = getId().toString();
                const newNode = {
                    id,
                    position: project({
                        x: event.clientX - left - 75,
                        y: event.clientY - top,
                    }),
                    data: { label: id },
                    ...nodeDefaults,
                };
                onAdd(id);
                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({
                        id,
                        source: connectingNodeId.current,
                        target: id,
                        ...edgeDefaults,
                    })
                );
            }
        },
        [project]
    );

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
        edgeUpdateWithTarget.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        edgeUpdateWithTarget.current = true;

        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);

    const onNodeClick = useCallback((_, node) => {
        onSelect(node.id);
    }, []);

    return (
        <div id="chains" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onNodeClick={onNodeClick}
                fitView
                fitViewOptions={{ padding: 0.5 }}
                snapToGrid
            >
                <MiniMap />
                <Controls />
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
