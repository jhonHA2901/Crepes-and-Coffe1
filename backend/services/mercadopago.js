const mercadopago = require('mercadopago');
require('dotenv').config();

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

/**
 * Crear preferencia de pago
 * @param {Object} orderData - Datos del pedido
 * @param {Array} items - Items del carrito
 * @param {Object} payer - Datos del pagador
 * @returns {Promise<Object>} - Preferencia creada
 */
const createPaymentPreference = async (orderData, items, payer) => {
  try {
    const preference = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.nombre,
        description: item.descripcion || item.nombre,
        picture_url: item.imagen_url,
        category_id: 'food',
        quantity: parseInt(item.cantidad),
        currency_id: 'PEN', // Cambiar según el país (USD, COP, etc.)
        unit_price: parseFloat(item.precio)
      })),
      payer: {
        name: payer.nombre,
        email: payer.email,
        identification: {
          type: 'DNI',
          number: '12345678' // En producción, solicitar al usuario
        }
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pago/exito`,
        failure: `${process.env.FRONTEND_URL}/pago/error`,
        pending: `${process.env.FRONTEND_URL}/pago/pendiente`
      },
      auto_return: 'approved',
      notification_url: `${process.env.BACKEND_URL || process.env.RAILWAY_PUBLIC_URL || 'https://your-backend-url.railway.app'}/pago/webhook`,
      external_reference: orderData.id.toString(),
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      metadata: {
        pedido_id: orderData.id,
        usuario_id: orderData.usuario_id
      }
    };

    const response = await mercadopago.preferences.create(preference);
    
    return {
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
      collector_id: response.body.collector_id,
      client_id: response.body.client_id,
      date_created: response.body.date_created
    };
  } catch (error) {
    console.error('Error creando preferencia de Mercado Pago:', error);
    throw new Error('Error al crear preferencia de pago');
  }
};

/**
 * Obtener información de un pago
 * @param {string} paymentId - ID del pago
 * @returns {Promise<Object>} - Información del pago
 */
const getPaymentInfo = async (paymentId) => {
  try {
    const payment = await mercadopago.payment.findById(paymentId);
    
    return {
      id: payment.body.id,
      status: payment.body.status,
      status_detail: payment.body.status_detail,
      transaction_amount: payment.body.transaction_amount,
      currency_id: payment.body.currency_id,
      date_created: payment.body.date_created,
      date_approved: payment.body.date_approved,
      external_reference: payment.body.external_reference,
      payer: {
        email: payment.body.payer.email,
        identification: payment.body.payer.identification
      },
      payment_method: {
        id: payment.body.payment_method_id,
        type: payment.body.payment_type_id
      }
    };
  } catch (error) {
    console.error('Error obteniendo información del pago:', error);
    throw new Error('Error al obtener información del pago');
  }
};

/**
 * Procesar webhook de Mercado Pago
 * @param {Object} notification - Notificación recibida
 * @returns {Promise<Object>} - Resultado del procesamiento
 */
const processWebhook = async (notification) => {
  try {
    const { type, data } = notification;
    
    if (type === 'payment') {
      const paymentInfo = await getPaymentInfo(data.id);
      
      return {
        type: 'payment',
        payment_id: paymentInfo.id,
        status: paymentInfo.status,
        external_reference: paymentInfo.external_reference,
        transaction_amount: paymentInfo.transaction_amount,
        date_approved: paymentInfo.date_approved,
        payer_email: paymentInfo.payer.email
      };
    }
    
    return {
      type: type,
      message: 'Tipo de notificación no procesada'
    };
  } catch (error) {
    console.error('Error procesando webhook:', error);
    throw new Error('Error al procesar webhook');
  }
};

/**
 * Crear link de pago directo
 * @param {Object} paymentData - Datos del pago
 * @returns {Promise<Object>} - Link de pago
 */
const createPaymentLink = async (paymentData) => {
  try {
    const payment = {
      transaction_amount: parseFloat(paymentData.amount),
      description: paymentData.description,
      payment_method_id: 'visa', // o el método seleccionado
      payer: {
        email: paymentData.payer.email,
        identification: {
          type: 'DNI',
          number: paymentData.payer.identification || '12345678'
        }
      },
      external_reference: paymentData.external_reference,
      notification_url: `${process.env.BACKEND_URL}/pago/webhook`
    };

    const response = await mercadopago.payment.create(payment);
    
    return {
      id: response.body.id,
      status: response.body.status,
      detail: response.body.status_detail,
      payment_method_id: response.body.payment_method_id
    };
  } catch (error) {
    console.error('Error creando link de pago:', error);
    throw new Error('Error al crear link de pago');
  }
};

/**
 * Validar webhook signature (para mayor seguridad)
 * @param {Object} req - Request object
 * @returns {boolean} - Si la signature es válida
 */
const validateWebhookSignature = (req) => {
  try {
    // En producción, implementar validación de signature
    // const signature = req.headers['x-signature'];
    // const requestId = req.headers['x-request-id'];
    // Validar usando el secret de webhook
    return true;
  } catch (error) {
    console.error('Error validando signature del webhook:', error);
    return false;
  }
};

/**
 * Obtener métodos de pago disponibles
 * @returns {Promise<Array>} - Métodos de pago
 */
const getPaymentMethods = async () => {
  try {
    const response = await mercadopago.payment_methods.listAll();
    
    return response.body.map(method => ({
      id: method.id,
      name: method.name,
      payment_type_id: method.payment_type_id,
      status: method.status,
      secure_thumbnail: method.secure_thumbnail,
      thumbnail: method.thumbnail
    }));
  } catch (error) {
    console.error('Error obteniendo métodos de pago:', error);
    throw new Error('Error al obtener métodos de pago');
  }
};

module.exports = {
  createPaymentPreference,
  getPaymentInfo,
  processWebhook,
  createPaymentLink,
  validateWebhookSignature,
  getPaymentMethods,
  mercadopago
};