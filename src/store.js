import React, { useReducer, createContext } from "react";
import {initialState, appReducer} from "./reducers";

const store = createContext(initialState);
const Provider = store.Provider;

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, ContextProvider };
