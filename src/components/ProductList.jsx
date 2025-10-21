import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard.jsx';
import Pagination from '@/components/Pagination.jsx';
import SkeletonCard from '@/components/SkeletonCard.jsx';
import { fetchProducts } from '@/services/api.js';
import { useCart } from '@/context/CartContext.jsx';

/**
 * Lista de produtos com paginação e loading state.  Busca dados da API
 * na montagem do componente e exibe um skeleton enquanto a resposta
 * não chega.  Permite adicionar produtos ao carrinho através do
 * contexto.
 */
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const data = await fetchProducts();
      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Pega um pedaço do array de produtos com base na página atual
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Nossos Produtos
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}