import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import HistoricoPedidos from "./components/HistoricoPedidos";
import Login from "./components/Login";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [pagina, setPagina] = useState("home"); // home | checkout | historico | login
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Histórico
  useEffect(() => {
    const saved = localStorage.getItem("historico");
    if (saved) setHistorico(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

  // Sessão de usuário
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
    else localStorage.removeItem("usuario");
  }, [usuario]);

  const produtosFiltrados = produtos
    .filter((p) => p.title.toLowerCase().includes(busca.toLowerCase()));

  const adicionarAoCarrinho = (produto) => {
    const itemExiste = carrinho.find((item) => item.id === produto.id);
    if (itemExiste) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, qtd: 1 }]);
    }
  };

  const finalizarCompra = (dadosCliente) => {
    if (!usuario) {
      alert("Faça login para finalizar a compra.");
      setPagina("login");
      return;
    }
    if (carrinho.length === 0) return;

    const pedido = {
      id: historico.length + 1,
      itens: carrinho,
      cliente: dadosCliente,
      data: new Date().toLocaleString(),
    };
    setHistorico([...historico, pedido]);
    setCarrinho([]);
    setPagina("historico");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        mudarPagina={setPagina}
        carrinhoQtd={carrinho.length}
        setBusca={setBusca}
        setMostrarCarrinho={setMostrarCarrinho}
        usuario={usuario}
        setUsuario={setUsuario}
      />

      {!usuario && pagina === "login" && (
        <Login setUsuario={setUsuario} setPagina={setPagina} />
      )}

      {pagina === "home" && usuario && (
        <div className={`p-6 transition-all duration-300 ${mostrarCarrinho ? "md:mr-80" : ""}`}>
          {loading ? (
            <p className="text-center">Carregando produtos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produtosFiltrados.map((p) => (
                <ProductCard
                  key={p.id}
                  produto={p}
                  adicionarAoCarrinho={adicionarAoCarrinho}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {pagina === "checkout" && usuario && (
        <Checkout carrinho={carrinho} finalizarCompra={finalizarCompra} />
      )}

      {pagina === "historico" && usuario && <HistoricoPedidos pedidos={historico} />}

      <Cart
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        mostrar={mostrarCarrinho}
        setMostrar={setMostrarCarrinho}
      />
    </div>
  );
}

export default App;
