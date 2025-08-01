import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { getPedido, formatPrice, formatDate } from '../services/api';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/orders/${orderId}` } } });
      return;
    }
    
    loadOrder();
  }, [user, orderId, navigate]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await getPedido(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error('Error loading order:', error);
      if (error.response?.status === 404) {
        toast.error('Pedido no encontrado');
      } else {
        toast.error('Error al cargar el pedido');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmado';
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Listo para entregar';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status || 'Desconocido';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'fas fa-clock';
      case 'confirmed':
        return 'fas fa-check-circle';
      case 'preparing':
        return 'fas fa-utensils';
      case 'ready':
        return 'fas fa-box';
      case 'delivered':
        return 'fas fa-check-double';
      case 'cancelled':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Pedido recibido', icon: 'fas fa-receipt' },
      { key: 'confirmed', label: 'Confirmado', icon: 'fas fa-check-circle' },
      { key: 'preparing', label: 'Preparando', icon: 'fas fa-utensils' },
      { key: 'ready', label: 'Listo', icon: 'fas fa-box' },
      { key: 'delivered', label: 'Entregado', icon: 'fas fa-check-double' }
    ];

    const currentStatusIndex = steps.findIndex(step => step.key === order?.status?.toLowerCase());
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      current: index === currentStatusIndex
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando pedido..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido no encontrado</h2>
          <p className="text-gray-600 mb-6">El pedido que buscas no existe o no tienes permisos para verlo</p>
          <Link to="/orders" className="btn-primary">
            <i className="fas fa-arrow-left mr-2"></i>
            Volver a mis pedidos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Inicio
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <Link to="/orders" className="hover:text-amber-600 transition-colors">
              Mis Pedidos
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-900 font-medium">
              Pedido #{order.id?.toString().padStart(6, '0')}
            </span>
          </div>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Pedido #{order.id?.toString().padStart(6, '0')}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  <i className="fas fa-calendar mr-1"></i>
                  Realizado el {formatDate(order.createdAt)}
                </span>
                <span>
                  <i className="fas fa-credit-card mr-1"></i>
                  {order.paymentMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo contra entrega'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                <i className={`${getStatusIcon(order.status)} mr-2`}></i>
                {getStatusText(order.status)}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status Timeline */}
            {order.status?.toLowerCase() !== 'cancelled' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  <i className="fas fa-route mr-2 text-amber-600"></i>
                  Estado del Pedido
                </h2>
                
                <div className="relative">
                  {getStatusSteps().map((step, index) => (
                    <div key={step.key} className="flex items-center mb-6 last:mb-0">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        step.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : step.current
                          ? 'bg-amber-500 border-amber-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        <i className={`${step.icon} text-sm`}></i>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <p className={`font-medium ${
                          step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </p>
                        {step.current && (
                          <p className="text-sm text-amber-600 font-medium">
                            Estado actual
                          </p>
                        )}
                      </div>
                      
                      {index < getStatusSteps().length - 1 && (
                        <div className={`absolute left-5 w-0.5 h-6 mt-10 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} style={{ top: `${index * 4 + 2.5}rem` }}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                <i className="fas fa-utensils mr-2 text-amber-600"></i>
                Productos Pedidos
              </h2>
              
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image || '/api/placeholder/60/60'}
                      alt={item.name}
                      className="w-15 h-15 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/60/60';
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          Cantidad: <span className="font-medium">{item.quantity}</span>
                        </span>
                        <span className="text-gray-600">
                          Precio unitario: <span className="font-medium">{formatPrice(item.price)}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total del pedido:</span>
                  <span className="text-amber-600">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  <i className="fas fa-comment mr-2 text-amber-600"></i>
                  Instrucciones Especiales
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-gray-800">{order.specialInstructions}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-map-marker-alt mr-2 text-amber-600"></i>
                Información de Entrega
              </h3>
              
              {order.deliveryAddress ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{order.deliveryAddress.street}</p>
                    <p className="text-gray-600">
                      {order.deliveryAddress.city}, {order.deliveryAddress.state}
                    </p>
                    <p className="text-gray-600">
                      CP: {order.deliveryAddress.zipCode}
                    </p>
                  </div>
                  
                  {order.deliveryAddress.phone && (
                    <div>
                      <p className="font-medium text-gray-700">Teléfono:</p>
                      <p className="text-gray-600">{order.deliveryAddress.phone}</p>
                    </div>
                  )}
                  
                  {order.deliveryAddress.notes && (
                    <div>
                      <p className="font-medium text-gray-700">Notas:</p>
                      <p className="text-gray-600">{order.deliveryAddress.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No hay información de entrega disponible</p>
              )}
            </div>

            {/* Order Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-cog mr-2 text-amber-600"></i>
                Acciones
              </h3>
              
              <div className="space-y-3">
                {order.status?.toLowerCase() === 'delivered' && (
                  <button className="w-full btn-primary text-sm">
                    <i className="fas fa-redo mr-2"></i>
                    Volver a pedir
                  </button>
                )}
                
                {['pending', 'confirmed'].includes(order.status?.toLowerCase()) && (
                  <button className="w-full btn-secondary text-sm border-red-300 text-red-600 hover:bg-red-50">
                    <i className="fas fa-times mr-2"></i>
                    Cancelar pedido
                  </button>
                )}
                
                <button className="w-full btn-secondary text-sm">
                  <i className="fas fa-headset mr-2"></i>
                  Contactar soporte
                </button>
                
                <Link to="/orders" className="w-full btn-secondary text-sm text-center block">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Volver a mis pedidos
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-receipt mr-2 text-amber-600"></i>
                Resumen
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Productos:</span>
                  <span className="font-medium">{order.items?.length || 0}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(order.totalAmount)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-amber-600">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;