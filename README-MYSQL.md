# Conexión a MySQL en Railway

## Configuración de la conexión a MySQL

Para conectar tu aplicación a una base de datos MySQL en Railway, sigue estos pasos:

### 1. Crear una nueva variable en el servicio

En el servicio que deseas conectar a la base de datos MySQL:

1. Ve a la sección "Variables" del servicio
2. Crea una nueva variable llamada `MYSQL_URL`
3. Asígnale el siguiente valor: `${{ MYSQL.MYSQL_URL }}`

![Configuración de MySQL en Railway](./imagenes/mysql-railway-config.png)

### 2. Uso en la aplicación

La aplicación está configurada para usar esta variable de conexión automáticamente. El archivo `backend/config/railway-database.js` detectará la presencia de la variable `MYSQL_URL` y la utilizará para la conexión.

```javascript
// Verificar si existe la URL de conexión proporcionada por Railway
if (process.env.MYSQL_URL) {
  console.log('📊 Usando URL de conexión de MySQL proporcionada por Railway');
  sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    // ... otras opciones de configuración
  });
}
```

### 3. Variables de entorno

El archivo `.env.railway` incluye la configuración necesaria para usar la variable `MYSQL_URL`:

```
# Usar la variable MYSQL_URL proporcionada por Railway
MYSQL_URL=${{ MYSQL.MYSQL_URL }}
```

## Solución de problemas

Si encuentras problemas con la conexión a MySQL:

1. Verifica que la variable `MYSQL_URL` esté correctamente configurada en Railway
2. Asegúrate de que el servicio MySQL esté en ejecución
3. Comprueba los logs de la aplicación para ver mensajes de error específicos