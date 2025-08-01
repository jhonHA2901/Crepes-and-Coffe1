const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Detectar si estamos en Railway
const isRailway = process.env.RAILWAY_SERVICE_NAME !== undefined;

// Usar la configuración de base de datos adecuada
const { sequelize } = isRailway 
  ? require('./config/railway-database')
  : require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productos');
const orderRoutes = require('./routes/pedidos');
const paymentRoutes = require('./routes/pagos');
const eventosRoutes = require('./routes/eventos');
const reservasRoutes = require('./routes/reservas');
const webhooksRoutes = require('./routes/webhooks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
});
app.use(limiter);

// Middleware de logging
app.use(morgan('combined'));

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://192.168.2.42:3001',
    process.env.ADMIN_URL || 'http://192.168.2.42:3002',
    'https://www.mercadopago.com',
    // Permitir solicitudes desde Railway en desarrollo
    process.env.RAILWAY_PUBLIC_URL,
    // Permitir solicitudes desde cualquier origen en desarrollo
    process.env.NODE_ENV === 'development' ? '*' : null
  ].filter(Boolean), // Filtrar valores nulos o undefined
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Crepes and Coffee API is running',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', orderRoutes);
app.use('/pago', paymentRoutes);
app.use('/eventos', eventosRoutes);
app.use('/reservas', reservasRoutes);
app.use('/webhooks', webhooksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.errors
    });
  }
  
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Error de validación de base de datos',
      details: err.errors.map(e => e.message)
    });
  }
  
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    // Sync database models
    await sequelize.sync({ alter: false });
    console.log('✅ Modelos de base de datos sincronizados.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      const healthCheckUrl = process.env.RAILWAY_PUBLIC_URL 
        ? `${process.env.RAILWAY_PUBLIC_URL}/health`
        : `http://192.168.2.42:${PORT}/health`;
      console.log(`🌐 Health check: ${healthCheckUrl}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer();

module.exports = app;