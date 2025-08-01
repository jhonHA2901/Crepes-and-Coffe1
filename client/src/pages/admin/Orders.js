import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  getAdminOrders, 
  updateOrderStatus,
  formatPrice,
  formatDate 
} from '../../services/api';

const AdminOrders = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const orderStatuses = [
    { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
    { value: 'preparing', label: 'Preparando', color: 'bg-purple-100 text-purple-800' },
    { value: 'ready', label: 'Listo', color: 'bg-green-100 text-green-800' },
    { value: 'delivered', label: 'Entregado', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    if (user && isAdmin) {
      loadOrders();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, searchTerm, statusFilter, dateFilter, sortBy]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getAdminOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id?.toString().includes(searchTerm) ||
        order.user?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryAddress?.street?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply date filter
    const now = new Date();
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(order => new Date(order.createdAt) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(order => new Date(order.createdAt) >= monthAgo);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'amount_high':
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        case 'amount_low':
          return (a.totalAmount || 0) - (b.totalAmount || 0);
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      await updateOrderStatus(orderId, newStatus);
      toast.success('Estado del pedido actualizado');
      loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error al actualizar el estado del pedido');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedOrders.length === 0) {
      toast.warning('Selecciona al menos un pedido');
      return;
    }

    try {
      const promises = selectedOrders.map(orderId => 
        updateOrderStatus(orderId, newStatus)
      );
      
      await Promise.all(promises);
      toast.success(`Estado actualizado para ${selectedOrders.length} pedidos`);
      setSelectedOrders([]);
      setShowBulkActions(false);
      loadOrders();
    } catch (error) {
      console.error('Error in bulk status update:', error);
      toast.error('Error al actualizar los pedidos');
    }
  };

  const getStatusInfo = (status) => {
    return orderStatuses.find(s => s.value === status) || 
           { value: status, label: status, color: 'bg-gray-100 text-gray-800' };
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

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex >= 0 && currentIndex < statusFlow.length - 1 
      ? statusFlow[currentIndex + 1] 
      : null;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-shopping-cart mr-3 text-amber-600"></i>
                Gestión de Pedidos
              </h1>
              <p className="text-gray-600">
                {filteredOrders.length} de {orders.length} pedidos
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={loadOrders}
                className="btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Actualizar
              </button>
              
              {selectedOrders.length > 0 && (
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="btn-primary"
                >
                  <i className="fas fa-tasks mr-2"></i>
                  Acciones ({selectedOrders.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && selectedOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedOrders.length} pedidos seleccionados
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkStatusUpdate('confirmed')}
                  className="btn-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  <i className="fas fa-check mr-1"></i>
                  Confirmar
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('preparing')}
                  className="btn-sm bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  <i className="fas fa-utensils mr-1"></i>
                  Preparando
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('ready')}
                  className="btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                >
                  <i className="fas fa-bell mr-1"></i>
                  Listo
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('delivered')}
                  className="btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                >
                  <i className="fas fa-truck mr-1"></i>
                  Entregado
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Todos los estados</option>
                {orderStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Filter */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="amount_high">Monto mayor</option>
                <option value="amount_low">Monto menor</option>
                <option value="status">Por estado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <SkeletonLoader key={index} type="table" />
                ))}
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pedidos</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Los pedidos aparecerán aquí cuando los clientes realicen compras'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const nextStatus = getNextStatus(order.status);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                        </td>
                        
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              #{order.id?.toString().padStart(6, '0')}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items?.length || 0} productos
                            </p>
                            <p className="text-xs text-gray-400">
                              {getPaymentMethodText(order.paymentMethod)}
                            </p>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {order.user?.displayName || 'Usuario'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.user?.email}
                            </p>
                            {order.deliveryAddress && (
                              <p className="text-xs text-gray-400 truncate max-w-xs">
                                {order.deliveryAddress.street}, {order.deliveryAddress.city}
                              </p>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </td>
                        
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="text-amber-600 hover:text-amber-700 transition-colors"
                              title="Ver detalles"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                            
                            {nextStatus && order.status !== 'delivered' && order.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, nextStatus)}
                                disabled={updatingStatus === order.id}
                                className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
                                title={`Marcar como ${getStatusInfo(nextStatus).label}`}
                              >
                                {updatingStatus === order.id ? (
                                  <LoadingSpinner size="sm" />
                                ) : (
                                  <i className="fas fa-arrow-right"></i>
                                )}
                              </button>
                            )}
                            
                            {order.status !== 'delivered' && order.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                disabled={updatingStatus === order.id}
                                className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                title="Cancelar pedido"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;