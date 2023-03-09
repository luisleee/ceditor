import React from "react";
import { useChains } from "../Chains-hook";

export default function Dialog() {
    const { item, updateItem, itemRef } = useChains();

    return (
        <div>
            <p>
                speaker:
                <input
                    type="text"
                    value={item?.speaker}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            speaker: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                line:
                <input
                    type="text"
                    value={item?.line}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            line: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                emotion:
                <input
                    type="number"
                    value={item?.emotion}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            emotion: evt.target.value,
                        });
                    }}
                />
            </p>
        </div>
    );
}
