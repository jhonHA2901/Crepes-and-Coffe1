import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const OrderSuccess = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    // Si no hay usuario, redirigir al login
    if (!loading && !user) {
      navigate('/login', { replace: true });
      return;
    }
    
    // Obtener detalles del pedido del state de la navegación
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else if (!loading && user) {
      // Si no hay detalles del pedido en el state, redirigir a mis pedidos
      toast.info('No se encontraron detalles del pedido');
      navigate('/mis-pedidos', { replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando..." />
      </div>
    );
  }

  // Si no hay usuario o detalles del pedido después de cargar, no mostrar nada (se redirigirá)
  if (!user || !orderDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Icono de éxito */}
        <div className="mb-8 animate-fadeInDown">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-check text-4xl text-green-600"></i>
          </div>
        </div>
        
        {/* Mensaje de éxito */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
          ¡Pedido Realizado con Éxito!
        </h1>
        <p className="text-gray-600 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Gracias por tu compra, {user.nombre}. Tu pedido ha sido recibido y está siendo procesado.
        </p>
        
        {/* Detalles del pedido */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detalles del Pedido
          </h3>
          
          <div className="flex justify-between items-center border-b border-gray-200 py-3">
            <span className="text-gray-600">Número de Pedido:</span>
            <span className="font-medium text-gray-800">#{orderDetails.id}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 py-3">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-medium text-gray-800">
              {new Date(orderDetails.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 py-3">
            <span className="text-gray-600">Total:</span>
            <span className="font-medium text-gray-800">
              ${orderDetails.total?.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Estado:</span>
            <span className="badge badge-success">
              {orderDetails.estado || 'Procesando'}
            </span>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Link 
            to={`/pedido/${orderDetails.id}`} 
            className="btn btn-primary"
          >
            <i className="fas fa-receipt mr-2"></i>
            Ver detalles completos
          </Link>
          
          <Link 
            to="/mis-pedidos" 
            className="btn btn-secondary"
          >
            <i className="fas fa-history mr-2"></i>
            Mis pedidos
          </Link>
        </div>
        
        {/* Información adicional */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md text-left animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            ¿Qué sigue?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-envelope text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Confirmación por correo</h4>
                <p className="text-sm text-gray-600">Recibirás un correo electrónico con los detalles de tu pedido</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-utensils text-amber-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Preparación</h4>
                <p className="text-sm text-gray-600">Nuestro equipo está preparando tu pedido con los mejores ingredientes</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-check-circle text-green-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Seguimiento</h4>
                <p className="text-sm text-gray-600">Puedes seguir el estado de tu pedido en la sección "Mis Pedidos"</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Mensaje de agradecimiento */}
        <div className="mt-8 text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <p>¡Gracias por elegir Crepes & Coffee!</p>
          <p className="text-sm mt-2">Si tienes alguna pregunta, no dudes en contactarnos.</p>
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

export default OrderSuccess;