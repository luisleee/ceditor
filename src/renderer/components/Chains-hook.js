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
        setChains(chainsRef.current.concat([{ id, name: id, items: [] }]));
    };

    const deleteChain = (id) => {
        setChains((chs) => chs.filter((ch) => ch.id !== id));
        setChain(
            chainsRef.current.find((chain) => {
                return chain.id == chainRef.id;
            })
        );
    };

    const updateChain = (newChain) => {
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
        updateChain({ ...chainRef.current, items: newItems });
    };

    const updateItem = (newItem) => {
        const newItems = chainRef.current.items.map((item) =>
            item !== itemRef.current ? item : newItem
        );
        setItem(newItem);
        updateChain({ ...chainRef.current, items: newItems });
    };
    const deleteItem = () => {
        const newItems = chainRef.current.items.filter(
            (item) => item !== itemRef.current
        );
        setItem(null);
        updateChain({ ...chainRef.current, items: newItems });
    };

    return (
        <ChainsContext.Provider
            value={{
                chains,
                chain,
                item,
                chainsRef,
                chainRef,
                itemRef,
                selectChain,
                addChain,
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
