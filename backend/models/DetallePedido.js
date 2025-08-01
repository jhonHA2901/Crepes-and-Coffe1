const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DetallePedido = sequelize.define('DetallePedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pedidos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true
    }
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  }
}, {
  tableName: 'detalle_pedidos',
  timestamps: false,
  indexes: [
    {
      fields: ['pedido_id']
    },
    {
      fields: ['producto_id']
    }
  ],
  hooks: {
    beforeCreate: (detalle, options) => {
      // Calcular subtotal automáticamente
      detalle.subtotal = parseFloat(detalle.precio_unitario) * parseInt(detalle.cantidad);
    },
    beforeUpdate: (detalle, options) => {
      // Recalcular subtotal si cambia cantidad o precio
      if (detalle.changed('cantidad') || detalle.changed('precio_unitario')) {
        detalle.subtotal = parseFloat(detalle.precio_unitario) * parseInt(detalle.cantidad);
      }
    }
  }
});

module.exports = DetallePedido;