// src/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full animate-pulse">
      <div className="h-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
      <div className="h-8 bg-gray-200 rounded mt-auto w-32"></div>
    </div>
  );
}
