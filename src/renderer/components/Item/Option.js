import React, { useEffect } from "react";
import { useChains } from "../Chains-hook";

export default function Option() {
    const { item, updateItem, itemRef } = useChains();

    useEffect(() => {
        if (!item?.options) {
            updateItem({ ...itemRef.current, options: [] });
            return;
        }
    }, [item]);

    const changeOpt = (i, val) => {
        updateItem({
            ...itemRef.current,
            options: itemRef.current.options.map((opt, id) =>
                id !== i ? opt : val
            ),
        });
    };

    const deleteOpt = (i) => {
        updateItem({
            ...itemRef.current,
            options: itemRef.current.options.filter((opt, id) => id !== i),
        });
    };

    const addOpt = () => {
        updateItem({
            ...itemRef.current,
            options: [...itemRef.current.options, ""],
        });
    };

    return (
        <div>
            <p>
                question:
                <input
                    type="text"
                    value={item.question || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            question: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                name:
                <input
                    type="text"
                    value={item.name || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            name: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>options:</p>
            <ul>
                {!item?.options || item.options.length == 0 ? (
                    <li>no options</li>
                ) : (
                    item.options.map((option, i) => (
                        <li key={i}>
                            {i}:
                            <input
                                type="text"
                                value={option}
                                onChange={(evt) => {
                                    changeOpt(i, evt.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    deleteOpt(i);
                                }}
                            >
                                delete
                            </button>
                        </li>
                    ))
                )}
                <p className="add-item" onClick={addOpt}>
                    + add item
                </p>
            </ul>
        </div>
    );
}
