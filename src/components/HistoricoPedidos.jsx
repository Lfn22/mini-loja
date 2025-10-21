import React from 'react';
import { useCart } from '@/context/CartContext.jsx';

/**
 * Exibe uma lista de pedidos realizados.  Cada pedido mostra a data
 * da compra, o total e um resumo dos itens adquiridos.  Se não
 * houver histórico, informa ao usuário.
 */
export default function HistoricoPedidos() {
  const { historico = [] } = useCart();
  if (historico.length === 0) {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Histórico de Pedidos
        </h2>
        <p className="text-center text-gray-500">
          Você ainda não realizou nenhum pedido.
        </p>
      </div>
    );
  }
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Histórico de Pedidos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {historico.map((pedido) => (
          <div key={pedido.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold mb-2">
              Pedido #{pedido.id}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {new Date(pedido.date).toLocaleDateString()}
            </p>
            <ul className="text-gray-700 mb-2">
              {pedido.items.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.quantity}× {item.title}
                </li>
              ))}
            </ul>
            <p className="text-blue-600 font-semibold">
              Total: R$ {pedido.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}