import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsPage from './pages/Products';
// import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import BuyerDashboard from './pages/BuyerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import ProductDetail from './pages/ProductDetail';
import LoveAndPetalsHomepage from './pages/Love';
import AuthForm from './pages/AuthForm';
import Home from './pages/frontpage/bazarxfrontPage';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<AuthForm />} />

          {/* Buyer-only */}
          <Route
            path="/buyer/*"
            element={
              <ProtectedRoute role="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Vendor-only */}
          <Route
            path="/vendor/*"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          

          {/* catch‑all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
