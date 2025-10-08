// src/components/Carousel.jsx
import React, { useEffect, useState } from "react";

export default function Carousel({ products = [] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (products.length ? (i + 1) % products.length : 0)), 4000);
    return () => clearInterval(id);
  }, [products.length]);

  if (!products.length) return null;

  const p = products[idx];

  return (
    <div className="mb-6 bg-white p-4 rounded shadow flex items-center gap-4">
      <button onClick={() => setIdx((i) => (i - 1 + products.length) % products.length)} aria-label="Anterior">◀</button>
      <div className="flex items-center gap-4 flex-1">
        <img src={p.image} alt={p.title} className="h-28 object-contain" loading="lazy" />
        <div>
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-gray-600">R$ {p.price.toFixed(2)}</div>
        </div>
      </div>
      <button onClick={() => setIdx((i) => (i + 1) % products.length)} aria-label="Próximo">▶</button>
    </div>
  );
}
