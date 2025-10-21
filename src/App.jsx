import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import Header from '@/components/Header.jsx';

// Lazy loaded components to split bundles and improve performance
const ProductList = lazy(() => import('@/components/ProductList.jsx'));
const Cart = lazy(() => import('@/components/Cart.jsx'));
const Checkout = lazy(() => import('@/components/Checkout.jsx'));
const HistoricoPedidos = lazy(() => import('@/components/HistoricoPedidos.jsx'));
const Login = lazy(() => import('@/components/Login.jsx'));
const Carousel = lazy(() => import('@/components/Carousel.jsx'));
const Register = lazy(() => import('@/components/Register.jsx'));

// Error boundary class to catch rendering errors in children
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1 className="text-center mt-10">Ocorreu um erro ao carregar a página.</h1>;
    }
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
              <Route path="/register" element={<Register />} />
              {user ? (
                <>
                  <Route
                    path="/"
                    element={(
                      <>
                        <Carousel />
                        <ProductList />
                      </>
                    )}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/historico" element={<HistoricoPedidos />} />
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
