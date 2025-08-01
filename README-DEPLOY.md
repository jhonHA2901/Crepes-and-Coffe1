# Instrucciones de Despliegue en Railway

## Correcciones Implementadas

Se han realizado las siguientes correcciones para resolver el error "Not Found" en Railway:

1. **Configuración de Variables de Entorno**:
   - Se ha actualizado el archivo `.env.railway` para utilizar correctamente las variables de entorno de Railway para MySQL.
   - Se ha añadido soporte para la variable `MYSQL_URL` como alternativa a las variables individuales de base de datos.

2. **Política de Reinicio**:
   - Se ha modificado `railway.json` para cambiar la política de reinicio de `NEVER` a `ON_FAILURE`.
   - Se ha aumentado el tiempo de espera del health check de 100ms a 300ms.

3. **Verificación de Variables de Entorno**:
   - Se ha actualizado el script `check-env.js` para verificar la presencia de `MYSQL_URL` o las variables individuales de base de datos.

4. **Configuración de Nixpacks**:
   - Se ha actualizado `nixpacks.toml` para incluir dependencias de MySQL y mejorar la configuración de despliegue.

## Pasos para Desplegar en Railway

### 1. Preparación del Repositorio

- Asegúrate de que todos los cambios estén confirmados y subidos a tu repositorio de GitHub.

### 2. Configuración en Railway

1. **Crear un Nuevo Proyecto**:
   - Inicia sesión en [Railway](https://railway.app/).
   - Haz clic en "New Project" y selecciona "Deploy from GitHub repo".
   - Selecciona tu repositorio.

2. **Configurar Variables de Entorno**:
   - En la sección "Variables", añade todas las variables de entorno necesarias según el archivo `.env.railway`.
   - Railway proporcionará automáticamente las variables para MySQL si has añadido un servicio de MySQL.

3. **Añadir Servicio de MySQL**:
   - Haz clic en "New" y selecciona "Database" > "MySQL".
   - Railway configurará automáticamente un servicio de MySQL y proporcionará las variables de conexión.

### 3. Verificación del Despliegue

1. **Comprobar Logs**:
   - Revisa los logs del despliegue para asegurarte de que no hay errores.
   - Verifica que la aplicación se inicia correctamente y se conecta a la base de datos.

2. **Probar el Health Check**:
   - Accede a la URL pública de tu aplicación seguida de `/health`.
   - Deberías recibir una respuesta JSON con estado "OK".

3. **Probar la API**:
   - Realiza algunas peticiones a los endpoints de la API para verificar que todo funciona correctamente.

## Solución de Problemas

Si sigues experimentando problemas, verifica lo siguiente:

1. **Logs de Railway**:
   - Revisa los logs detallados para identificar posibles errores.

2. **Variables de Entorno**:
   - Asegúrate de que todas las variables de entorno requeridas están configuradas correctamente.

3. **Conexión a la Base de Datos**:
   - Verifica que la aplicación puede conectarse a la base de datos de MySQL.
   - Comprueba que la base de datos tiene las tablas necesarias.

4. **Health Check**:
   - Asegúrate de que el endpoint `/health` responde correctamente.

## Configuración del Frontend

Recuerda actualizar la configuración del frontend para que apunte a la URL de la API desplegada en Railway:

```javascript
// En el archivo de configuración del frontend
const API_URL = 'https://tu-app.railway.app';
```

---

Con estas correcciones, tu aplicación debería desplegarse correctamente en Railway y el error "Not Found" debería estar resuelto.