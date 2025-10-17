import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getItem, setItem } from "@/services/storageServices";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Carrinho vazio!");

    const orders = getItem("orders") || [];
    const newOrder = {
      id: orders.length + 1,
      user: user?.name,
      date: new Date(),
      items: cart,
    };
    setItem("orders", [...orders, newOrder]);
    clearCart();
    alert("Compra finalizada com sucesso!");
  };

  if (cart.length === 0) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Resumo da Compra</h2>
      <ul className="text-gray-700 mb-4">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity}x R${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mb-4">
        Total: R$ {total.toFixed(2)}
      </p>
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
