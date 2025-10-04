import React from "react";

function HistoricoPedidos({ pedidos }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Histórico de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido realizado ainda.</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border rounded p-4 mb-4 bg-white shadow"
          >
            <p className="font-bold">Pedido #{pedido.id}</p>
            <p>Cliente: {pedido.cliente.nome}</p>
            <p>Email: {pedido.cliente.email}</p>
            <p>Endereço: {pedido.cliente.endereco}</p>
            <p>Data: {pedido.data}</p>
            <ul className="list-disc ml-6">
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.title} x {item.qtd}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoricoPedidos;
