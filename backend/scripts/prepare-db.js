/**
 * Script para preparar la base de datos en Railway
 * Este script se ejecutará automáticamente cuando se despliegue la aplicación
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  multipleStatements: true
};

// Función para ejecutar el script SQL
async function executeSqlScript() {
  console.log('🔄 Preparando base de datos...');
  
  let connection;
  
  try {
    // Conectar a la base de datos
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
      multipleStatements: true
    });
    
    console.log('✅ Conexión a MySQL establecida correctamente.');
    
    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Base de datos '${dbConfig.database}' creada o verificada.`);
    
    // Usar la base de datos
    await connection.query(`USE ${dbConfig.database}`);
    
    // Leer el archivo SQL
    const sqlFilePath = path.join(__dirname, '../../database/schema.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Dividir el script en declaraciones individuales
    const statements = sqlScript.split(';').filter(statement => statement.trim() !== '');
    
    // Ejecutar cada declaración por separado
    for (const statement of statements) {
      try {
        await connection.query(statement + ';');
      } catch (error) {
        // Si la tabla ya existe, continuar con la siguiente declaración
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log(`⚠️ La tabla ya existe: ${error.message}`);
          continue;
        }
        throw error;
      }
    }
    
    console.log('✅ Script SQL ejecutado correctamente.');
    
  } catch (error) {
    console.error('❌ Error al ejecutar el script SQL:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Conexión a MySQL cerrada.');
    }
  }
}

// Ejecutar el script
executeSqlScript();