import React from 'react';

/**
 * Componente para mostrar un badge de estado con colores según el tipo
 * @param {string} status - Estado a mostrar
 * @param {string} type - Tipo de estado: reservation, event, payment, order
 * @param {string} size - Tamaño del badge: sm, md, lg
 * @param {string} className - Clases adicionales
 */
const StatusBadge = ({
  status,
  type = 'reservation',
  size = 'md',
  className = ''
}) => {
  // Definir mapeo de estados para reservas
  const reservationStatusMap = {
    'pendiente': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pendiente'
    },
    'confirmada': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Confirmada'
    },
    'cancelada': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Cancelada'
    },
    'completada': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Completada'
    }
  };

  // Definir mapeo de estados para eventos
  const eventStatusMap = {
    'activo': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Activo'
    },
    'inactivo': {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: 'Inactivo'
    },
    'completado': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Completado'
    },
    'cancelado': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Cancelado'
    },
    'destacado': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      label: 'Destacado'
    }
  };

  // Definir mapeo de estados para pagos
  const paymentStatusMap = {
    'pendiente': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pendiente'
    },
    'aprobado': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Aprobado'
    },
    'rechazado': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Rechazado'
    },
    'reembolsado': {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Reembolsado'
    }
  };

  // Definir mapeo de estados para pedidos
  const orderStatusMap = {
    'pendiente': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pendiente'
    },
    'preparando': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Preparando'
    },
    'enviado': {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      label: 'Enviado'
    },
    'entregado': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Entregado'
    },
    'cancelado': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Cancelado'
    }
  };

  // Seleccionar el mapa de estados según el tipo
  const getStatusMap = () => {
    switch (type) {
      case 'reservation':
        return reservationStatusMap;
      case 'event':
        return eventStatusMap;
      case 'payment':
        return paymentStatusMap;
      case 'order':
        return orderStatusMap;
      default:
        return reservationStatusMap;
    }
  };

  const statusMap = getStatusMap();
  const statusKey = status?.toLowerCase() || 'pendiente';
  const statusConfig = statusMap[statusKey] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: status || 'Desconocido'
  };

  // Definir tamaños
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${statusConfig.bg} ${statusConfig.text} ${sizeClasses[size]} ${className}`}
    >
      {statusConfig.label}
    </span>
  );
};

export default StatusBadge;