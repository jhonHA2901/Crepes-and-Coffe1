import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  getAdminStats, 
  getRecentOrders, 
  getTopProducts,
  formatPrice,
  formatDate 
} from '../../services/api';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    ordersToday: 0,
    revenueToday: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [timeRange, setTimeRange] = useState('today'); // today, week, month

  useEffect(() => {
    if (user && isAdmin) {
      loadDashboardData();
    }
  }, [user, isAdmin, timeRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, ordersResponse, productsResponse] = await Promise.all([
        getAdminStats(timeRange),
        getRecentOrders(10),
        getTopProducts(5)
      ]);
      
      setStats(statsResponse.data || stats);
      setRecentOrders(ordersResponse.data || []);
      setTopProducts(productsResponse.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error al cargar los datos del dashboard');
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

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-shield-alt text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso denegado</h2>
          <p className="text-gray-600 mb-6">No tienes permisos para acceder al panel de administración</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {user.displayName || 'Administrador'}</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            [...Array(8)].map((_, index) => (
              <SkeletonLoader key={index} type="general" />
            ))
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{stats.ordersToday} hoy
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-shopping-cart text-2xl text-blue-600"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-3xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{formatPrice(stats.revenueToday)} hoy
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-2xl text-green-600"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Productos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    <p className="text-sm text-amber-600 mt-1">
                      {stats.lowStockProducts} con poco stock
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-box text-2xl text-amber-600"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-sm text-purple-600 mt-1">
                      {stats.pendingOrders} pedidos pendientes
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-2xl text-purple-600"></i>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  <i className="fas fa-clock mr-2 text-amber-600"></i>
                  Pedidos Recientes
                </h2>
                <Link 
                  to="/admin/orders" 
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonLoader key={index} type="list" />
                  ))}
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">No hay pedidos recientes</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-receipt text-amber-600"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Pedido #{order.id?.toString().padStart(6, '0')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.user?.displayName || 'Usuario'} • {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  <i className="fas fa-star mr-2 text-amber-600"></i>
                  Productos Más Vendidos
                </h2>
                <Link 
                  to="/admin/products" 
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonLoader key={index} type="list" />
                  ))}
                </div>
              ) : topProducts.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-chart-bar text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">No hay datos de productos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full text-sm font-bold text-amber-600">
                        {index + 1}
                      </div>
                      
                      <img
                        src={product.image || '/api/placeholder/40/40'}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/40/40';
                        }}
                      />
                      
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          {product.totalSold || 0} vendidos • {formatPrice(product.price)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice((product.totalSold || 0) * product.price)}
                        </p>
                        <p className="text-sm text-gray-600">ingresos</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            <i className="fas fa-bolt mr-2 text-amber-600"></i>
            Acciones Rápidas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/admin/products/new" 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <i className="fas fa-plus text-2xl text-green-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nuevo Producto</p>
                  <p className="text-sm text-gray-600">Agregar al menú</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/admin/orders?status=pending" 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <i className="fas fa-clock text-2xl text-yellow-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Pedidos Pendientes</p>
                  <p className="text-sm text-gray-600">{stats.pendingOrders} por procesar</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/admin/products?filter=low_stock" 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Stock Bajo</p>
                  <p className="text-sm text-gray-600">{stats.lowStockProducts} productos</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/admin/users" 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <i className="fas fa-users text-2xl text-blue-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gestionar Usuarios</p>
                  <p className="text-sm text-gray-600">{stats.totalUsers} registrados</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;