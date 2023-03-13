import React, { useEffect } from "react";
import { useChains } from "../Chains-hook";

export default function Image() {
    const { item, updateItem, itemRef } = useChains();

    useEffect(() => {
        if (!item?.add) {
            updateItem({ ...itemRef.current, add: [] });
            return;
        }
        if (!item?.remove) {
            updateItem({ ...itemRef.current, remove: [] });
            return;
        }
    }, [item]);

    const changeA = (i, field, val) => {
        updateItem({
            ...itemRef.current,
            add: itemRef.current.add.map((img, id) =>
                id !== i
                    ? img
                    : {
                          ...img,
                          [field]: val,
                      }
            ),
        });
    };

    const changeAArg = (i, field, val) => {
        updateItem({
            ...itemRef.current,
            add: itemRef.current.add.map((img, id) =>
                id !== i
                    ? img
                    : {
                          ...img,
                          args: {
                              ...img.args,
                              [field]: val,
                          },
                      }
            ),
        });
    };

    const changeMov = (i, j, field, val) => {
        updateItem({
            ...itemRef.current,
            add: itemRef.current.add.map((img, id) =>
                id !== i
                    ? img
                    : {
                          ...img,
                          movements: img.movements.map((movement, phase) =>
                              phase !== j
                                  ? movement
                                  : {
                                        ...movement,
                                        [field]: val,
                                    }
                          ),
                      }
            ),
        });
    };

    const deleteA = (i) => {
        updateItem({
            ...itemRef.current,
            add: itemRef.current.add.filter((img, id) => id !== i),
        });
    };

    const addA = () => {
        updateItem({
            ...itemRef.current,
            add: [
                ...itemRef.current.add,
                {
                    movements: [{}, {}, {}],
                },
            ],
        });
    };

    const changeR = (i, val) => {
        updateItem({
            ...itemRef.current,
            remove: itemRef.current.remove.map((opt, id) =>
                id !== i ? opt : val
            ),
        });
    };

    const deleteR = (i) => {
        updateItem({
            ...itemRef.current,
            remove: itemRef.current.remove.filter((opt, id) => id !== i),
        });
    };

    const addR = () => {
        updateItem({
            ...itemRef.current,
            remove: [...itemRef.current.remove, ""],
        });
    };

    return (
        <div>
            <h2>add:</h2>
            <ul>
                {!item?.add || item.add.length == 0 ? (
                    <li>no add</li>
                ) : (
                    item.add.map((img, i) => (
                        <li key={i}>
                            <div className="img-data">
                                <h2>{i}</h2>
                                <p>
                                    class:
                                    <input
                                        type="text"
                                        value={img.class || ""}
                                        onChange={(evt) => {
                                            changeA(
                                                i,
                                                "class",
                                                evt.target.value
                                            );
                                        }}
                                    />
                                </p>
                                <p>
                                    spr:
                                    <input
                                        type="text"
                                        value={img.spr || ""}
                                        onChange={(evt) => {
                                            changeA(i, "spr", evt.target.value);
                                        }}
                                    />
                                </p>
                                <p>
                                    comic:
                                    <input
                                        type="checkbox"
                                        checked={!!img.comic}
                                        onClick={(evt) => {
                                            changeA(i, "comic", !img.comic);
                                        }}
                                        readOnly
                                    />
                                </p>
                                <p>
                                    posx:
                                    <input
                                        type="number"
                                        value={img.posx || 0}
                                        onChange={(evt) => {
                                            changeA(
                                                i,
                                                "posx",
                                                evt.target.value
                                            );
                                        }}
                                    />
                                </p>
                                <p>
                                    posy:
                                    <input
                                        type="number"
                                        value={img.posy || 0}
                                        onChange={(evt) => {
                                            changeA(
                                                i,
                                                "posy",
                                                evt.target.value
                                            );
                                        }}
                                    />
                                </p>
                                <div className="img-args">
                                    <p>args:</p>
                                    <p>
                                        scale_x:
                                        <input
                                            type="number"
                                            value={img?.args?.scale_x || 0}
                                            onChange={(evt) => {
                                                changeAArg(
                                                    i,
                                                    "scale_x",
                                                    evt.target.value
                                                );
                                            }}
                                        />
                                    </p>
                                    <p>
                                        scale_y:
                                        <input
                                            type="number"
                                            value={img?.args?.scale_y || 0}
                                            onChange={(evt) => {
                                                changeAArg(
                                                    i,
                                                    "scale_y",
                                                    evt.target.value
                                                );
                                            }}
                                        />
                                    </p>
                                </div>
                                <div>
                                    <p>movements:</p>
                                    <ul>
                                        {img.movements.map((movement, j) => (
                                            <li key={j}>
                                                <div className="img-data">
                                                    <p>phase {j}:</p>
                                                    <p>
                                                        type:
                                                        <input
                                                            type="text"
                                                            value={
                                                                movement.type ||
                                                                ""
                                                            }
                                                            onChange={(evt) => {
                                                                changeMov(
                                                                    i,
                                                                    j,
                                                                    "type",
                                                                    evt.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </p>
                                                    <div>
                                                        {movement.type ===
                                                            "zoom" && (
                                                            <p>
                                                                in:
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        !!movement.in
                                                                    }
                                                                    onClick={() => {
                                                                        changeMov(
                                                                            i,
                                                                            j,
                                                                            "in",
                                                                            !movement.in
                                                                        );
                                                                    }}
                                                                />
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p>args:</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        deleteA(i);
                                    }}
                                >
                                    delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
                <p className="add-item" onClick={addA}>
                    + add image
                </p>
            </ul>
            <h2>remove:</h2>
            <ul>
                {!item?.remove || item.remove.length == 0 ? (
                    <li>no remove</li>
                ) : (
                    item.remove.map((className, i) => (
                        <li key={i}>
                            {i}:
                            <input
                                type="text"
                                value={className}
                                onChange={(evt) => {
                                    changeR(i, evt.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    deleteR(i);
                                }}
                            >
                                delete
                            </button>
                        </li>
                    ))
                )}
                <p className="add-item" onClick={addR}>
                    + add remove
                </p>
            </ul>
        </div>
    );
}
