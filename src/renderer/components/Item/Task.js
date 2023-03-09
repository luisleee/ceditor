import React from "react";
import { useChains } from "../Chains-hook";

export default function Task() {
    const states = ["in-progress", "accomplished", "failed"];
    const { item, updateItem, itemRef } = useChains();
    return (
        <div>
            <p>
                name:
                <input
                    type="text"
                    value={item?.name}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            name: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                desc:
                <input
                    type="text"
                    value={item?.desc}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            desc: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                state:
                {states.map((state) => (
                    <span key={state}>
                        <input
                            type="radio"
                            name="task-state"
                            value={state}
                            checked={item?.state === state}
                            readOnly
                            onClick={() => {
                                updateItem({ ...itemRef.current, state });
                            }}
                        />
                        {state}
                    </span>
                ))}
            </p>
        </div>
    );
}
