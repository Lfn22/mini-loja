import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onCartToggle }) {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">
            Mini Loja
          </Link>
          <Link to="/" className="hover:underline">
            Produtos
          </Link>
          <Link to="/historico" className="hover:underline">
            Histórico
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="bg-white text-blue-700 px-3 py-1 rounded">
                Olá, {user.name || user.username}
              </span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-white text-blue-700 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          )}
          <button
            onClick={onCartToggle}
            className="px-3 py-1 bg-white text-blue-700 rounded hover:bg-gray-100"
            aria-label="Ver carrinho"
          >
            🛒 {itemCount}
          </button>
        </div>
      </div>
    </header>
  );
}
