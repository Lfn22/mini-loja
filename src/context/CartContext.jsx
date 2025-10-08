import React, { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import { getItem, setItem } from "../services/storageServices.js";

const CartContext = createContext();

const initialState = {
  items: Array.isArray(getItem("cart")) ? getItem("cart") : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const exists = state.items.find((it) => it.id === p.id);
      const updated = exists
        ? state.items.map((it) => (it.id === p.id ? { ...it, qty: it.qty + 1 } : it))
        : [...state.items, { ...p, qty: 1 }];
      return { ...state, items: updated };
    }
    case "CHANGE_QTY": {
      const { id, delta } = action.payload;
      return {
        ...state,
        items: state.items
          .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
          .filter((it) => it.qty > 0),
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((it) => it.id !== action.payload) };
    case "CLEAR":
      return { ...state, items: [] };
    case "SET":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setItem("cart", state.items);
  }, [state.items]);

  const add = (product) => dispatch({ type: "ADD", payload: product });
  const changeQty = (id, delta) => dispatch({ type: "CHANGE_QTY", payload: { id, delta } });
  const remove = (id) => dispatch({ type: "REMOVE", payload: id });
  const clear = () => dispatch({ type: "CLEAR" });
  const set = (items) => dispatch({ type: "SET", payload: items });

  const total = useMemo(() => state.items.reduce((s, it) => s + it.price * it.qty, 0), [state.items]);
  const itemCount = useMemo(() => state.items.reduce((s, it) => s + it.qty, 0), [state.items]);

  return (
    <CartContext.Provider value={{ items: state.items, add, changeQty, remove, clear, set, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
