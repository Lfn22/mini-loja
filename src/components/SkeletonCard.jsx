import React from 'react';

/**
 * Skeleton loader para exibir o layout de um card enquanto os
 * produtos estão sendo carregados da API.  A animação pulse é
 * fornecida pelo Tailwind CSS.
 */
export default function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse h-64">
      <div className="bg-gray-300 h-40 mb-4 rounded" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
}