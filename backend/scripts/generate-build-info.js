/**
 * Script para generar información de la compilación
 * Este script se ejecutará durante el despliegue en Railway
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para obtener la información del commit actual
function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse HEAD').toString().trim();
    const commitDate = execSync('git log -1 --format=%cd').toString().trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    
    return {
      commitHash,
      commitDate,
      branch
    };
  } catch (error) {
    console.warn('No se pudo obtener información de Git:', error.message);
    return {
      commitHash: 'unknown',
      commitDate: new Date().toISOString(),
      branch: 'unknown'
    };
  }
}

// Función para generar el archivo de información de la compilación
function generateBuildInfo() {
  const buildInfo = {
    version: process.env.npm_package_version || '1.0.0',
    buildDate: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    railway: {
      isRailway: process.env.RAILWAY_SERVICE_NAME !== undefined,
      serviceName: process.env.RAILWAY_SERVICE_NAME || 'local',
      publicUrl: process.env.RAILWAY_PUBLIC_URL || 'http://localhost:3000'
    },
    git: getGitInfo()
  };

  // Crear el directorio si no existe
  const buildInfoDir = path.join(__dirname, '../public');
  if (!fs.existsSync(buildInfoDir)) {
    fs.mkdirSync(buildInfoDir, { recursive: true });
  }

  // Escribir el archivo
  const buildInfoPath = path.join(buildInfoDir, 'build-info.json');
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

  console.log(`✅ Archivo de información de compilación generado en ${buildInfoPath}`);
  console.log(buildInfo);
}

// Ejecutar la función
generateBuildInfo();