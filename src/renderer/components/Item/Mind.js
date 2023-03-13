import React, { useEffect } from "react";
import { useChains } from "../Chains-hook";

export default function Mind() {
    const { item, updateItem, itemRef } = useChains();
    useEffect(() => {
        if (!item.answers) {
            updateItem({ ...itemRef.current, answers: [] });
            return;
        }
    }, [item]);

    const changeAns = (i, field, val) => {
        updateItem({
            ...itemRef.current,
            answers: itemRef.current.answers.map((ans, id) =>
                id !== i
                    ? ans
                    : {
                          ...ans,
                          [field]: val,
                      }
            ),
        });
    };

    const deleteAns = (i) => {
        updateItem({
            ...itemRef.current,
            answers: itemRef.current.answers.filter((ans, id) => id !== i),
        });
    };

    const addAns = () => {
        updateItem({
            ...itemRef.current,
            answers: [
                ...itemRef.current.answers,
                {
                    keywords: "",
                    ans: "",
                },
            ],
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
            <p>answers:</p>
            <ul>
                {!item?.answers || item.answers.length == 0 ? (
                    <li>no answer</li>
                ) : (
                    item.answers.map((answer, i) => (
                        <li key={i}>
                            {i}
                            keywords:
                            <input
                                type="text"
                                value={answer.keywords}
                                onChange={(evt) => {
                                    changeAns(i, "keywords", evt.target.value);
                                }}
                            />
                            answer:
                            <input
                                type="text"
                                value={answer.ans}
                                onChange={(evt) => {
                                    changeAns(i, "ans", evt.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    deleteAns(i);
                                }}
                            >
                                delete
                            </button>
                        </li>
                    ))
                )}
                <p className="add-item" onClick={addAns}>
                    + add answer
                </p>
            </ul>
            <p>
                default_answer:
                <input
                    type="text"
                    value={item.default_answer || ""}
                    onChange={(evt) => {
                        updateItem({
                            ...itemRef.current,
                            default_answer: evt.target.value,
                        });
                    }}
                />
            </p>
            <p>
                conclusion:
                <input
                    type="checkbox"
                    checked={item.conclusion || false}
                    onClick={() => {
                        updateItem({
                            ...itemRef.current,
                            conclusion: !itemRef.current.conclusion,
                        });
                    }}
                    readOnly
                />
            </p>
        </div>
    );
}
