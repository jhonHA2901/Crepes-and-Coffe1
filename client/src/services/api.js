import axios from 'axios';
import { getCurrentUserToken } from '../config/firebase';

// Configuración base de Axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.2.42:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getCurrentUserToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error obteniendo token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
    console.error('API Error:', errorMessage);
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

// ==================== AUTH ENDPOINTS ====================

/**
 * Verificar token de Firebase
 * @param {string} token - Token de Firebase
 * @returns {Promise<Object>} - Datos del usuario
 */
export const verifyToken = async (token) => {
  return await api.post('/auth/verify-token', { token });
};

/**
 * Obtener perfil del usuario
 * @returns {Promise<Object>} - Perfil del usuario
 */
export const getProfile = async () => {
  return await api.get('/auth/profile');
};

/**
 * Actualizar perfil del usuario
 * @param {Object} profileData - Datos del perfil
 * @returns {Promise<Object>} - Perfil actualizado
 */
export const updateProfile = async (profileData) => {
  return await api.put('/auth/profile', profileData);
};

/**
 * Verificar si el usuario es admin
 * @returns {Promise<Object>} - Estado de admin
 */
export const checkAdmin = async () => {
  return await api.get('/auth/check-admin');
};

/**
 * Cerrar sesión
 * @returns {Promise<Object>} - Confirmación
 */
export const logout = async () => {
  return await api.post('/auth/logout');
};

// ==================== PRODUCTOS ENDPOINTS ====================

/**
 * Obtener todos los productos
 * @param {Object} params - Parámetros de búsqueda
 * @returns {Promise<Object>} - Lista de productos
 */
export const getProductos = async (params = {}) => {
  const queryParams = new URLSearchParams({
    activos: 'true',
    ...params
  }).toString();
  
  return await api.get(`/productos?${queryParams}`);
};

/**
 * Obtener un producto por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} - Datos del producto
 */
export const getProducto = async (id) => {
  return await api.get(`/productos/${id}`);
};

/**
 * Buscar productos
 * @param {string} query - Término de búsqueda
 * @param {Object} filters - Filtros adicionales
 * @returns {Promise<Object>} - Resultados de búsqueda
 */
export const searchProductos = async (query, filters = {}) => {
  const params = {
    buscar: query,
    activos: 'true',
    ...filters
  };
  
  return await getProductos(params);
};

/**
 * Eliminar un producto
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} - Confirmación
 */
export const deleteProduct = async (id) => {
  return await api.delete(`/productos/${id}`);
};

/**
 * Actualizar un producto
 * @param {number} id - ID del producto
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} - Producto actualizado
 */
export const updateProduct = async (id, productData) => {
  return await api.put(`/productos/${id}`, productData);
};

/**
 * Obtener todos los productos (alias para admin)
 * @param {Object} params - Parámetros de búsqueda
 * @returns {Promise<Object>} - Lista de productos
 */
export const getProducts = async (params = {}) => {
  return await getProductos(params);
};

// ==================== PEDIDOS ENDPOINTS ====================

/**
 * Crear nuevo pedido
 * @param {Array} items - Items del carrito
 * @returns {Promise<Object>} - Pedido creado
 */
export const createPedido = async (items) => {
  return await api.post('/pedidos', { items });
};

/**
 * Obtener pedidos del usuario actual
 * @returns {Promise<Object>} - Lista de pedidos
 */
export const getMisPedidos = async () => {
  return await api.get('/pedidos/mis-pedidos');
};

/**
 * Obtener un pedido específico
 * @param {number} id - ID del pedido
 * @returns {Promise<Object>} - Datos del pedido
 */
export const getPedido = async (id) => {
  return await api.get(`/pedidos/${id}`);
};

/**
 * Obtener pedidos de un cliente (admin)
 * @param {number} clienteId - ID del cliente
 * @returns {Promise<Object>} - Lista de pedidos
 */
export const getPedidosCliente = async (clienteId) => {
  return await api.get(`/pedidos/cliente/${clienteId}`);
};

/**
 * Obtener todos los pedidos (admin)
 * @returns {Promise<Object>} - Lista de pedidos
 */
export const getAdminOrders = async () => {
  return await api.get('/pedidos/admin');
};

/**
 * Actualizar estado de un pedido (admin)
 * @param {number} orderId - ID del pedido
 * @param {string} status - Nuevo estado
 * @returns {Promise<Object>} - Pedido actualizado
 */
export const updateOrderStatus = async (orderId, status) => {
  return await api.put(`/pedidos/${orderId}/status`, { status });
};

/**
 * Obtener estadísticas del panel de administración
 * @param {string} timeRange - Rango de tiempo (today, week, month)
 * @returns {Promise<Object>} - Estadísticas
 */
export const getAdminStats = async (timeRange = 'today') => {
  return await api.get(`/admin/stats?timeRange=${timeRange}`);
};

/**
 * Obtener pedidos recientes
 * @param {number} limit - Límite de resultados
 * @returns {Promise<Object>} - Lista de pedidos recientes
 */
export const getRecentOrders = async (limit = 10) => {
  return await api.get(`/pedidos/recent?limit=${limit}`);
};

/**
 * Obtener productos más vendidos
 * @param {number} limit - Límite de resultados
 * @returns {Promise<Object>} - Lista de productos más vendidos
 */
export const getTopProducts = async (limit = 5) => {
  return await api.get(`/productos/top?limit=${limit}`);
};

// ==================== PAGOS ENDPOINTS ====================

/**
 * Crear preferencia de pago
 * @param {number} pedidoId - ID del pedido
 * @returns {Promise<Object>} - Preferencia de pago
 */
export const createPaymentPreference = async (pedidoId) => {
  return await api.post('/pago/preferencia', { pedido_id: pedidoId });
};

/**
 * Obtener estado de pago
 * @param {number} pedidoId - ID del pedido
 * @returns {Promise<Object>} - Estado del pago
 */
export const getPaymentStatus = async (pedidoId) => {
  return await api.get(`/pago/estado/${pedidoId}`);
};

/**
 * Simular pago (solo desarrollo)
 * @param {number} pedidoId - ID del pedido
 * @returns {Promise<Object>} - Confirmación
 */
export const simulatePayment = async (pedidoId) => {
  return await api.post('/pago/simular-pago', { pedido_id: pedidoId });
};

/**
 * Obtener métodos de pago disponibles
 * @returns {Promise<Object>} - Métodos de pago
 */
export const getPaymentMethods = async () => {
  return await api.get('/pago/metodos');
};

// ==================== UTILIDADES ====================

/**
 * Verificar estado del servidor
 * @returns {Promise<Object>} - Estado del servidor
 */
export const healthCheck = async () => {
  return await api.get('/health');
};

/**
 * Formatear precio
 * @param {number} price - Precio
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(price);
};

/**
 * Formatear fecha
 * @param {string} date - Fecha ISO
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} - Si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default api;