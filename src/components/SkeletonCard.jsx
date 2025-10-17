// src/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse h-64">
      <div className="bg-gray-300 h-40 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
