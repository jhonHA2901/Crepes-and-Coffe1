const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin } = require('../services/firebase');
const { Usuario, Producto, Pedido, DetallePedido } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

const router = express.Router();

/**
 * POST /pedidos
 * Crear nuevo pedido
 */
router.post('/', [
  authenticateToken,
  body('items').isArray({ min: 1 }).withMessage('Items es requerido y debe ser un array'),
  body('items.*.producto_id').isInt({ min: 1 }).withMessage('producto_id debe ser un número entero positivo'),
  body('items.*.cantidad').isInt({ min: 1 }).withMessage('cantidad debe ser un número entero positivo')
], async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { items } = req.body;
    
    // Obtener usuario
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      await transaction.rollback();
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Validar productos y stock
    const productosIds = items.map(item => item.producto_id);
    const productos = await Producto.findAll({
      where: {
        id: {
          [Op.in]: productosIds
        },
        activo: true
      },
      transaction
    });

    if (productos.length !== productosIds.length) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Algunos productos no existen o están inactivos'
      });
    }

    // Verificar stock disponible
    const stockErrors = [];
    let total = 0;
    const detallesData = [];

    for (const item of items) {
      const producto = productos.find(p => p.id === item.producto_id);
      
      if (producto.stock < item.cantidad) {
        stockErrors.push({
          producto: producto.nombre,
          stockDisponible: producto.stock,
          cantidadSolicitada: item.cantidad
        });
      } else {
        const subtotal = parseFloat(producto.precio) * parseInt(item.cantidad);
        total += subtotal;
        
        detallesData.push({
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio,
          subtotal: subtotal
        });
      }
    }

    if (stockErrors.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Stock insuficiente',
        details: stockErrors
      });
    }

    // Crear pedido
    const pedido = await Pedido.create({
      usuario_id: usuario.id,
      total: total,
      estado: 'pendiente'
    }, { transaction });

    // Crear detalles del pedido
    const detalles = await Promise.all(
      detallesData.map(detalle => 
        DetallePedido.create({
          pedido_id: pedido.id,
          ...detalle
        }, { transaction })
      )
    );

    // Actualizar stock de productos
    await Promise.all(
      items.map(item => {
        const producto = productos.find(p => p.id === item.producto_id);
        return producto.update({
          stock: producto.stock - item.cantidad
        }, { transaction });
      })
    );

    await transaction.commit();

    // Obtener pedido completo con relaciones
    const pedidoCompleto = await Pedido.findByPk(pedido.id, {
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen_url']
            }
          ]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Pedido creado correctamente',
      pedido: pedidoCompleto
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error creando pedido:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /pedidos/cliente/:id
 * Obtener pedidos de un cliente específico
 */
router.get('/cliente/:id', [
  authenticateToken,
  param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'ID inválido',
        details: errors.array()
      });
    }

    const { id } = req.params;
    
    // Verificar que el usuario solo pueda ver sus propios pedidos (excepto admin)
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    if (usuario.rol !== 'admin' && usuario.id !== parseInt(id)) {
      return res.status(403).json({
        error: 'No tienes permisos para ver estos pedidos'
      });
    }

    const pedidos = await Pedido.findAll({
      where: { usuario_id: id },
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen_url', 'precio']
            }
          ]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json({
      success: true,
      pedidos
    });

  } catch (error) {
    console.error('Error obteniendo pedidos del cliente:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /pedidos
 * Obtener todos los pedidos (solo admin)
 */
router.get('/', [
  requireAdmin,
  query('estado').optional().isIn(['pendiente', 'pagado', 'cancelado']).withMessage('Estado inválido'),
  query('limite').optional().isInt({ min: 1, max: 100 }).withMessage('limite debe ser entre 1 y 100'),
  query('pagina').optional().isInt({ min: 1 }).withMessage('pagina debe ser mayor a 0')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Parámetros inválidos',
        details: errors.array()
      });
    }

    const { estado, limite = '20', pagina = '1' } = req.query;

    const whereConditions = {};
    if (estado) {
      whereConditions.estado = estado;
    }

    const limit = parseInt(limite);
    const offset = (parseInt(pagina) - 1) * limit;

    const { count, rows: pedidos } = await Pedido.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen_url', 'precio']
            }
          ]
        }
      ],
      limit,
      offset,
      order: [['fecha', 'DESC']]
    });

    res.json({
      success: true,
      pedidos,
      pagination: {
        total: count,
        pagina: parseInt(pagina),
        limite: limit,
        totalPaginas: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /pedidos/:id
 * Obtener un pedido específico
 */
router.get('/:id', [
  authenticateToken,
  param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'ID inválido',
        details: errors.array()
      });
    }

    const { id } = req.params;
    
    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen_url', 'precio']
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
    
    // Verificar permisos
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (usuario.rol !== 'admin' && pedido.usuario_id !== usuario.id) {
      return res.status(403).json({
        error: 'No tienes permisos para ver este pedido'
      });
    }
    
    res.json({
      success: true,
      pedido
    });
    
  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * PUT /pedidos/:id/estado
 * Actualizar estado del pedido (solo admin)
 */
router.put('/:id/estado', [
  requireAdmin,
  param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo'),
  body('estado').isIn(['pendiente', 'pagado', 'cancelado']).withMessage('Estado inválido')
], async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { estado } = req.body;
    
    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto'
            }
          ]
        }
      ],
      transaction
    });
    
    if (!pedido) {
      await transaction.rollback();
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }
    
    const estadoAnterior = pedido.estado;
    
    // Si se cancela un pedido que estaba pendiente, restaurar stock
    if (estadoAnterior === 'pendiente' && estado === 'cancelado') {
      await Promise.all(
        pedido.detalles.map(detalle => 
          detalle.producto.update({
            stock: detalle.producto.stock + detalle.cantidad
          }, { transaction })
        )
      );
    }
    
    await pedido.update({ estado }, { transaction });
    await transaction.commit();
    
    res.json({
      success: true,
      message: `Pedido ${estado} correctamente`,
      pedido: {
        id: pedido.id,
        estado: pedido.estado,
        estadoAnterior
      }
    });
    
  } catch (error) {
    await transaction.rollback();
    console.error('Error actualizando estado del pedido:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /pedidos/mis-pedidos
 * Obtener pedidos del usuario autenticado
 */
router.get('/mis-pedidos', authenticateToken, async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    const pedidos = await Pedido.findAll({
      where: { usuario_id: usuario.id },
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen_url', 'precio']
            }
          ]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json({
      success: true,
      pedidos
    });

  } catch (error) {
    console.error('Error obteniendo mis pedidos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;