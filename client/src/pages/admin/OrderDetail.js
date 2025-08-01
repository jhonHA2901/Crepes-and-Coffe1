import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  getOrder, 
  updateOrderStatus,
  formatPrice,
  formatDate 
} from '../../services/api';

const AdminOrderDetail = () => {
  const { user, isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const orderStatuses = [
    { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: 'fas fa-clock' },
    { value: 'confirmed', label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: 'fas fa-check-circle' },
    { value: 'preparing', label: 'Preparando', color: 'bg-purple-100 text-purple-800', icon: 'fas fa-utensils' },
    { value: 'ready', label: 'Listo', color: 'bg-green-100 text-green-800', icon: 'fas fa-bell' },
    { value: 'delivered', label: 'Entregado', color: 'bg-green-100 text-green-800', icon: 'fas fa-truck' },
    { value: 'cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: 'fas fa-times-circle' }
  ];

  useEffect(() => {
    if (user && isAdmin && id) {
      loadOrder();
    }
  }, [user, isAdmin, id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error loading order:', error);
      toast.error('Error al cargar el pedido');
      navigate('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await updateOrderStatus(id, newStatus);
      toast.success('Estado del pedido actualizado exitosamente');
      setShowStatusModal(false);
      loadOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error al actualizar el estado del pedido');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusInfo = (status) => {
    return orderStatuses.find(s => s.value === status) || 
           { value: status, label: status, color: 'bg-gray-100 text-gray-800', icon: 'fas fa-question' };
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'mercadopago':
        return 'MercadoPago';
      case 'cash':
        return 'Efectivo';
      default:
        return method || 'No especificado';
    }
  };

  const getStatusTimeline = () => {
    const timeline = [
      { status: 'pending', label: 'Pedido recibido', completed: true },
      { status: 'confirmed', label: 'Confirmado', completed: false },
      { status: 'preparing', label: 'En preparación', completed: false },
      { status: 'ready', label: 'Listo para entrega', completed: false },
      { status: 'delivered', label: 'Entregado', completed: false }
    ];

    const currentStatusIndex = timeline.findIndex(item => item.status === order?.status);
    
    return timeline.map((item, index) => ({
      ...item,
      completed: index <= currentStatusIndex && order?.status !== 'cancelled'
    }));
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-shield-alt text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso denegado</h2>
          <p className="text-gray-600 mb-6">No tienes permisos para acceder a esta página</p>
          <Link to="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando pedido..." />;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido no encontrado</h2>
          <p className="text-gray-600 mb-6">El pedido que buscas no existe o ha sido eliminado</p>
          <Link to="/admin/orders" className="btn-primary">
            Volver a pedidos
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const timeline = getStatusTimeline();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/admin/orders" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              <i className="fas fa-receipt mr-3 text-amber-600"></i>
              Pedido #{order.id?.toString().padStart(6, '0')}
            </h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
              <i className={`${statusInfo.icon} mr-2`}></i>
              {statusInfo.label}
            </span>
          </div>
          
          <nav className="text-sm text-gray-600">
            <Link to="/admin" className="hover:text-gray-900">Panel</Link>
            <span className="mx-2">/</span>
            <Link to="/admin/orders" className="hover:text-gray-900">Pedidos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">#{order.id?.toString().padStart(6, '0')}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            {order.status !== 'cancelled' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  <i className="fas fa-route mr-2 text-amber-600"></i>
                  Estado del Pedido
                </h2>
                
                <div className="relative">
                  {timeline.map((item, index) => (
                    <div key={item.status} className="flex items-center mb-6 last:mb-0">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        item.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {item.completed ? (
                          <i className="fas fa-check text-sm"></i>
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <p className={`text-sm font-medium ${
                          item.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {item.label}
                        </p>
                        {item.status === order.status && (
                          <p className="text-xs text-amber-600 mt-1">
                            Estado actual
                          </p>
                        )}
                      </div>
                      
                      {index < timeline.length - 1 && (
                        <div className={`absolute left-4 w-0.5 h-6 mt-8 ${
                          item.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`} style={{ top: `${(index * 56) + 32}px` }}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                <i className="fas fa-shopping-bag mr-2 text-amber-600"></i>
                Productos Pedidos
              </h2>
              
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product?.image || '/api/placeholder/60/60'}
                      alt={item.product?.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/60/60';
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.product?.name || 'Producto no disponible'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} × {formatPrice(item.price)}
                      </p>
                      {item.specialInstructions && (
                        <p className="text-sm text-amber-600 mt-1">
                          <i className="fas fa-sticky-note mr-1"></i>
                          {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total del Pedido:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="fas fa-sticky-note mr-2 text-amber-600"></i>
                  Instrucciones Especiales
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">{order.specialInstructions}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-cogs mr-2 text-amber-600"></i>
                Acciones
              </h2>
              
              <div className="space-y-3">
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="w-full btn-primary"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Cambiar Estado
                  </button>
                )}
                
                <button
                  onClick={() => window.print()}
                  className="w-full btn-secondary"
                >
                  <i className="fas fa-print mr-2"></i>
                  Imprimir Pedido
                </button>
                
                <Link
                  to={`/admin/orders?search=${order.user?.email}`}
                  className="w-full btn-secondary text-center block"
                >
                  <i className="fas fa-user mr-2"></i>
                  Ver Pedidos del Cliente
                </Link>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-user mr-2 text-amber-600"></i>
                Información del Cliente
              </h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-medium text-gray-900">
                    {order.user?.displayName || 'No especificado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">
                    {order.user?.email || 'No especificado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium text-gray-900">
                    {order.user?.phone || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            {order.deliveryAddress && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="fas fa-map-marker-alt mr-2 text-amber-600"></i>
                  Dirección de Entrega
                </h2>
                
                <div className="space-y-2">
                  <p className="text-gray-900">{order.deliveryAddress.street}</p>
                  <p className="text-gray-600">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}
                  </p>
                  <p className="text-gray-600">
                    {order.deliveryAddress.zipCode}, {order.deliveryAddress.country}
                  </p>
                  {order.deliveryAddress.instructions && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Instrucciones:</p>
                      <p className="text-sm text-gray-900">{order.deliveryAddress.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-info-circle mr-2 text-amber-600"></i>
                Resumen del Pedido
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha del pedido:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de pago:</span>
                  <span className="font-medium text-gray-900">
                    {getPaymentMethodText(order.paymentMethod)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Productos:</span>
                  <span className="font-medium text-gray-900">
                    {order.items?.length || 0} artículos
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-amber-600">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <i className="fas fa-edit text-4xl text-amber-600 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cambiar Estado del Pedido
              </h3>
              <p className="text-gray-600">
                Selecciona el nuevo estado para el pedido #{order.id?.toString().padStart(6, '0')}
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              {orderStatuses.filter(status => status.value !== 'cancelled' || order.status !== 'delivered').map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                    selectedStatus === status.value
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${status.icon} text-lg`}></i>
                    <span className="font-medium">{status.label}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedStatus('');
                }}
                className="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedStatus)}
                disabled={!selectedStatus || updatingStatus}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                {updatingStatus ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <i className="fas fa-check mr-2"></i>
                )}
                {updatingStatus ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;