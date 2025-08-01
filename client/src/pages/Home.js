import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner, { ProductSkeleton } from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Home = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductos({ limit: 6, activo: true, enStock: true });
      if (response.success) {
        setFeaturedProducts(response.productos);
      }
    } catch (error) {
      console.error('Error cargando productos destacados:', error);
      toast.error('Error cargando productos destacados');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D2691E;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%238B4513;stop-opacity:0.9" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/><circle cx="200" cy="150" r="3" fill="%23F4A460" opacity="0.6"/><circle cx="800" cy="200" r="2" fill="%23F4A460" opacity="0.4"/><circle cx="1000" cy="400" r="4" fill="%23F4A460" opacity="0.5"/><circle cx="300" cy="600" r="2" fill="%23F4A460" opacity="0.7"/><circle cx="600" cy="700" r="3" fill="%23F4A460" opacity="0.3"/></svg>')`
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg animate-fadeInUp">
              Bienvenido a
              <span className="block text-amber-300">Crepes & Coffee</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Disfruta de los mejores crepes artesanales y café de especialidad en un ambiente único y acogedor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/productos" 
                className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <i className="fas fa-utensils mr-2"></i>
                Ver Menú
              </Link>
              {!user && (
                <Link 
                  to="/login" 
                  className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-amber-700 shadow-xl"
                >
                  <i className="fas fa-user mr-2"></i>
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una experiencia única con ingredientes frescos y un servicio excepcional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                <i className="fas fa-leaf text-3xl text-amber-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredientes Frescos</h3>
              <p className="text-gray-600">
                Utilizamos solo los mejores ingredientes frescos y locales para garantizar la máxima calidad en cada bocado.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                <i className="fas fa-coffee text-3xl text-amber-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Café de Especialidad</h3>
              <p className="text-gray-600">
                Nuestro café es cuidadosamente seleccionado y tostado para ofrecerte la mejor experiencia en cada taza.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                <i className="fas fa-heart text-3xl text-amber-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hecho con Amor</h3>
              <p className="text-gray-600">
                Cada crepe es preparado con dedicación y pasión por nuestros chefs especializados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros crepes y bebidas más populares.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.imagen_url || '/api/placeholder/300/200'} 
                      alt={product.nombre}
                      className="product-image group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Imagen no disponible</text></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {product.nombre}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-700">
                        ${product.precio.toFixed(2)}
                      </span>
                      <div className="flex space-x-2">
                        <Link 
                          to={`/producto/${product.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          Ver
                        </Link>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-primary btn-sm"
                          disabled={!user || product.stock === 0}
                        >
                          <i className="fas fa-cart-plus mr-1"></i>
                          {product.stock === 0 ? 'Agotado' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/productos" 
              className="btn btn-primary btn-lg"
            >
              Ver Todos los Productos
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Listo para disfrutar?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y descubre por qué somos el lugar favorito para crepes y café.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/productos" 
              className="btn btn-lg bg-white text-amber-700 hover:bg-gray-100 shadow-xl"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Hacer Pedido
            </Link>
            <a 
              href="#contacto" 
              className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-amber-700 shadow-xl"
            >
              <i className="fas fa-phone mr-2"></i>
              Contactanos
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-700 mb-2">500+</div>
              <div className="text-gray-600">Clientes Felices</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-700 mb-2">50+</div>
              <div className="text-gray-600">Variedades de Crepes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-700 mb-2">3</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
              <div className="text-gray-600">Satisfacción Garantizada</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;