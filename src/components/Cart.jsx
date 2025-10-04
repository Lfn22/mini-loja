import React from "react";

function Cart({ carrinho, setCarrinho, mostrar, setMostrar }) {
  const aumentarQtd = (id) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id ? { ...item, qtd: item.qtd + 1 } : item
      )
    );
  };

  const diminuirQtd = (id) => {
    setCarrinho(
      carrinho
        .map((item) =>
          item.id === id ? { ...item, qtd: item.qtd - 1 } : item
        )
        .filter((item) => item.qtd > 0)
    );
  };

  const total = carrinho.reduce((acc, item) => acc + item.price * item.qtd, 0);

  return (
    <>
      {/* Fundo semi-transparente em mobile */}
      {mostrar && (
        <div
          onClick={() => setMostrar(false)}
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-4 z-20 transform transition-transform duration-300
          ${mostrar ? "translate-x-0" : "translate-x-full"} md:relative md:translate-x-0 md:w-80`}
      >
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          carrinho.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title.slice(0, 15)}...</span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => diminuirQtd(item.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  -
                </button>
                <span>{item.qtd}</span>
                <button
                  onClick={() => aumentarQtd(item.id)}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
        <hr className="my-2" />
        <p className="font-bold">Total: ${total.toFixed(2)}</p>
      </aside>
    </>
  );
}

export default Cart;
