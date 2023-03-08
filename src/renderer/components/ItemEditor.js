import React from "react";
import { useChains } from "./Chains-hook";

import None from "./Item/None";
import Dialog from "./Item/Dialog";
// Image
import Music from "./Item/Music";
import Option from "./Item/Option";
import Task from "./Item/Task";
import Map from "./Item/Map";
import Mind from "./Item/Mind";
import Symbol from "./Item/Symbol";
import Transition from "./Item/Transition";


export default function ItemEditor() {
    const { item, updateItem } = useChains();
    const setType = (type) => {
        updateItem({ type });
    };

    const types = [
        "none",
        "dialog",
        "image",
        "music",
        "option",
        "task",
        "map",
        "mind",
        "symbol",
        "transition",
    ];

    return (
        <>
            <h1>Item</h1>
            {!item ? (
                <p>no item selected</p>
            ) : (
                <>
                    <p>
                        type:
                        {types.map((type) => (
                            <span key={type}>
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={item.type == type}
                                    readOnly
                                    onClick={() => setType(type)}
                                />
                                {type}
                            </span>
                        ))}
                    </p>
                    {item.type == "none" && <None></None>}
                    {item.type == "dialog" && <Dialog></Dialog>}
                    {/* image */}
                    {item.type == "music" && <Music></Music>}
                    {item.type == "option" && <Option></Option>}
                    {item.type == "task" && <Task></Task>}
                    {item.type == "map" && <Map></Map>}
                    {item.type == "mind" && <Mind></Mind>}
                    {item.type == "symbol" && <Symbol></Symbol>}
                    {item.type == "transition" && <Transition></Transition>}
                </>
            )}
        </>
    );
}
