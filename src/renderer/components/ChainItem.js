import React from "react";
import { useChains } from "./Chains-hook";
export default function ChainItem({ type, index, selected, onClick }) {
    const { deleteItem } = useChains();
    return (
        <li onClick={onClick} className={selected ? "selected" : ""}>
            <span className="item-index">{index.toString()}</span>
            <span className="item-type">{type.toUpperCase()}</span>
            <span className="item-delete">
                {selected ? (
                    <button id="delete-item" onClick={() => deleteItem()}>
                        delete
                    </button>
                ) : (
                    ""
                )}
            </span>
        </li>
    );
}
