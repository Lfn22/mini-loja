import React from 'react';
import { useCart } from '@/context/CartContext.jsx';

/**
 * Exibe o conteúdo do carrinho.  Permite ajustar quantidades,
 * remover itens e finalizar a compra.  O total é calculado
 * dinamicamente com base nas quantidades e preços.
 */
export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    checkout,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
        <p>Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex-1">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <div className="w-16 text-right">
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: R$ {total.toFixed(2)}
        </p>
        <button
          onClick={checkout}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}