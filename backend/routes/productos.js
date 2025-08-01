const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin } = require('../services/firebase');
const { Producto } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

/**
 * GET /productos
 * Obtener todos los productos (públicos)
 */
router.get('/', [
  query('activos').optional().isBoolean().withMessage('activos debe ser boolean'),
  query('conStock').optional().isBoolean().withMessage('conStock debe ser boolean'),
  query('buscar').optional().isString().withMessage('buscar debe ser string'),
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

    const { 
      activos = 'true', 
      conStock = 'false', 
      buscar = '', 
      limite = '20', 
      pagina = '1' 
    } = req.query;

    // Construir condiciones de búsqueda
    const whereConditions = {};
    
    if (activos === 'true') {
      whereConditions.activo = true;
    }
    
    if (conStock === 'true') {
      whereConditions.stock = {
        [Op.gt]: 0
      };
    }
    
    if (buscar) {
      whereConditions[Op.or] = [
        {
          nombre: {
            [Op.like]: `%${buscar}%`
          }
        },
        {
          descripcion: {
            [Op.like]: `%${buscar}%`
          }
        }
      ];
    }

    // Paginación
    const limit = parseInt(limite);
    const offset = (parseInt(pagina) - 1) * limit;

    const { count, rows: productos } = await Producto.findAndCountAll({
      where: whereConditions,
      limit,
      offset,
      order: [['fecha_creacion', 'DESC']],
      attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen_url', 'stock', 'activo', 'fecha_creacion']
    });

    res.json({
      success: true,
      productos,
      pagination: {
        total: count,
        pagina: parseInt(pagina),
        limite: limit,
        totalPaginas: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /productos/:id
 * Obtener un producto específico
 */
router.get('/:id', [
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
    
    const producto = await Producto.findByPk(id, {
      attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen_url', 'stock', 'activo', 'fecha_creacion']
    });
    
    if (!producto) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      producto
    });
    
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * POST /productos
 * Crear nuevo producto (solo admin)
 */
router.post('/', [
  requireAdmin,
  body('nombre').notEmpty().isLength({ min: 2, max: 100 }).withMessage('Nombre es requerido y debe tener entre 2 y 100 caracteres'),
  body('descripcion').optional().isLength({ max: 1000 }).withMessage('Descripción no puede exceder 1000 caracteres'),
  body('precio').isFloat({ min: 0.01 }).withMessage('Precio debe ser mayor a 0'),
  body('imagen_url').optional().isURL().withMessage('URL de imagen inválida'),
  body('stock').isInt({ min: 0 }).withMessage('Stock debe ser un número entero no negativo'),
  body('activo').optional().isBoolean().withMessage('activo debe ser boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { nombre, descripcion, precio, imagen_url, stock, activo = true } = req.body;
    
    const producto = await Producto.create({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen_url,
      stock: parseInt(stock),
      activo
    });
    
    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen_url: producto.imagen_url,
        stock: producto.stock,
        activo: producto.activo,
        fecha_creacion: producto.fecha_creacion
      }
    });
    
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * PUT /productos/:id
 * Actualizar producto (solo admin)
 */
router.put('/:id', [
  requireAdmin,
  param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo'),
  body('nombre').optional().isLength({ min: 2, max: 100 }).withMessage('Nombre debe tener entre 2 y 100 caracteres'),
  body('descripcion').optional().isLength({ max: 1000 }).withMessage('Descripción no puede exceder 1000 caracteres'),
  body('precio').optional().isFloat({ min: 0.01 }).withMessage('Precio debe ser mayor a 0'),
  body('imagen_url').optional().isURL().withMessage('URL de imagen inválida'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock debe ser un número entero no negativo'),
  body('activo').optional().isBoolean().withMessage('activo debe ser boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }
    
    // Convertir tipos si es necesario
    if (updateData.precio) {
      updateData.precio = parseFloat(updateData.precio);
    }
    if (updateData.stock !== undefined) {
      updateData.stock = parseInt(updateData.stock);
    }
    
    await producto.update(updateData);
    
    res.json({
      success: true,
      message: 'Producto actualizado correctamente',
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen_url: producto.imagen_url,
        stock: producto.stock,
        activo: producto.activo,
        fecha_actualizacion: producto.fecha_actualizacion
      }
    });
    
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * DELETE /productos/:id
 * Eliminar producto (solo admin)
 */
router.delete('/:id', [
  requireAdmin,
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
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }
    
    // Soft delete - marcar como inactivo en lugar de eliminar
    await producto.update({ activo: false });
    
    res.json({
      success: true,
      message: 'Producto desactivado correctamente'
    });
    
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * PATCH /productos/:id/stock
 * Actualizar solo el stock (para uso interno)
 */
router.patch('/:id/stock', [
  requireAdmin,
  param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo'),
  body('stock').isInt({ min: 0 }).withMessage('Stock debe ser un número entero no negativo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { stock } = req.body;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }
    
    await producto.update({ stock: parseInt(stock) });
    
    res.json({
      success: true,
      message: 'Stock actualizado correctamente',
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        stock: producto.stock
      }
    });
    
  } catch (error) {
    console.error('Error actualizando stock:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;