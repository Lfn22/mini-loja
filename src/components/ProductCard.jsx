// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const toast = useToast();
  const isPromo = product.price < 50;

  function handleAdd() {
    add(product);
    toast.push("Produto adicionado ao carrinho");
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full overflow-hidden">
      <div className="relative flex justify-center items-center h-48 bg-gray-50 p-4">
        {isPromo && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Promo
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            aria-label={`Adicionar ${product.title} ao carrinho`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
