import React from 'react';

/**
 * Exibe um produto individual.  Recebe o objeto do produto e uma
 * função de callback para adicionar ao carrinho.  A imagem e o nome
 * são limitados em altura para manter o layout consistente.
 */
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
      <h3 className="text-md font-semibold mb-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-blue-600 font-bold mb-4">R$ {product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}