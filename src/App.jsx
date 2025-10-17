import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

// Lazy load
const ProductList = lazy(() => import("@/components/ProductList"));
const Cart = lazy(() => import("@/components/Cart"));
const Checkout = lazy(() => import("@/components/Checkout"));
const HistoricoPedidos = lazy(() => import("@/components/HistoricoPedidos"));
const Login = lazy(() => import("@/components/Login"));

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) return <h1 className="text-center mt-10">Ocorreu um erro ao carregar a página.</h1>;
    return this.props.children;
  }
}

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<p className="text-center mt-10">Carregando...</p>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              {user ? (
                <>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/historico" element={<HistoricoPedidos />} />
                  <Route path="/cart" element={<Cart />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
              )}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}
