import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  user: {
    email: "",
    password: ""
  }
};

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SetUser":
      return { ...state, user: action.user };
    default:
      console.log("default dispatch action detected");
      return state;
  }
};

export function StoreProvider({ ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]} {...props} />;
}

export const useStore = () => useContext(StoreContext);
