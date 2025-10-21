import React from 'react';

/**
 * Componente simples de paginação.  Calcula o número total de páginas
 * com base na quantidade total de itens e itens por página.  As
 * páginas são exibidas como botões e quando clicadas atualizam
 * a página atual através da função de callback `setCurrentPage`.
 */
export default function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          aria-label={`Ir para a página ${page}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}