const express = require('express');
const router = express.Router();
const { ReservaEvento, Evento, Usuario } = require('../models');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const mercadopago = require('../services/mercadopago');

// Obtener todas las reservas del usuario autenticado
router.get('/mis-reservas', isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const reservas = await ReservaEvento.findAll({
      where: { usuario_id: usuarioId },
      include: [{ model: Evento, as: 'evento' }],
      order: [['fecha_reserva', 'DESC']]
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Obtener una reserva específica por ID (solo el propietario o admin)
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const esAdmin = req.user.rol === 'admin';
    
    const reserva = await ReservaEvento.findByPk(id, {
      include: [{ model: Evento, as: 'evento' }, { model: Usuario, as: 'usuario' }]
    });
    
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    
    // Verificar que el usuario sea el propietario o un administrador
    if (reserva.usuario_id !== usuarioId && !esAdmin) {
      return res.status(403).json({ error: 'No tienes permiso para ver esta reserva' });
    }
    
    res.json(reserva);
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({ error: 'Error al obtener reserva' });
  }
});

// Crear una nueva reserva
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { evento_id, cantidad } = req.body;
    const usuarioId = req.user.id;
    
    // Verificar que el evento exista y tenga plazas disponibles
    const evento = await Evento.findByPk(evento_id);
    
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    
    if (!evento.activo) {
      return res.status(400).json({ error: 'Este evento no está disponible para reservas' });
    }
    
    if (evento.plazas_disponibles < cantidad) {
      return res.status(400).json({ error: 'No hay suficientes plazas disponibles' });
    }
    
    // Calcular el total
    const precioUnitario = parseFloat(evento.precio);
    const total = precioUnitario * cantidad;
    
    // Crear la reserva
    const nuevaReserva = await ReservaEvento.create({
      evento_id,
      usuario_id: usuarioId,
      cantidad,
      precio_unitario: precioUnitario,
      total,
      estado: 'pendiente'
    });
    
    // Crear preferencia de pago en MercadoPago
    const preference = {
      items: [
        {
          title: `Reserva para ${evento.titulo}`,
          unit_price: precioUnitario,
          quantity: cantidad,
          currency_id: 'ARS', // Ajustar según el país
          description: `Reserva de ${cantidad} plaza(s) para el evento ${evento.titulo} el ${evento.fecha}`
        }
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/reserva-exitosa/${nuevaReserva.id}`,
        failure: `${process.env.FRONTEND_URL}/reserva-fallida/${nuevaReserva.id}`,
        pending: `${process.env.FRONTEND_URL}/reserva-pendiente/${nuevaReserva.id}`
      },
      auto_return: 'approved',
      external_reference: nuevaReserva.id.toString(),
      notification_url: `${process.env.BACKEND_URL}/api/webhooks/mercadopago`
    };
    
    const response = await mercadopago.preferences.create(preference);
    
    // Actualizar la reserva con el ID de MercadoPago
    await nuevaReserva.update({
      mercadopago_id: response.body.id
    });
    
    res.status(201).json({
      reserva: nuevaReserva,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
});

// Cancelar una reserva (solo el propietario o admin)
router.put('/:id/cancelar', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const esAdmin = req.user.rol === 'admin';
    
    const reserva = await ReservaEvento.findByPk(id, {
      include: [{ model: Evento, as: 'evento' }]
    });
    
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    
    // Verificar que el usuario sea el propietario o un administrador
    if (reserva.usuario_id !== usuarioId && !esAdmin) {
      return res.status(403).json({ error: 'No tienes permiso para cancelar esta reserva' });
    }
    
    // Solo se pueden cancelar reservas pendientes o confirmadas
    if (reserva.estado === 'cancelada') {
      return res.status(400).json({ error: 'Esta reserva ya está cancelada' });
    }
    
    // Actualizar el estado de la reserva
    await reserva.update({ estado: 'cancelada' });
    
    // El trigger en la base de datos se encargará de restaurar las plazas disponibles
    
    res.json({ message: 'Reserva cancelada correctamente', reserva });
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    res.status(500).json({ error: 'Error al cancelar reserva' });
  }
});

// Obtener todas las reservas (solo admin)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const reservas = await ReservaEvento.findAll({
      include: [
        { model: Evento, as: 'evento' },
        { model: Usuario, as: 'usuario' }
      ],
      order: [['fecha_reserva', 'DESC']]
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener todas las reservas:', error);
    res.status(500).json({ error: 'Error al obtener todas las reservas' });
  }
});

// Actualizar estado de una reserva (solo admin)
router.put('/:id/estado', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    if (!['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }
    
    const reserva = await ReservaEvento.findByPk(id);
    
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    
    await reserva.update({ estado });
    res.json(reserva);
  } catch (error) {
    console.error('Error al actualizar estado de reserva:', error);
    res.status(500).json({ error: 'Error al actualizar estado de reserva' });
  }
});

module.exports = router;