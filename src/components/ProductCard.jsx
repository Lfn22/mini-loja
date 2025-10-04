import React from "react";

function ProductCard({ produto, adicionarAoCarrinho }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={produto.image}
        alt={produto.title}
        className="h-40 object-contain mb-4"
      />
      <h2 className="font-bold text-lg mb-2">{produto.title}</h2>
      <p className="text-gray-600 mb-2">{produto.category}</p>
      <p className="text-green-600 font-semibold">${produto.price.toFixed(2)}</p>
      <button
        onClick={() => adicionarAoCarrinho(produto)}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-auto"
      >
        Comprar
      </button>
    </div>
  );
}

export default ProductCard;
