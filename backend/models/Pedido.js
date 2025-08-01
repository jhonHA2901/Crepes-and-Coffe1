const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
    defaultValue: 'pendiente',
    allowNull: false
  },
  mercadopago_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true
  },
  mercadopago_status: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_actualizacion'
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  createdAt: 'fecha',
  updatedAt: 'fecha_actualizacion',
  indexes: [
    {
      fields: ['usuario_id']
    },
    {
      fields: ['estado']
    },
    {
      fields: ['mercadopago_id']
    },
    {
      fields: ['fecha']
    }
  ],
  scopes: {
    pendientes: {
      where: {
        estado: 'pendiente'
      }
    },
    pagados: {
      where: {
        estado: 'pagado'
      }
    },
    porUsuario: (usuarioId) => ({
      where: {
        usuario_id: usuarioId
      }
    })
  }
});

module.exports = Pedido;