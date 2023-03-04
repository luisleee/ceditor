import React from "react";
export default function ChainItem({ type, index, selected, onClick }) {
    return (
        <li onClick={onClick} className={selected ? "selected" : ""}>
            {index.toString() + "\t" + type.toUpperCase()}
        </li>
    );
}
