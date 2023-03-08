import React from "react";
import { getBezierPath, useEdges, useReactFlow } from "reactflow";
import { useChains } from "./Chains-hook";

const foreignObjectSize = 40;

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const { getEdges, setEdges } = useReactFlow();
    const { chain, setChains, selectChain } = useChains();
    const deleteProp = (prop, { [prop]: _, ...rest }) => rest;
    const onEdgeClick = (evt, id) => {
        evt.stopPropagation();

        const { source, target } = getEdges().find((e) => e.id === id);
        setEdges((eds) => eds.filter((e) => e.id !== id));
        setChains((chs) =>
            chs.map((ch) =>
                ch.id !== source
                    ? ch
                    : {
                          ...ch,
                          next: deleteProp(target, ch.next),
                      }
            )
        );
        if (chain?.id === source) {
            selectChain(chain.id);
        }
    };

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button
                        className="edgebutton"
                        onClick={(event) => onEdgeClick(event, id)}
                    >
                        ×
                    </button>
                </div>
            </foreignObject>
        </>
    );
}
