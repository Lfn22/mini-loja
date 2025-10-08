import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function HistoricoPedidos({ orders = [] }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Histórico</h2>
        <p>Faça login para ver seu histórico de pedidos.</p>
      </div>
    );
  }

  const myOrders = orders.filter(o => o.user === user.username);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">📦 Seu Histórico</h2>
      {myOrders.length === 0 ? <p>Nenhum pedido registrado.</p> : myOrders.slice().reverse().map(o => (
        <div key={o.id} className="border rounded p-3 mb-3 bg-gray-50">
          <div className="flex justify-between">
            <div>
              <strong>Pedido #{o.id}</strong>
              <div className="text-sm text-gray-600">{o.date}</div>
            </div>
            <div className="font-bold">R$ {o.total.toFixed(2)}</div>
          </div>
          <ul className="mt-2 ml-4 list-disc">
            {o.items.map(it => <li key={it.id}>{it.title} x {it.qty} — R$ {(it.price*it.qty).toFixed(2)}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
