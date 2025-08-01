/**
 * Script para verificar que todas las variables de entorno necesarias estén configuradas
 */

require('dotenv').config();

// Variables de entorno requeridas
const requiredEnvVars = [
  // Firebase
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  
  // Mercado Pago
  'MERCADO_PAGO_ACCESS_TOKEN',
  'MERCADO_PAGO_PUBLIC_KEY',
  
  // App
  'FRONTEND_URL',
  'ADMIN_URL'
];

// Variables de base de datos (se requiere MYSQL_URL O las variables individuales)
const dbEnvVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME'
];

// Variables de entorno opcionales con valores por defecto
const optionalEnvVars = [
  'PORT',
  'NODE_ENV',
  'BACKEND_URL'
];

// Verificar variables de entorno requeridas
const missingVars = [];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingVars.push(envVar);
  }
}

// Verificar variables de base de datos
// Se requiere MYSQL_URL O todas las variables individuales
if (!process.env.MYSQL_URL) {
  // Si no hay MYSQL_URL, verificar las variables individuales
  const missingDbVars = dbEnvVars.filter(envVar => !process.env[envVar]);
  if (missingDbVars.length > 0) {
    console.error('❌ Faltan variables de conexión a la base de datos:');
    missingDbVars.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('   Se requiere MYSQL_URL o todas las variables individuales de base de datos');
    missingVars.push('MYSQL_URL o variables individuales de DB');
  }
} else {
  console.log('✅ Usando MYSQL_URL para la conexión a la base de datos');
}

// Verificar variables de entorno opcionales
const defaultValues = {
  PORT: '3000',
  NODE_ENV: 'development',
  BACKEND_URL: process.env.RAILWAY_PUBLIC_URL || 'http://localhost:3000'
};

for (const envVar of optionalEnvVars) {
  if (!process.env[envVar]) {
    console.log(`⚠️ Variable de entorno opcional no configurada: ${envVar}, usando valor por defecto: ${defaultValues[envVar]}`);
    process.env[envVar] = defaultValues[envVar];
  }
}

// Mostrar resultados
if (missingVars.length > 0) {
  console.error('❌ Faltan las siguientes variables de entorno requeridas:');
  missingVars.forEach(envVar => console.error(`   - ${envVar}`));
  
  // En Railway, no detener la aplicación si faltan variables
  if (process.env.RAILWAY_SERVICE_NAME) {
    console.warn('⚠️ Ejecutando en Railway, continuando a pesar de las variables faltantes...');
  } else {
    console.error('❌ Por favor, configura estas variables en el archivo .env o en las variables de entorno del sistema.');
    process.exit(1);
  }
} else {
  console.log('✅ Todas las variables de entorno requeridas están configuradas.');
}

// Verificar formato de FIREBASE_PRIVATE_KEY
if (process.env.FIREBASE_PRIVATE_KEY && !process.env.FIREBASE_PRIVATE_KEY.includes('\n')) {
  console.warn('⚠️ FIREBASE_PRIVATE_KEY no contiene saltos de línea (\\n). Esto puede causar problemas de autenticación.');
}

// Verificar URLs
const urlVars = ['FRONTEND_URL', 'ADMIN_URL', 'BACKEND_URL'];
for (const urlVar of urlVars) {
  if (process.env[urlVar] && !process.env[urlVar].startsWith('http')) {
    console.warn(`⚠️ ${urlVar} no comienza con http:// o https://: ${process.env[urlVar]}`);
  }
}

// Mostrar información de entorno
console.log('📊 Información de entorno:');
console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   - PORT: ${process.env.PORT}`);

// Mostrar información de base de datos
if (process.env.MYSQL_URL) {
  console.log(`   - MYSQL_URL: ${process.env.MYSQL_URL.substring(0, 20)}...`);
} else {
  console.log(`   - DB_HOST: ${process.env.DB_HOST}`);
  console.log(`   - DB_NAME: ${process.env.DB_NAME}`);
  console.log(`   - DB_USER: ${process.env.DB_USER}`);
}

console.log(`   - FRONTEND_URL: ${process.env.FRONTEND_URL}`);
console.log(`   - ADMIN_URL: ${process.env.ADMIN_URL}`);
console.log(`   - BACKEND_URL: ${process.env.BACKEND_URL || 'No configurado'}`);

// Verificar si estamos en Railway
if (process.env.RAILWAY_SERVICE_NAME) {
  console.log('🚂 Ejecutando en Railway:');
  console.log(`   - Service: ${process.env.RAILWAY_SERVICE_NAME}`);
  console.log(`   - Public URL: ${process.env.RAILWAY_PUBLIC_URL || 'No disponible'}`);
}