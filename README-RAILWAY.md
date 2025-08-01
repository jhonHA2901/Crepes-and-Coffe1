# Despliegue en Railway - Crepes & Coffee

Este documento contiene las instrucciones para desplegar el proyecto Crepes & Coffee en Railway.

## Requisitos previos

- Cuenta en [Railway](https://railway.app/)
- Git instalado en tu máquina local
- Repositorio del proyecto en GitHub

## Pasos para el despliegue

### 1. Preparación del proyecto

El proyecto ya está configurado para Railway con los siguientes archivos:

- `Procfile`: Define el comando para iniciar la aplicación
- `railway.toml`: Configuración específica para Railway

### 2. Despliegue en Railway

#### Opción 1: Despliegue desde GitHub

1. Inicia sesión en [Railway](https://railway.app/)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Selecciona el repositorio `harryhuaman2901-a11y/Crepes-and-Coffee-`
5. Railway detectará automáticamente la configuración del proyecto

#### Opción 2: Despliegue desde CLI

1. Instala Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Inicia sesión en Railway:
   ```bash
   railway login
   ```

3. Vincula el proyecto:
   ```bash
   railway link
   ```

4. Despliega el proyecto:
   ```bash
   railway up
   ```

### 3. Configuración de variables de entorno

Configura las siguientes variables de entorno en Railway:

```
# Database Configuration
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=crepes_and_coffee
PORT=3000

# Firebase Configuration
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Mercado Pago Configuration
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_PUBLIC_KEY=

# App Configuration
NODE_ENV=production
FRONTEND_URL=
ADMIN_URL=
BACKEND_URL=
```

### 4. Base de datos

1. En Railway, agrega un servicio de MySQL:
   - Haz clic en "New"
   - Selecciona "Database"
   - Selecciona "MySQL"

2. Railway proporcionará automáticamente las variables de entorno para la conexión a la base de datos.

3. Importa el esquema de la base de datos:
   - Puedes usar la opción de importar SQL desde Railway
   - O ejecutar el script `database/schema.sql` manualmente

### 5. Verificación del despliegue

1. Una vez completado el despliegue, Railway proporcionará una URL para acceder a tu aplicación
2. Verifica que la aplicación funcione correctamente accediendo a la ruta `/health`

### 6. Configuración del frontend

Para el frontend (cliente y admin), necesitarás actualizar las variables de entorno para que apunten a la URL del backend desplegado en Railway:

```
REACT_APP_API_URL=https://tu-app.railway.app
```

## Solución de problemas

- **Error de conexión a la base de datos**: Verifica que las credenciales de la base de datos sean correctas
- **Error en las variables de entorno**: Asegúrate de que todas las variables de entorno estén configuradas correctamente
- **Error en el despliegue**: Revisa los logs de Railway para identificar el problema

## Recursos adicionales

- [Documentación de Railway](https://docs.railway.app/)
- [Guía de despliegue de Node.js en Railway](https://blog.railway.app/p/node-js)