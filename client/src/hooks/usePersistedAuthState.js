import { useState } from "react";

export default function usePersistedAuthState(initialState, key) {
    const [state, setState] = useState(() => {
        const storageData = localStorage.getItem(key);

        if (!storageData) {
            return initialState;
        }

        const data = JSON.parse(storageData);

        return data;
    });

    const setPersistedAuthState = (input) => {
        let value = input; 
        
        if (typeof input === 'function') {
            value = input(state);
        }

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    const clearPersistedAuthState = () => {
        localStorage.removeItem(key);
    };

    return {
        state,
        setPersistedAuthState,
        clearPersistedAuthState
    };
}
