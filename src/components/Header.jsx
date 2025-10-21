import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useCart } from '@/context/CartContext.jsx';

/**
 * Cabeçalho fixo com a marca da aplicação e navegação.  Exibe o
 * número de itens no carrinho e permite sair (logout) se o usuário
 * estiver autenticado.
 */
export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Mini Loja</Link>
      </h1>
      {user && (
        <nav className="flex items-center gap-4">
          <Link to="/historico" className="hover:underline">
            Histórico
          </Link>
          <Link to="/cart" className="relative hover:underline">
            Carrinho
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={logout}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Sair
          </button>
        </nav>
      )}
    </header>
  );
}