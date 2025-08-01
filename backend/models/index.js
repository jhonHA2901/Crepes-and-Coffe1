const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Pedido = require('./Pedido');
const DetallePedido = require('./DetallePedido');
const CategoriaEvento = require('./CategoriaEvento');
const Evento = require('./Evento');
const ReservaEvento = require('./ReservaEvento');

// Definir relaciones entre modelos

// Usuario - Pedidos (1:N)
Usuario.hasMany(Pedido, {
  foreignKey: 'usuario_id',
  as: 'pedidos',
  onDelete: 'CASCADE'
});

Pedido.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Pedido - DetallePedidos (1:N)
Pedido.hasMany(DetallePedido, {
  foreignKey: 'pedido_id',
  as: 'detalles',
  onDelete: 'CASCADE'
});

DetallePedido.belongsTo(Pedido, {
  foreignKey: 'pedido_id',
  as: 'pedido'
});

// Producto - DetallePedidos (1:N)
Producto.hasMany(DetallePedido, {
  foreignKey: 'producto_id',
  as: 'detalles_pedidos',
  onDelete: 'CASCADE'
});

DetallePedido.belongsTo(Producto, {
  foreignKey: 'producto_id',
  as: 'producto'
});

// Relación Many-to-Many entre Usuario y Producto a través de Pedidos
// (Un usuario puede comprar muchos productos, un producto puede ser comprado por muchos usuarios)
Usuario.belongsToMany(Producto, {
  through: {
    model: DetallePedido,
    unique: false
  },
  foreignKey: 'usuario_id',
  otherKey: 'producto_id',
  as: 'productos_comprados'
});

Producto.belongsToMany(Usuario, {
  through: {
    model: DetallePedido,
    unique: false
  },
  foreignKey: 'producto_id',
  otherKey: 'usuario_id',
  as: 'compradores'
});

// Relaciones para eventos

// CategoriaEvento - Eventos (1:N)
CategoriaEvento.hasMany(Evento, {
  foreignKey: 'categoria_id',
  as: 'eventos',
  onDelete: 'RESTRICT'
});

// Usuario - ReservasEvento (1:N)
Usuario.hasMany(ReservaEvento, {
  foreignKey: 'usuario_id',
  as: 'reservas_eventos',
  onDelete: 'CASCADE'
});

ReservaEvento.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario_reserva'
});

// Evento - ReservasEvento (1:N)
Evento.hasMany(ReservaEvento, {
  foreignKey: 'evento_id',
  as: 'reservas',
  onDelete: 'RESTRICT'
});

ReservaEvento.belongsTo(Evento, {
  foreignKey: 'evento_id',
  as: 'evento_reservado'
});

// Relación Many-to-Many entre Usuario y Evento a través de ReservasEvento
// (Un usuario puede reservar muchos eventos, un evento puede ser reservado por muchos usuarios)
Usuario.belongsToMany(Evento, {
  through: {
    model: ReservaEvento,
    unique: false
  },
  foreignKey: 'usuario_id',
  otherKey: 'evento_id',
  as: 'eventos_reservados'
});

Evento.belongsToMany(Usuario, {
  through: {
    model: ReservaEvento,
    unique: false
  },
  foreignKey: 'evento_id',
  otherKey: 'usuario_id',
  as: 'asistentes'
});

module.exports = {
  Usuario,
  Producto,
  Pedido,
  DetallePedido,
  CategoriaEvento,
  Evento,
  ReservaEvento
};