const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { authenticateToken } = require('../services/firebase');
const { 
  createPaymentPreference, 
  processWebhook, 
  getPaymentInfo,
  validateWebhookSignature 
} = require('../services/mercadopago');
const { Usuario, Producto, Pedido, DetallePedido } = require('../models');
const { sequelize } = require('../config/database');

const router = express.Router();

/**
 * POST /pago/preferencia
 * Crear preferencia de pago en Mercado Pago
 */
router.post('/preferencia', [
  authenticateToken,
  body('pedido_id').isInt({ min: 1 }).withMessage('pedido_id debe ser un número entero positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { pedido_id } = req.body;
    
    // Obtener usuario
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Obtener pedido con detalles
    const pedido = await Pedido.findByPk(pedido_id, {
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen_url']
            }
          ]
        }
      ]
    });
    
    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }
    
    // Verificar que el pedido pertenece al usuario
    if (pedido.usuario_id !== usuario.id) {
      return res.status(403).json({
        error: 'No tienes permisos para pagar este pedido'
      });
    }
    
    // Verificar que el pedido esté pendiente
    if (pedido.estado !== 'pendiente') {
      return res.status(400).json({
        error: 'El pedido no está en estado pendiente',
        estado_actual: pedido.estado
      });
    }

    // Preparar items para Mercado Pago
    const items = pedido.detalles.map(detalle => ({
      id: detalle.producto.id,
      nombre: detalle.producto.nombre,
      descripcion: detalle.producto.descripcion,
      precio: parseFloat(detalle.precio_unitario),
      cantidad: detalle.cantidad,
      imagen_url: detalle.producto.imagen_url
    }));

    // Datos del pagador
    const payer = {
      nombre: usuario.nombre,
      email: usuario.email
    };

    // Crear preferencia en Mercado Pago
    const preference = await createPaymentPreference(pedido, items, payer);
    
    // Actualizar pedido con ID de Mercado Pago
    await pedido.update({
      mercadopago_id: preference.id
    });

    res.json({
      success: true,
      message: 'Preferencia de pago creada correctamente',
      preference: {
        id: preference.id,
        init_point: preference.init_point,
        sandbox_init_point: preference.sandbox_init_point
      },
      pedido: {
        id: pedido.id,
        total: pedido.total,
        estado: pedido.estado
      }
    });

  } catch (error) {
    console.error('Error creando preferencia de pago:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

/**
 * POST /pago/webhook
 * Webhook para recibir notificaciones de Mercado Pago
 */
router.post('/webhook', async (req, res) => {
  try {
    console.log('Webhook recibido:', req.body);
    
    // Validar signature (opcional pero recomendado)
    if (!validateWebhookSignature(req)) {
      console.warn('Webhook con signature inválida');
      return res.status(400).json({
        error: 'Signature inválida'
      });
    }

    const notification = req.body;
    
    // Procesar webhook
    const webhookResult = await processWebhook(notification);
    
    if (webhookResult.type === 'payment') {
      const { payment_id, status, external_reference } = webhookResult;
      
      // Buscar pedido por external_reference (ID del pedido)
      const pedido = await Pedido.findByPk(external_reference);
      
      if (!pedido) {
        console.error(`Pedido no encontrado: ${external_reference}`);
        return res.status(404).json({
          error: 'Pedido no encontrado'
        });
      }

      // Actualizar estado del pedido según el estado del pago
      let nuevoEstado = pedido.estado;
      
      switch (status) {
        case 'approved':
          nuevoEstado = 'pagado';
          break;
        case 'rejected':
        case 'cancelled':
          nuevoEstado = 'cancelado';
          break;
        case 'pending':
        case 'in_process':
          nuevoEstado = 'pendiente';
          break;
        default:
          console.warn(`Estado de pago no reconocido: ${status}`);
      }

      // Actualizar pedido
      await pedido.update({
        estado: nuevoEstado,
        mercadopago_status: status
      });

      console.log(`Pedido ${pedido.id} actualizado a estado: ${nuevoEstado}`);
      
      // Si el pago fue rechazado o cancelado, restaurar stock
      if (nuevoEstado === 'cancelado' && pedido.estado === 'pendiente') {
        const detalles = await DetallePedido.findAll({
          where: { pedido_id: pedido.id },
          include: [{
            model: Producto,
            as: 'producto'
          }]
        });
        
        await Promise.all(
          detalles.map(detalle => 
            detalle.producto.update({
              stock: detalle.producto.stock + detalle.cantidad
            })
          )
        );
        
        console.log(`Stock restaurado para pedido cancelado: ${pedido.id}`);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Webhook procesado correctamente'
    });

  } catch (error) {
    console.error('Error procesando webhook:', error);
    res.status(500).json({
      error: 'Error procesando webhook',
      message: error.message
    });
  }
});

/**
 * GET /pago/estado/:pedido_id
 * Verificar estado de pago de un pedido
 */
router.get('/estado/:pedido_id', [
  authenticateToken,
  param('pedido_id').isInt({ min: 1 }).withMessage('pedido_id debe ser un número entero positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Parámetros inválidos',
        details: errors.array()
      });
    }

    const { pedido_id } = req.params;
    
    // Obtener usuario
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Obtener pedido
    const pedido = await Pedido.findByPk(pedido_id);
    
    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }
    
    // Verificar permisos
    if (usuario.rol !== 'admin' && pedido.usuario_id !== usuario.id) {
      return res.status(403).json({
        error: 'No tienes permisos para ver este pedido'
      });
    }

    let paymentInfo = null;
    
    // Si hay un ID de Mercado Pago, obtener información actualizada
    if (pedido.mercadopago_id) {
      try {
        // Buscar pagos asociados a la preferencia
        const payments = await getPaymentInfo(pedido.mercadopago_id);
        paymentInfo = payments;
      } catch (error) {
        console.warn('Error obteniendo info de pago:', error.message);
      }
    }

    res.json({
      success: true,
      pedido: {
        id: pedido.id,
        estado: pedido.estado,
        total: pedido.total,
        mercadopago_id: pedido.mercadopago_id,
        mercadopago_status: pedido.mercadopago_status,
        fecha: pedido.fecha
      },
      payment_info: paymentInfo
    });

  } catch (error) {
    console.error('Error obteniendo estado de pago:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * POST /pago/simular-pago
 * Simular pago exitoso (solo para desarrollo/testing)
 */
router.post('/simular-pago', [
  authenticateToken,
  body('pedido_id').isInt({ min: 1 }).withMessage('pedido_id debe ser un número entero positivo')
], async (req, res) => {
  try {
    // Solo permitir en desarrollo
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        error: 'Endpoint no disponible en producción'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { pedido_id } = req.body;
    
    // Obtener usuario
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Obtener pedido
    const pedido = await Pedido.findByPk(pedido_id);
    
    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }
    
    // Verificar permisos
    if (pedido.usuario_id !== usuario.id) {
      return res.status(403).json({
        error: 'No tienes permisos para simular el pago de este pedido'
      });
    }
    
    // Verificar que esté pendiente
    if (pedido.estado !== 'pendiente') {
      return res.status(400).json({
        error: 'El pedido no está pendiente',
        estado_actual: pedido.estado
      });
    }

    // Simular pago exitoso
    await pedido.update({
      estado: 'pagado',
      mercadopago_status: 'approved'
    });

    res.json({
      success: true,
      message: 'Pago simulado exitosamente',
      pedido: {
        id: pedido.id,
        estado: pedido.estado,
        total: pedido.total
      }
    });

  } catch (error) {
    console.error('Error simulando pago:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /pago/metodos
 * Obtener métodos de pago disponibles
 */
router.get('/metodos', async (req, res) => {
  try {
    // En una implementación real, podrías obtener los métodos desde Mercado Pago
    const metodos = [
      {
        id: 'visa',
        name: 'Visa',
        payment_type_id: 'credit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/0daa1670-5c81-11ec-ae75-df2bef173be2-xl@2x.png'
      },
      {
        id: 'master',
        name: 'Mastercard',
        payment_type_id: 'credit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-xl@2x.png'
      },
      {
        id: 'amex',
        name: 'American Express',
        payment_type_id: 'credit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-xl@2x.png'
      }
    ];

    res.json({
      success: true,
      metodos
    });

  } catch (error) {
    console.error('Error obteniendo métodos de pago:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;