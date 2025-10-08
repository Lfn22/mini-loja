import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import HistoricoPedidos from "./components/HistoricoPedidos.jsx";
import Carousel from "./components/Carousel.jsx";
import { fetchProducts } from "./services/productService.js";
import { useToast } from "./context/ToastContext.jsx";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (isMounted) setProducts(data);
      } catch {
        push("Erro ao carregar produtos", "error");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
    return () => (isMounted = false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartToggle={() => setCartVisible(!cartVisible)} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                {loading ? (
                  <div className="flex justify-center py-10 text-gray-500">
                    Carregando produtos...
                  </div>
                ) : (
                  <ProductList products={products} />
                )}
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/historico" element={<HistoricoPedidos orders={[]} />} />
        </Routes>
      </main>
      {cartVisible && <Cart />}
    </div>
  );
}
