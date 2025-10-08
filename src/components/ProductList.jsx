// src/components/ProductList.jsx
import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard.jsx";
import Pagination from "./Pagination.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ProductList({ products = [], pageSize = 12 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, page, pageSize]);

  if (!products.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {current.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
