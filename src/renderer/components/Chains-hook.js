import React, { createContext, useContext } from "react";
import useState from "react-usestateref";

const ChainsContext = createContext();
export const useChains = () => useContext(ChainsContext);

export default function ChainsProvider({ children, initialChains }) {
    const [chains, setChains, chainsRef] = useState(initialChains);
    const [chain, setChain, chainRef] = useState(null);
    const [item, setItem, itemRef] = useState(null);

    const selectChain = (id) => {
        setChain(
            chainsRef.current.find((chain) => {
                return chain.id == id;
            })
        );
        setItem(null);
    };

    const addChain = (id) => {
        const newChain = { id, name: id, items: [], next: {} };
        setChains(chainsRef.current.concat([newChain]));
    };

    const deleteChain = (id) => {
        setChains((chs) => chs.filter((ch) => ch.id !== id));
        setChain(
            chainsRef.current.find((chain) => {
                return chain.id == chainRef.id;
            })
        );
    };

    const updateChain = (patch) => {
        const newChain = { ...chainRef.current, ...patch };
        setChain(newChain);
        const newChains = chainsRef.current.map((c) => {
            return c.id == newChain.id ? newChain : c;
        });
        setChains(newChains);
    };

    const selectItem = (idx) => {
        setItem(chainRef.current.items[idx]);
    };

    const addItem = () => {
        const newItems = chainRef.current.items.concat([{ type: "none" }]);
        updateChain({ items: newItems });
    };

    const updateItem = (patch) => {
        const newItem = { ...itemRef.current, ...patch };
        const newItems = chainRef.current.items.map((item) =>
            item !== itemRef.current ? item : newItem
        );
        setItem(newItem);
        updateChain({ items: newItems });
    };
    const deleteItem = () => {
        const newItems = chainRef.current.items.filter(
            (item) => item !== itemRef.current
        );
        setItem(null);
        updateChain({ items: newItems });
    };

    return (
        <ChainsContext.Provider
            value={{
                chains,
                chain,
                item,
                setChains,
                selectChain,
                addChain,
                setChain,
                updateChain,
                deleteChain,
                selectItem,
                addItem,
                updateItem,
                deleteItem,
            }}
        >
            {children}
        </ChainsContext.Provider>
    );
}
