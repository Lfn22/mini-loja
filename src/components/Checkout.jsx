import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Checkout({ onConfirm }) {
  const { items, clear, total } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", address: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return alert("Preencha todos os campos");
    onConfirm?.({ items, customer: form, total, user });
    clear();
  }

  if (!items.length) return <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">Seu carrinho está vazio.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="w-full p-2 border rounded" />
        <input name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Endereço" className="w-full p-2 border rounded" />
        <div className="text-right font-bold">Total: R$ {total.toFixed(2)}</div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Confirmar Pedido</button>
      </form>
    </div>
  );
}
