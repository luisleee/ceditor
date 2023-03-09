import React from "react";
import { useChains } from "../Chains-hook";

export default function Map() {
    const { item, updateItem, itemRef } = useChains();
    const inherit = () => item.map_name === undefined;
    return (
        <div>
            <p>
                inherit default map:
                <input
                    type="checkbox"
                    checked={inherit()}
                    onClick={() => {
                        if (!inherit()) {
                            updateItem({
                                ...itemRef.current,
                                map_name: undefined,
                                pos: [0, 0],
                            });
                        } else {
                            updateItem({
                                ...itemRef.current,
                                map_name: "",
                                pos: [0, 0],
                            });
                        }
                    }}
                    readOnly
                />
            </p>
            {!inherit() && (
                <div>
                    <p>
                        map_name:
                        <input
                            type="text"
                            value={item?.map_name}
                            onChange={(evt) => {
                                updateItem({
                                    ...itemRef.current,
                                    map_name: evt.target.value,
                                });
                            }}
                        />
                    </p>
                    <h2>pos:</h2>
                    <p>
                        x:
                        <input
                            type="number"
                            value={item?.pos[0]}
                            onChange={(evt) => {
                                updateItem({
                                    ...itemRef.current,
                                    pos: [
                                        evt.target.value,
                                        itemRef.current.pos[1],
                                    ],
                                });
                            }}
                        />
                        y:
                        <input
                            type="number"
                            value={item?.pos[1]}
                            onChange={(evt) => {
                                updateItem({
                                    ...itemRef.current,
                                    pos: [
                                        itemRef.current.pos[0],
                                        evt.target.value,
                                    ],
                                });
                            }}
                        />
                    </p>
                </div>
            )}
        </div>
    );
}
