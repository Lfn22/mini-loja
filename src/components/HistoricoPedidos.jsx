import React from "react";
import { useCart } from "../context/CartContext";

export default function HistoricoPedidos() {
  const { historico = [] } = useCart() || {}; // garante array

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Histórico de Pedidos
      </h2>

      {historico.length === 0 ? (
        <p className="text-center text-gray-500">
          Você ainda não realizou nenhum pedido.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {historico.map((pedido, index) => (
            <div
              key={pedido.id || index}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <h3 className="font-semibold mb-2">{pedido.name}</h3>
              <p className="text-gray-600">Quantidade: {pedido.quantity}</p>
              <p className="text-gray-600">Total: R$ {pedido.total}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(pedido.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
