import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-4">
      <button 
        onClick={() => setPage(p => Math.max(1, p-1))} 
        disabled={page === 1} 
        className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
      >
        ◀
      </button>
      <div>Page {page} / {totalPages}</div>
      <button 
        onClick={() => setPage(p => Math.min(totalPages, p+1))} 
        disabled={page === totalPages} 
        className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
      >
        ▶
      </button>
    </div>
  );
}
