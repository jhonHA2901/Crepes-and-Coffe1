const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const CategoriaEvento = require('./CategoriaEvento');

const Evento = sequelize.define('Evento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descripcion_larga: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  imagen_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plazas_disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias_eventos',
      key: 'id'
    }
  },
  destacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  instructor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  instructor_bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instructor_imagen: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'eventos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

// Establecer relación con CategoriaEvento
Evento.belongsTo(CategoriaEvento, { foreignKey: 'categoria_id', as: 'categoria' });

module.exports = Evento;