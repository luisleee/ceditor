import React, { useEffect } from "react";
import { useChains } from "../Chains-hook";

export default function Transition() {
    const { item, updateItem, itemRef } = useChains();

    useEffect(() => {
        if (!item?.infos) {
            updateItem({ ...itemRef.current, infos: {} });
        }
    }, [item]);

    return (
        <div>
            <p>
                pattern:
                <input
                    type="text"
                    value={item.pattern || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            pattern: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                time:
                <input
                    type="number"
                    value={item.time || 0}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            time: evt.target.value,
                        });
                    }}
                />
            </p>
            <h2>infos:</h2>
            <p>
                color:
                <input
                    type="text"
                    value={item?.infos?.color || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            infos: {
                                ...itemRef.current.infos,
                                color: evt.target.value,
                            },
                        });
                    }}
                />
            </p>
        </div>
    );
}
