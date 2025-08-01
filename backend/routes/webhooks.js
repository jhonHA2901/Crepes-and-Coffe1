const express = require('express');
const router = express.Router();
const { ReservaEvento, Evento } = require('../models');
const mercadopago = require('../services/mercadopago');

// Webhook para recibir notificaciones de MercadoPago
router.post('/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    // Solo procesamos notificaciones de tipo 'payment'
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Obtener información del pago desde MercadoPago
      const payment = await mercadopago.payment.findById(paymentId);
      
      if (payment && payment.body) {
        const { status, external_reference } = payment.body;
        
        // Buscar la reserva asociada al pago
        const reservaId = external_reference;
        const reserva = await ReservaEvento.findByPk(reservaId, {
          include: [{ model: Evento, as: 'evento' }]
        });
        
        if (!reserva) {
          console.error(`Reserva no encontrada para el pago ${paymentId}`);
          return res.status(200).end(); // Respondemos 200 para que MercadoPago no reintente
        }
        
        // Actualizar el estado de la reserva según el estado del pago
        let nuevoEstado;
        
        switch (status) {
          case 'approved':
            nuevoEstado = 'confirmada';
            break;
          case 'pending':
          case 'in_process':
            nuevoEstado = 'pendiente';
            break;
          case 'rejected':
          case 'cancelled':
          case 'refunded':
            nuevoEstado = 'cancelada';
            break;
          default:
            nuevoEstado = 'pendiente';
        }
        
        // Actualizar la reserva
        await reserva.update({
          estado: nuevoEstado,
          mercadopago_status: status,
          mercadopago_payment_id: paymentId
        });
        
        console.log(`Reserva ${reservaId} actualizada a estado: ${nuevoEstado}`);
      }
    }
    
    res.status(200).end();
  } catch (error) {
    console.error('Error en webhook de MercadoPago:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

module.exports = router;