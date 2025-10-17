// src/components/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, checkout } = useCart();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carrinho</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remover
              </button>
            </div>
          ))}

          <button
            onClick={checkout}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
