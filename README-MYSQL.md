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

## Gestión de la base de datos en Railway

### Acceso a la interfaz de MySQL

Para gestionar tu base de datos MySQL en Railway:

1. Ve al panel de control de Railway
2. Selecciona el servicio MySQL de tu proyecto
3. Haz clic en la pestaña "Data" para acceder a la interfaz de gestión

### Crear tablas en MySQL

Puedes crear tablas directamente desde la interfaz de Railway:

1. En la pestaña "Data" del servicio MySQL, haz clic en "Create table"
2. Ingresa el nombre de la tabla en el campo "table name" (por ejemplo, "my-table")
3. Define las columnas de la tabla:
   - **column name**: Nombre de la columna (por ejemplo, "id")
   - **type**: Tipo de datos (por ejemplo, "serial" para auto-incremento)
   - **default**: Valor por defecto (opcional)
   - **constraints**: Restricciones como "Primary Key"
4. Haz clic en "Add column" para agregar más columnas si es necesario
5. Finalmente, haz clic en "Create" para crear la tabla

![Creación de tablas en MySQL Railway](./imagenes/railway/mysql-railway-create-table.png)

#### Tipos de datos comunes en MySQL

Al crear tablas, puedes utilizar los siguientes tipos de datos:

- **VARCHAR(n)**: Para cadenas de texto de longitud variable (máximo n caracteres)
- **TEXT**: Para textos largos
- **INT**: Para números enteros
- **DECIMAL(p,s)**: Para números decimales (p dígitos en total, s decimales)
- **DATE**: Para fechas (YYYY-MM-DD)
- **DATETIME**: Para fechas con hora (YYYY-MM-DD HH:MM:SS)
- **BOOLEAN**: Para valores verdadero/falso
- **SERIAL**: Para columnas auto-incrementales (útil para IDs)

#### Restricciones comunes

- **Primary Key**: Identifica de manera única cada registro en la tabla
- **Foreign Key**: Establece relaciones entre tablas
- **Unique**: Asegura que todos los valores en la columna sean únicos
- **Not Null**: Asegura que la columna no pueda tener valores NULL
- **Default**: Establece un valor predeterminado

## Solución de problemas

Si encuentras problemas con la conexión a MySQL:

1. Verifica que la variable `MYSQL_URL` esté correctamente configurada en Railway
2. Asegúrate de que el servicio MySQL esté en ejecución
3. Comprueba los logs de la aplicación para ver mensajes de error específicos