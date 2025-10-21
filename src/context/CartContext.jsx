import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  getLocalItem,
  setLocalItem,
} from '@/services/storageServices.js';

/**
 * Estado inicial para o carrinho.  Contém uma lista de itens e
 * pedidos anteriores (histórico).  Cada item possui as propriedades
 * do produto mais um campo `quantity` representando quantas unidades
 * foram adicionadas.
 */
const initialState = {
  items: [],
  history: [],
};

/**
 * Redutor para manipular as ações do carrinho.  Mantém
 * imutabilidade retornando um novo estado a cada ação.
 */
function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      // Carregamento inicial de itens e histórico a partir do
      // localStorage.
      return {
        items: action.payload.items || [],
        history: action.payload.history || [],
      };
    }
    case 'ADD': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        // Se o item já existe, incrementa a quantidade
        const newItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { ...state, items: newItems };
      }
      // Para um item novo, inicializa a quantidade em 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        // Remove o item quando a quantidade é zero ou negativa
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      return { ...state, items: updatedItems };
    }
    case 'CLEAR': {
      return { ...state, items: [] };
    }
    case 'ADD_HISTORY': {
      return { ...state, history: [...state.history, action.payload] };
    }
    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // No início da aplicação carregamos dados salvos
  useEffect(() => {
    const savedItems = getLocalItem('cartItems') || [];
    const savedHistory = getLocalItem('orderHistory') || [];
    dispatch({ type: 'LOAD', payload: { items: savedItems, history: savedHistory } });
  }, []);

  // Persistir alterações do carrinho
  useEffect(() => {
    setLocalItem('cartItems', state.items);
    setLocalItem('orderHistory', state.history);
  }, [state.items, state.history]);

  // Adiciona produto ao carrinho
  const addToCart = (product) => {
    dispatch({ type: 'ADD', payload: product });
  };

  // Remove item completamente
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  // Atualiza quantidade de um item existente
  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Esvazia carrinho
  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  // Finaliza a compra: adiciona pedido ao histórico e limpa carrinho
  const checkout = () => {
    if (state.items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    // Calcula total e monta pedido
    const total = state.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0,
    );
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: state.items,
      total,
    };
    dispatch({ type: 'ADD_HISTORY', payload: order });
    dispatch({ type: 'CLEAR' });
    alert('Compra finalizada com sucesso!');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        historico: state.history,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}