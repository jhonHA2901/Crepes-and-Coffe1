import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../../components/LoadingSpinner';
import { getStats, formatDate, formatPrice } from '../../services/api';

// Componente para mostrar una tarjeta de estadística
const StatCard = ({ title, value, icon, color, change, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {isLoading ? (
        <SkeletonLoader type="stat" />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">{title}</h3>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
              <i className={`fas ${icon} text-white text-xl`}></i>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          {change !== undefined && (
            <div className="flex items-center">
              <i className={`fas fa-${change >= 0 ? 'arrow-up text-green-500' : 'arrow-down text-red-500'} mr-1`}></i>
              <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(change)}% desde el mes pasado
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Componente para mostrar un gráfico de barras simple
const SimpleBarChart = ({ data, title, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <SkeletonLoader type="chart" />
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-amber-500 h-2.5 rounded-full" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para mostrar una tabla de productos más vendidos
const TopProductsTable = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Productos más vendidos</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} type="row" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Productos más vendidos</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendidos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img 
                      src={product.image || '/api/placeholder/40/40'} 
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover mr-3"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/40/40';
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{product.sold}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(product.revenue)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock < 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock === 0 ? 'Sin stock' : `${product.stock} unidades`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente para mostrar una tabla de pedidos recientes
const RecentOrdersTable = ({ orders, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Pedidos recientes</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} type="row" />
          ))}
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pendiente' },
      'confirmed': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Confirmado' },
      'preparing': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En preparación' },
      'ready': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Listo' },
      'delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Entregado' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">Pedidos recientes</h3>
        <Link to="/admin/orders" className="text-sm text-amber-600 hover:text-amber-700">
          Ver todos
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">#{order.id.substring(0, 8)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img 
                      src={order.user?.photoURL || '/api/placeholder/30/30'} 
                      alt={order.user?.displayName || 'Usuario'}
                      className="w-8 h-8 rounded-full mr-3"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/30/30';
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.user?.displayName || 'Usuario'}</p>
                      <p className="text-xs text-gray-500">{order.user?.email || 'Sin email'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatPrice(order.totalAmount)}</td>
                <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                <td className="px-4 py-3 text-sm">
                  <Link 
                    to={`/admin/orders/${order.id}`}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminStats = () => {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // day, week, month, year

  useEffect(() => {
    if (user && isAdmin) {
      loadStats();
    }
  }, [user, isAdmin, timeRange]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await getStats(timeRange);
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
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

  // Datos de ejemplo para cuando no hay datos reales
  const placeholderStats = {
    summary: {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      totalUsers: 0,
      ordersChange: 0,
      revenueChange: 0,
      productsChange: 0,
      usersChange: 0
    },
    dailyOrders: [
      { label: 'Lun', value: 0 },
      { label: 'Mar', value: 0 },
      { label: 'Mié', value: 0 },
      { label: 'Jue', value: 0 },
      { label: 'Vie', value: 0 },
      { label: 'Sáb', value: 0 },
      { label: 'Dom', value: 0 }
    ],
    topProducts: [],
    recentOrders: []
  };

  const currentStats = stats || placeholderStats;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-chart-line mr-3 text-amber-600"></i>
                Estadísticas
              </h1>
              <p className="text-gray-600">
                Resumen de rendimiento y métricas clave
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field"
              >
                <option value="day">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="year">Este año</option>
              </select>
              
              <button
                onClick={loadStats}
                className="btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Pedidos"
            value={currentStats.summary.totalOrders}
            icon="fa-shopping-cart"
            color="bg-blue-500"
            change={currentStats.summary.ordersChange}
            isLoading={loading}
          />
          
          <StatCard
            title="Ingresos"
            value={formatPrice(currentStats.summary.totalRevenue)}
            icon="fa-dollar-sign"
            color="bg-green-500"
            change={currentStats.summary.revenueChange}
            isLoading={loading}
          />
          
          <StatCard
            title="Productos"
            value={currentStats.summary.totalProducts}
            icon="fa-box"
            color="bg-amber-500"
            change={currentStats.summary.productsChange}
            isLoading={loading}
          />
          
          <StatCard
            title="Usuarios"
            value={currentStats.summary.totalUsers}
            icon="fa-users"
            color="bg-purple-500"
            change={currentStats.summary.usersChange}
            isLoading={loading}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SimpleBarChart
            data={currentStats.dailyOrders}
            title="Pedidos por día"
            isLoading={loading}
          />
          
          <TopProductsTable
            products={currentStats.topProducts}
            isLoading={loading}
          />
        </div>

        <div className="mb-8">
          <RecentOrdersTable
            orders={currentStats.recentOrders}
            isLoading={loading}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Acciones rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/products" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <i className="fas fa-box text-white"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Gestionar productos</p>
                <p className="text-sm text-gray-600">{currentStats.summary.totalProducts} productos</p>
              </div>
            </Link>
            
            <Link to="/admin/orders" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <i className="fas fa-shopping-cart text-white"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Gestionar pedidos</p>
                <p className="text-sm text-gray-600">{currentStats.summary.totalOrders} pedidos</p>
              </div>
            </Link>
            
            <Link to="/admin/products?filter=low_stock" className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                <i className="fas fa-exclamation-triangle text-white"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Stock bajo</p>
                <p className="text-sm text-gray-600">Revisar inventario</p>
              </div>
            </Link>
            
            <Link to="/admin/users" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                <i className="fas fa-users text-white"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Gestionar usuarios</p>
                <p className="text-sm text-gray-600">{currentStats.summary.totalUsers} usuarios</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;