// src/components/ProductCard.jsx
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-4"
      />
      <h3 className="font-bold">{product.title}</h3>
      <p className="text-gray-600">{product.price.toFixed(2)} R$</p>
      <button
        onClick={onAddToCart}
        className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
