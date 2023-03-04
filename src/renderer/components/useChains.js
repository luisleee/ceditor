import { useCallback } from "react";
import useState from "react-usestateref";

export default function useChains(initChains) {
    const [chains, setChains, chainsRef] = useState(initChains);
    const [chain, setChain, chainRef] = useState(null);
    const [item, setItem, itemRef] = useState(null);

    const selectChain = useCallback((id) => {
        setChain(
            chainsRef.current.find((chain) => {
                return chain.id == id;
            })
        );
        setItem(null);
    }, []);
    const addChain = useCallback((id) => {
        setChains(chainsRef.current.concat([{ id, items: [] }]));
    }, []);

    const updateChain = useCallback((newChain) => {
        setChain(newChain);
        const newChains = chainsRef.current.map((c) => {
            return c.id == newChain.id ? newChain : c;
        });
        setChains(newChains);
    }, []);

    const selectItem = useCallback((idx) => {
        setItem(chainRef.current.items[idx]);
    }, []);

    const addItem = useCallback(() => {
        const newItems = chainRef.current.items.concat([{ type: "none" }]);
        updateChain({ ...chainRef.current, items: newItems });
    }, []);

    return [chains, chain, item, selectChain, addChain, selectItem, addItem];
}
