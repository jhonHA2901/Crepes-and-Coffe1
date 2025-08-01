import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-coffee text-2xl text-amber-400"></i>
              <span className="text-xl font-bold">Crepes & Coffee</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Disfruta de los mejores crepes y café artesanal en un ambiente acogedor. 
              Ingredientes frescos y sabores únicos que harán de tu experiencia algo inolvidable.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/pedidos" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                   to="/nosotros" 
                   className="text-gray-300 hover:text-white transition-colors"
                 >
                   Acerca de Nosotros
                 </Link>
               </li>
               <li>
                  <Link 
                   to="/testimonios" 
                   className="text-gray-300 hover:text-white transition-colors"
                 >
                   Testimonios
                 </Link>
               </li>
               <li>
                <Link 
                  to="/preguntas-frecuentes" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link 
                  to="/sostenibilidad" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sostenibilidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/eventos" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-amber-400"></i>
                <span className="text-gray-300 text-sm">
                  Av. Principal 123<br />
                  Ciudad, País
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-amber-400"></i>
                <span className="text-gray-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-amber-400"></i>
                <span className="text-gray-300 text-sm">
                  info@crepesandcoffee.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-amber-400"></i>
                <div className="text-gray-300 text-sm">
                  <div>Lun - Vie: 7:00 AM - 10:00 PM</div>
                  <div>Sáb - Dom: 8:00 AM - 11:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Crepes & Coffee. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap space-x-4 space-y-2 sm:space-y-0 text-sm">
              <Link 
                to="/politica-privacidad" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link 
                to="/terminos-condiciones" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/politica-cookies" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Cookies
              </Link>
              <Link 
                to="/politica-envios" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Envíos y Devoluciones
              </Link>
              <Link 
                to="/politica-reembolsos" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Reembolsos
              </Link>
              <Link 
                to="/metodos-pago" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Métodos de Pago
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de newsletter */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-1">
                Suscríbete a nuestro newsletter
              </h4>
              <p className="text-gray-400 text-sm">
                Recibe ofertas especiales y novedades directamente en tu correo
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-2 md:mb-0">
              Métodos de pago aceptados:
            </div>
            <div className="flex items-center space-x-4">
              <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
              <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
              <i className="fab fa-cc-amex text-2xl text-blue-400"></i>
              <i className="fas fa-credit-card text-2xl text-gray-400"></i>
              <div className="text-amber-400 font-semibold text-sm">
                MercadoPago
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;