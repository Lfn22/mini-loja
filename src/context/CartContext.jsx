// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Criando o contexto
const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [historico, setHistorico] = useState([]);

  // 🔄 Carregar histórico salvo (para não sumir ao recarregar a página)
  useEffect(() => {
    const saved = localStorage.getItem("historico");
    if (saved) {
      setHistorico(JSON.parse(saved));
    }
  }, []);

  // 💾 Salvar histórico sempre que ele muda
  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

  const addToCart = (product) => setCartItems((prev) => [...prev, product]);

  const removeFromCart = (productId) =>
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

  const clearCart = () => setCartItems([]);

  // 🧾 Checkout agora salva o pedido no histórico
  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const novoPedido = {
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
      ),
      date: new Date(),
    };

    setHistorico((prev) => [...prev, novoPedido]);
    alert("Compra finalizada com sucesso!");
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        historico,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado para usar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
