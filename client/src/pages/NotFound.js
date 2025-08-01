import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Icono de error */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-exclamation-triangle text-4xl text-amber-700"></i>
          </div>
        </div>
        
        {/* Mensaje de error */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="btn btn-primary"
          >
            <i className="fas fa-home mr-2"></i>
            Volver al inicio
          </Link>
          
          <Link 
            to="/productos" 
            className="btn btn-secondary"
          >
            <i className="fas fa-utensils mr-2"></i>
            Ver productos
          </Link>
        </div>
        
        {/* Sugerencias */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ¿Qué puedes hacer ahora?
          </h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span className="text-gray-600">Volver a la página de inicio y explorar nuestras ofertas</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span className="text-gray-600">Revisar nuestro menú de productos disponibles</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span className="text-gray-600">Iniciar sesión si ya tienes una cuenta</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span className="text-gray-600">Contactar con soporte si necesitas ayuda</span>
            </li>
          </ul>
        </div>
        
        {/* Contacto */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">Contacta con nosotros</a>
          </p>
        </div>
      </div>
      
      {/* Decoración de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-amber-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-amber-200 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default NotFound;