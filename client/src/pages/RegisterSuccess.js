import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterSuccess = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario, redirigir al registro
  useEffect(() => {
    if (!loading && !user) {
      navigate('/registro', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando..." />
      </div>
    );
  }

  // Si no hay usuario después de cargar, no mostrar nada (se redirigirá)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Icono de éxito */}
        <div className="mb-8 animate-fadeInDown">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-check text-4xl text-green-600"></i>
          </div>
        </div>
        
        {/* Mensaje de éxito */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
          ¡Registro Exitoso!
        </h1>
        <p className="text-gray-600 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Bienvenido a Crepes & Coffee, {user.nombre}. Tu cuenta ha sido creada correctamente.
        </p>
        
        {/* Información del usuario */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center mb-4">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.nombre} 
                className="w-16 h-16 rounded-full border-2 border-amber-500"
              />
            ) : (
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xl font-bold">
                {user.nombre?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.nombre}
          </h3>
          <p className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Link 
            to="/productos" 
            className="btn btn-primary"
          >
            <i className="fas fa-utensils mr-2"></i>
            Explorar productos
          </Link>
          
          <Link 
            to="/perfil" 
            className="btn btn-secondary"
          >
            <i className="fas fa-user-cog mr-2"></i>
            Completar perfil
          </Link>
        </div>
        
        {/* Beneficios */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md text-left animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            ¿Qué puedes hacer ahora?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-shopping-cart text-green-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Realizar pedidos</h4>
                <p className="text-sm text-gray-600">Explora nuestro menú y realiza pedidos fácilmente</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user-edit text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Personaliza tu perfil</h4>
                <p className="text-sm text-gray-600">Completa tu información para una mejor experiencia</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-history text-purple-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Historial de pedidos</h4>
                <p className="text-sm text-gray-600">Accede a tu historial de pedidos en cualquier momento</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-star text-amber-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Ofertas exclusivas</h4>
                <p className="text-sm text-gray-600">Recibe promociones y descuentos especiales</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Decoración de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-amber-200 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default RegisterSuccess;