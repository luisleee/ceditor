import React from "react";
import { useChains } from "../Chains-hook";

export default function Music() {
    const { item, updateItem, itemRef } = useChains();
    const setMusicPiece = (evt) => {
        updateItem({ ...itemRef.current, piece: evt.target.value });
    };
    return (
        <div>
            <p>
                piece:
                <input
                    type="text"
                    onChange={setMusicPiece}
                    value={item.piece || ""}
                />
            </p>
        </div>
    );
}
