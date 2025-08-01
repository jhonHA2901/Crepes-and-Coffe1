/**
 * Configuración de la base de datos para Railway
 *
 * Para conectar a MySQL en Railway:
 * 1. Crear una nueva variable en el servicio que deseas conectar a la base de datos
 * 2. Asignarle el valor: ${{ MYSQL.MYSQL_URL }}
 * 3. Usar esta variable como MYSQL_URL en la aplicación
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Detectar si estamos en Railway
const isRailway = process.env.RAILWAY_SERVICE_NAME !== undefined;

// Configuración de la base de datos
let sequelize;

if (isRailway) {
  // En Railway, usar las variables de entorno proporcionadas automáticamente
  console.log('📊 Usando configuración de base de datos de Railway');
  
  // Verificar si existe la URL de conexión proporcionada por Railway
  if (process.env.MYSQL_URL) {
    console.log('📊 Usando URL de conexión de MySQL proporcionada por Railway');
    sequelize = new Sequelize(process.env.MYSQL_URL, {
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
      },
      timezone: '-05:00' // Timezone para Perú/Colombia
    });
  } else {
    // Usar variables individuales si no hay URL de conexión
    console.log('📊 Usando variables individuales de MySQL proporcionadas por Railway');
    sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.MYSQLHOST || process.env.DB_HOST,
      port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
      username: process.env.MYSQLUSER || process.env.DB_USER || 'root',
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'crepes_and_coffee',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
      },
      timezone: '-05:00' // Timezone para Perú/Colombia
    });
  }
} else {
  // Configuración local
  console.log('📊 Usando configuración de base de datos local');
  
  sequelize = new Sequelize(
    process.env.DB_NAME || 'crepes_and_coffee',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || '192.168.2.42',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
      },
      timezone: '-05:00' // Timezone para Perú/Colombia
    }
  );
}

// Test de conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente.');
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection
};