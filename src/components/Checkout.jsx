import React, { useState } from "react";

function Checkout({ carrinho, finalizarCompra }) {
  const [form, setForm] = useState({ nome: "", email: "", endereco: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    finalizarCompra(form);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Finalizar Compra</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Confirmar Pedido
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
