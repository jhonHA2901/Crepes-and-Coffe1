import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { getMisPedidos, formatPrice, formatDate } from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, amount_high, amount_low

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getMisPedidos();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        return 'Listo';
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

  const filteredAndSortedOrders = () => {
    let filtered = orders;
    
    // Apply filter
    if (filter !== 'all') {
      filtered = orders.filter(order => {
        switch (filter) {
          case 'pending':
            return ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status?.toLowerCase());
          case 'completed':
            return order.status?.toLowerCase() === 'delivered';
          case 'cancelled':
            return order.status?.toLowerCase() === 'cancelled';
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'amount_high':
          return b.totalAmount - a.totalAmount;
        case 'amount_low':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-receipt text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión para ver tus pedidos</h2>
          <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu historial de pedidos</p>
          <Link to="/login" className="btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
          <p className="text-gray-600">Historial y estado de tus pedidos</p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrar:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="all">Todos los pedidos</option>
                <option value="pending">En proceso</option>
                <option value="completed">Completados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
            
            {/* Sorting */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="amount_high">Mayor monto</option>
                <option value="amount_low">Menor monto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader key={index} type="list" />
            ))}
          </div>
        ) : filteredAndSortedOrders().length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-receipt text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No tienes pedidos aún' : 'No hay pedidos con este filtro'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Cuando realices tu primer pedido, aparecerá aquí.' 
                : 'Intenta cambiar el filtro para ver otros pedidos.'}
            </p>
            {filter === 'all' && (
              <Link to="/products" className="btn-primary">
                <i className="fas fa-utensils mr-2"></i>
                Ver Menú
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedOrders().map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">
                          Pedido #{order.id?.toString().padStart(6, '0')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <i className={`${getStatusIcon(order.status)} mr-1`}></i>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="text-lg font-bold text-amber-600">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image || '/api/placeholder/40/40'}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/40/40';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Cantidad: {item.quantity} • {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items?.length > 3 && (
                        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            +{order.items.length - 3} productos más
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Método de pago:</span>
                      <span className="ml-2 text-gray-600">
                        {order.paymentMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo contra entrega'}
                      </span>
                    </div>
                    
                    {order.deliveryAddress && (
                      <div>
                        <span className="font-medium text-gray-700">Dirección:</span>
                        <span className="ml-2 text-gray-600">
                          {order.deliveryAddress.street}, {order.deliveryAddress.city}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Ver detalles
                      </Link>
                      
                      {order.status?.toLowerCase() === 'delivered' && (
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                          <i className="fas fa-redo mr-1"></i>
                          Volver a pedir
                        </button>
                      )}
                      
                      {['pending', 'confirmed'].includes(order.status?.toLowerCase()) && (
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors">
                          <i className="fas fa-times mr-1"></i>
                          Cancelar
                        </button>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {order.items?.length} {order.items?.length === 1 ? 'producto' : 'productos'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {!loading && filteredAndSortedOrders().length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Mostrando {filteredAndSortedOrders().length} de {orders.length} pedidos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;