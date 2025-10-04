import React from "react";

function Header({ mudarPagina, carrinhoQtd, setBusca, setMostrarCarrinho, usuario, setUsuario }) {
  return (
    <header className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <h1 className="text-2xl font-bold">Minha Loja</h1>
      <nav className="flex gap-4 items-center">
        {usuario && (
          <>
            <button onClick={() => mudarPagina("home")}>Home</button>
            <button onClick={() => mudarPagina("checkout")}>Checkout</button>
            <button onClick={() => mudarPagina("historico")}>Histórico</button>
            <button
              onClick={() => setMostrarCarrinho(prev => !prev)}
              className="bg-white text-blue-600 px-2 py-1 rounded"
            >
              🛒 {carrinhoQtd}
            </button>
            <button
              onClick={() => {
                setUsuario(null);
                alert("Logout realizado!");
              }}
            >
              Logout
            </button>
          </>
        )}
        {!usuario && (
          <button onClick={() => mudarPagina("login")}>Login</button>
        )}
        {usuario && (
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setBusca(e.target.value)}
            className="p-1 rounded text-black"
          />
        )}
      </nav>
    </header>
  );
}

export default Header;
