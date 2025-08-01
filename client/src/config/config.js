/**
 * Configuración global de la aplicación
 */

// URL base de la API
export const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.2.42:3000';

// Configuración de paginación
export const ITEMS_PER_PAGE = 12;

// Configuración de imágenes
export const DEFAULT_IMAGE = '/images/default-product.jpg';
export const DEFAULT_AVATAR = '/images/default-avatar.jpg';

// Configuración de tiempos
export const SESSION_TIMEOUT = 3600000; // 1 hora en milisegundos

// Configuración de notificaciones
export const TOAST_AUTO_CLOSE = 5000; // 5 segundos

// Configuración de MercadoPago
export const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;