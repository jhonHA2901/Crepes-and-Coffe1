const express = require('express');
const router = express.Router();
const { Evento, CategoriaEvento, ReservaEvento, Usuario } = require('../models');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Obtener todos los eventos activos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { activo: true },
      include: [{ model: CategoriaEvento, as: 'categoria' }],
      order: [['fecha', 'ASC']]
    });
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// Obtener eventos destacados
router.get('/destacados', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { 
        activo: true,
        destacado: true 
      },
      include: [{ model: CategoriaEvento, as: 'categoria' }],
      order: [['fecha', 'ASC']],
      limit: 4
    });
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos destacados:', error);
    res.status(500).json({ error: 'Error al obtener eventos destacados' });
  }
});

// Obtener eventos por categoría
router.get('/categoria/:categoriaId', async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const eventos = await Evento.findAll({
      where: { 
        activo: true,
        categoria_id: categoriaId 
      },
      include: [{ model: CategoriaEvento, as: 'categoria' }],
      order: [['fecha', 'ASC']]
    });
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos por categoría:', error);
    res.status(500).json({ error: 'Error al obtener eventos por categoría' });
  }
});

// Obtener un evento específico por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id, {
      include: [{ model: CategoriaEvento, as: 'categoria' }]
    });
    
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    
    res.json(evento);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).json({ error: 'Error al obtener evento' });
  }
});

// Crear un nuevo evento (solo admin)
router.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const nuevoEvento = await Evento.create(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

// Actualizar un evento (solo admin)
router.put('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);
    
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    
    await evento.update(req.body);
    res.json(evento);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Error al actualizar evento' });
  }
});

// Eliminar un evento (solo admin)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);
    
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    
    // En lugar de eliminar, marcamos como inactivo
    await evento.update({ activo: false });
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
});

// Obtener todas las categorías de eventos
router.get('/categorias/all', async (req, res) => {
  try {
    const categorias = await CategoriaEvento.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías de eventos:', error);
    res.status(500).json({ error: 'Error al obtener categorías de eventos' });
  }
});

module.exports = router;