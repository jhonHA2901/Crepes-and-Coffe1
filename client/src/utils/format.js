/**
 * Utilidades para formatear datos en la aplicación
 */

/**
 * Formatea un valor numérico como moneda (PEN)
 * @param {number} value - El valor a formatear
 * @returns {string} - El valor formateado como moneda
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'S/ 0.00';
  
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(value);
};

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - La fecha a formatear
 * @returns {string} - La fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return 'Fecha no disponible';
  
  try {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha y hora en formato legible
 * @param {string|Date} date - La fecha a formatear
 * @returns {string} - La fecha y hora formateada
 */
export const formatDateTime = (date) => {
  if (!date) return 'Fecha no disponible';
  
  try {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  } catch (error) {
    console.error('Error al formatear fecha y hora:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea un estado de pedido o reserva
 * @param {string} status - El estado a formatear
 * @returns {Object} - Objeto con clase CSS y texto formateado
 */
export const formatStatus = (status) => {
  const statusMap = {
    'pendiente': {
      class: 'bg-yellow-100 text-yellow-800',
      text: 'Pendiente'
    },
    'confirmada': {
      class: 'bg-green-100 text-green-800',
      text: 'Confirmada'
    },
    'cancelada': {
      class: 'bg-red-100 text-red-800',
      text: 'Cancelada'
    },
    'completada': {
      class: 'bg-blue-100 text-blue-800',
      text: 'Completada'
    },
    'en_proceso': {
      class: 'bg-purple-100 text-purple-800',
      text: 'En proceso'
    },
    'enviado': {
      class: 'bg-indigo-100 text-indigo-800',
      text: 'Enviado'
    },
    'entregado': {
      class: 'bg-green-100 text-green-800',
      text: 'Entregado'
    }
  };
  
  return statusMap[status] || {
    class: 'bg-gray-100 text-gray-800',
    text: status || 'Desconocido'
  };
};