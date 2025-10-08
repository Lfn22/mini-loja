import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, changeQty, remove, total } = useCart();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🛒 Carrinho</h2>
        <div>
          <Link to="/" className="text-blue-600 hover:underline mr-4">Continuar comprando</Link>
          <Link to="/checkout" className="bg-green-500 text-white px-3 py-1 rounded">Finalizar</Link>
        </div>
      </div>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-600">R$ {it.price.toFixed(2)} x {it.qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQty(it.id, -1)} className="px-2 bg-gray-200 rounded">-</button>
                  <button onClick={() => changeQty(it.id, 1)} className="px-2 bg-gray-200 rounded">+</button>
                  <button onClick={() => remove(it.id)} className="px-2 bg-red-500 text-white rounded">x</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold">Total: R$ {total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
