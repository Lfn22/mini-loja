import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import { AuthProvider } from '@/context/AuthContext.jsx';
import { CartProvider } from '@/context/CartContext.jsx';
import '@/index.css';

// Ponto de entrada da aplicação.  O AuthProvider e CartProvider
// englobam a árvore de componentes para disponibilizar autenticação
// e carrinho globalmente.  O arquivo index.css importa Tailwind.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);