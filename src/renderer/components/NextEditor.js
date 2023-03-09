import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useChains } from "./Chains-hook";
export default function NextEditor() {
    const [nexts, setNexts] = useState([]);
    const { chains, chain, setChain, updateChain } = useChains();

    useEffect(() => {
        const nexts = Object.entries(chain.next).map(([id, { options }]) => {
            const ch = chains.find((ch) => ch.id == id);
            return { id, name: ch.name, options: Object.entries(options) };
        });
        setNexts(nexts);
    }, [chain]);

    const deleteProp = (prop, { [prop]: _, ...rest }) => rest;

    const addOption = (id, name) => {
        setChain((ch) => ({
            ...ch,
            next: {
                ...ch.next,
                [id]: {
                    options: { ...ch.next[id].options, [name]: 0 },
                },
            },
        }));
        updateChain({});
    };

    const changeValue = (id, name, value) => {
        setChain((ch) => ({
            ...ch,
            next: {
                ...ch.next,
                [id]: {
                    options: { ...ch.next[id].options, [name]: value },
                },
            },
        }));
        updateChain({});
    };

    const deleteValue = (id, name) => {
        setChain((ch) => ({
            ...ch,
            next: {
                ...ch.next,
                [id]: {
                    options: deleteProp(name, ch.next[id].options),
                },
            },
        }));
        updateChain({});
    };

    return (
        <div>
            <h1>Next</h1>
            {Object.keys(nexts).length === 0 ? (
                <p>no next</p>
            ) : (
                nexts.map((next) => (
                    <div key={next.id} className="next-requirements">
                        <h2>{next.name}:</h2>
                        <p>Requirements:</p>
                        <p>Options Required:</p>
                        <ul>
                            {next.options.length == 0 ? (
                                <li>no requirement</li>
                            ) : (
                                next.options.map(([name, value]) => (
                                    <li key={name}>
                                        {name}:
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(evt) => {
                                                changeValue(
                                                    next.id,
                                                    name,
                                                    evt.target.value
                                                );
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                deleteValue(next.id, name);
                                            }}
                                        >
                                            delete
                                        </button>
                                    </li>
                                ))
                            )}

                            <form
                                className="add-item"
                                onSubmit={(evt) => {
                                    evt.preventDefault();
                                    const name = evt.target[0].value;
                                    addOption(next.id, name);
                                    evt.target[0].value = "";
                                }}
                            >
                                <input type="text" name="name" />
                                <input
                                    type="submit"
                                    value="+ add requirement"
                                />
                            </form>
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}
