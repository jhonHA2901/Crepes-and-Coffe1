import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contextos
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Páginas
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import MisReservas from './pages/MisReservas';
import ReservaExitosa from './pages/ReservaExitosa';
import ReservaFallida from './pages/ReservaFallida';
import ReservaPendiente from './pages/ReservaPendiente';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import PaymentMethods from './pages/PaymentMethods';
import Sustainability from './pages/Sustainability';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

// Páginas de Admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminEventos from './pages/admin/AdminEventos';
import AdminReservas from './pages/admin/AdminReservas';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <Navbar />
            
            {/* Contenido principal */}
            <main className="flex-grow">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/registro-exitoso" element={<RegisterSuccess />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/nosotros" element={<AboutUs />} />
                <Route path="/testimonios" element={<Testimonials />} />
                <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
                <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
                <Route path="/politica-cookies" element={<CookiePolicy />} />
                <Route path="/politica-envios" element={<ShippingPolicy />} />
                <Route path="/politica-reembolsos" element={<RefundPolicy />} />
                <Route path="/metodos-pago" element={<PaymentMethods />} />
                <Route path="/sostenibilidad" element={<Sustainability />} />
                <Route path="/preguntas-frecuentes" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                
                {/* Rutas protegidas */}
                <Route path="/carrito" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/pedido-exitoso" element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/pedidos" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/pedido/:id" element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                } />
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/mis-reservas" element={
                  <ProtectedRoute>
                    <MisReservas />
                  </ProtectedRoute>
                } />
                <Route path="/reserva-exitosa/:id" element={
                  <ProtectedRoute>
                    <ReservaExitosa />
                  </ProtectedRoute>
                } />
                <Route path="/reserva-fallida/:id" element={
                  <ProtectedRoute>
                    <ReservaFallida />
                  </ProtectedRoute>
                } />
                <Route path="/reserva-pendiente/:id" element={
                  <ProtectedRoute>
                    <ReservaPendiente />
                  </ProtectedRoute>
                } />
                
                {/* Rutas de administrador */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/productos" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/pedidos" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/usuarios" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />
                <Route path="/admin/eventos" element={
                  <AdminRoute>
                    <AdminEventos />
                  </AdminRoute>
                } />
                <Route path="/admin/reservas" element={
                  <AdminRoute>
                    <AdminReservas />
                  </AdminRoute>
                } />
                
                {/* Página 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Toast notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="toast-custom"
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;