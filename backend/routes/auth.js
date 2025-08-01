const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyFirebaseToken, authenticateToken } = require('../services/firebase');
const { Usuario } = require('../models');

const router = express.Router();

/**
 * POST /auth/verify-token
 * Verificar token de Firebase y crear/obtener usuario
 */
router.post('/verify-token', [
  body('token').notEmpty().withMessage('Token es requerido')
], async (req, res) => {
  try {
    // Validar entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { token } = req.body;
    
    // Verificar token con Firebase
    const firebaseUser = await verifyFirebaseToken(token);
    
    // Buscar o crear usuario en la base de datos
    let usuario = await Usuario.findOne({
      where: { firebase_uid: firebaseUser.uid }
    });
    
    if (!usuario) {
      // Crear nuevo usuario
      usuario = await Usuario.create({
        firebase_uid: firebaseUser.uid,
        nombre: firebaseUser.name,
        email: firebaseUser.email,
        rol: 'cliente'
      });
      
      console.log(`Nuevo usuario creado: ${usuario.email}`);
    } else {
      // Actualizar información si es necesario
      if (usuario.nombre !== firebaseUser.name || usuario.email !== firebaseUser.email) {
        await usuario.update({
          nombre: firebaseUser.name,
          email: firebaseUser.email
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Token verificado correctamente',
      user: {
        id: usuario.id,
        firebase_uid: usuario.firebase_uid,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        fecha_creacion: usuario.fecha_creacion
      }
    });
    
  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(401).json({
      error: 'Token inválido',
      message: error.message
    });
  }
});

/**
 * GET /auth/profile
 * Obtener perfil del usuario autenticado
 */
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid },
      attributes: ['id', 'firebase_uid', 'nombre', 'email', 'rol', 'fecha_creacion']
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      user: usuario
    });
    
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * PUT /auth/profile
 * Actualizar perfil del usuario
 */
router.put('/profile', [
  authenticateToken,
  body('nombre').optional().isLength({ min: 2, max: 100 }).withMessage('Nombre debe tener entre 2 y 100 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { nombre } = req.body;
    
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    await usuario.update({ nombre });
    
    res.json({
      success: true,
      message: 'Perfil actualizado correctamente',
      user: {
        id: usuario.id,
        firebase_uid: usuario.firebase_uid,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
    
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * POST /auth/logout
 * Cerrar sesión (principalmente para logging)
 */
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    console.log(`Usuario ${req.user.email} cerró sesión`);
    
    res.json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
    
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /auth/check-admin
 * Verificar si el usuario es administrador
 */
router.get('/check-admin', authenticateToken, async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { firebase_uid: req.user.uid }
    });
    
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      isAdmin: usuario.rol === 'admin',
      rol: usuario.rol
    });
    
  } catch (error) {
    console.error('Error verificando rol de admin:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;