import React from "react";
import { useChains } from "../Chains-hook";

export default function Symbol() {
    const { item, updateItem, itemRef } = useChains();
    return (
        <div>
            <p>
                symbol:
                <input
                    type="text"
                    value={item.symbol || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            symbol: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                desc:
                <input
                    type="text"
                    value={item.desc || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            desc: evt.target.value,
                        });
                    }}
                />
            </p>
        </div>
    );
}
