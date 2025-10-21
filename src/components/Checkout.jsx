import React from 'react';
import { useCart } from '@/context/CartContext.jsx';

/**
 * Página de resumo da compra.  Mostra uma lista de itens com
 * quantidades e preço total.  Quando o usuário confirma, chama a
 * função de checkout do contexto, que adiciona o pedido ao
 * histórico e limpa o carrinho.
 */
export default function Checkout() {
  const { cartItems, checkout } = useCart();
  if (cartItems.length === 0) return null;
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Resumo da Compra</h2>
      <ul className="text-gray-700 mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-1">
            {item.quantity}× {item.title} — R$ {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mb-4">
        Total: R$ {total.toFixed(2)}
      </p>
      <button
        onClick={checkout}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
      >
        Finalizar Compra
      </button>
    </div>
  );
}