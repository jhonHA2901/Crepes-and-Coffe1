const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evento = require('./Evento');
const Usuario = require('./Usuario');

const ReservaEvento = sequelize.define('ReservaEvento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'eventos',
      key: 'id'
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  mercadopago_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  mercadopago_status: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'reservas_eventos',
  timestamps: true,
  createdAt: 'fecha_reserva',
  updatedAt: 'fecha_actualizacion'
});

// Establecer relaciones
ReservaEvento.belongsTo(Evento, { foreignKey: 'evento_id', as: 'evento' });
ReservaEvento.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = ReservaEvento;