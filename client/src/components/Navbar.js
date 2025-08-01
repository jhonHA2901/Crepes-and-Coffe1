import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from './LoadingSpinner';

const Navbar = () => {
  const { user, isAdmin, login, logout, loading } = useAuth();
  const { getTotalItems, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = getTotalItems();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors"
            onClick={closeMenus}
          >
            <i className="fas fa-coffee text-2xl"></i>
            <span className="text-xl font-bold">Crepes & Coffee</span>
          </Link>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`nav-link ${isActive('/productos') ? 'active' : ''}`}
            >
              Productos
            </Link>
            <Link 
              to="/contacto" 
              className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
            >
              Contacto
            </Link>
            <Link 
              to="/nosotros" 
              className={`nav-link ${isActive('/nosotros') ? 'active' : ''}`}
            >
              Nosotros
            </Link>
            <Link 
              to="/testimonios" 
              className={`nav-link ${isActive('/testimonios') ? 'active' : ''}`}
            >
              Testimonios
            </Link>
            <Link 
              to="/sostenibilidad" 
              className={`nav-link ${isActive('/sostenibilidad') ? 'active' : ''}`}
            >
              Sostenibilidad
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
            >
              Blog
            </Link>
            <Link 
              to="/eventos" 
              className={`nav-link ${isActive('/eventos') ? 'active' : ''}`}
            >
              Eventos
            </Link>
            
            {user && (
              <Link 
                to="/pedidos" 
                className={`nav-link ${isActive('/pedidos') ? 'active' : ''}`}
              >
                Mis Pedidos
              </Link>
            )}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              >
                <i className="fas fa-cog mr-1"></i>
                Admin
              </Link>
            )}
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            {user && (
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-amber-700 transition-colors"
                title="Carrito de compras"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {totalItems > 0 && (
                  <span className="cart-badge">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            )}

            {/* Usuario */}
            {loading ? (
              <div className="w-8 h-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.nombre?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-gray-700 font-medium">
                    {user.nombre}
                  </span>
                  <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                </button>

                {/* Menú desplegable del usuario */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={closeMenus}
                    >
                      <i className="fas fa-user mr-2"></i>
                      Mi Perfil
                    </Link>
                    <Link
                      to="/pedidos"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={closeMenus}
                    >
                      <i className="fas fa-receipt mr-2"></i>
                      Mis Pedidos
                    </Link>
                    {isAdmin && (
                      <>
                        <hr className="my-2" />
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={closeMenus}
                        >
                          <i className="fas fa-cog mr-2"></i>
                          Panel Admin
                        </Link>
                      </>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn btn-primary"
                >
                  <i className="fab fa-google mr-2"></i>
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="btn btn-secondary"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Registrarse
                </Link>
              </div>
            )}

            {/* Botón menú móvil */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-amber-700 transition-colors"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-home mr-2"></i>
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className={`nav-link ${isActive('/productos') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-utensils mr-2"></i>
                Productos
              </Link>
              <Link 
                to="/contacto" 
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-envelope mr-2"></i>
                Contacto
              </Link>
              <Link 
                to="/nosotros" 
                className={`nav-link ${isActive('/nosotros') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-users mr-2"></i>
                Nosotros
              </Link>
              <Link 
                to="/testimonios" 
                className={`nav-link ${isActive('/testimonios') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-star mr-2"></i>
                Testimonios
              </Link>
              <Link 
                to="/sostenibilidad" 
                className={`nav-link ${isActive('/sostenibilidad') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-leaf mr-2"></i>
                Sostenibilidad
              </Link>
              <Link 
                to="/blog" 
                className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-newspaper mr-2"></i>
                Blog
              </Link>
              <Link 
                to="/eventos" 
                className={`nav-link ${isActive('/eventos') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Eventos
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/pedidos" 
                    className={`nav-link ${isActive('/pedidos') ? 'active' : ''}`}
                    onClick={closeMenus}
                  >
                    <i className="fas fa-receipt mr-2"></i>
                    Mis Pedidos
                  </Link>
                  <Link 
                    to="/perfil" 
                    className={`nav-link ${isActive('/perfil') ? 'active' : ''}`}
                    onClick={closeMenus}
                  >
                    <i className="fas fa-user mr-2"></i>
                    Mi Perfil
                  </Link>
                </>
              )}
              
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                  onClick={closeMenus}
                >
                  <i className="fas fa-cog mr-2"></i>
                  Panel Admin
                </Link>
              )}
              
              {!user && (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="btn btn-primary w-full"
                  >
                    <i className="fab fa-google mr-2"></i>
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    onClick={closeMenus}
                    className="btn btn-secondary w-full"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar menús */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={closeMenus}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;