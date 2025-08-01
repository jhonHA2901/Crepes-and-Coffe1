# Crepes and Coffee - E-commerce System

## 📋 Descripción
Sistema completo de e-commerce para "Crepes and Coffee" con las siguientes características:

- **Frontend Cliente**: React.js con autenticación Firebase y pagos Mercado Pago
- **Frontend Admin**: Panel de administración para gestión de productos y pedidos
- **Backend API**: Node.js + Express con MySQL
- **Base de Datos**: MySQL con tablas optimizadas
- **Despliegue**: Railway

## 🏗️ Estructura del Proyecto

```
crepes-and-coffee/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── app.js
├── client/
├── admin/
├── database/
│   └── schema.sql
├── .env.example
└── README.md
```

## 🚀 Tecnologías

### Frontend
- React.js
- Firebase Authentication
- Axios
- React Router DOM
- TailwindCSS

### Backend
- Node.js + Express.js
- Sequelize ORM
- MySQL
- Firebase Admin SDK
- Mercado Pago SDK

## 📦 Instalación

### Backend
```bash
cd backend
npm install
```

### Cliente
```bash
cd client
npm install
```

### Admin
```bash
cd admin
npm install
```

## ⚙️ Configuración

1. Crear archivo `.env` en la carpeta backend basado en `.env.example`
2. Configurar base de datos MySQL
3. Configurar Firebase
4. Configurar Mercado Pago

## 🔧 Variables de Entorno

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crepes_and_coffee
PORT=3000

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_PUBLIC_KEY=
```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
# Backend
cd backend && npm run dev

# Cliente
cd client && npm start

# Admin
cd admin && npm start
```

## 📊 Base de Datos
Ejecutar el script `database/schema.sql` para crear las tablas necesarias.

## 🌐 Endpoints API

### Auth
- POST `/auth/verify-token`

### Productos
- GET `/productos`
- POST `/productos` (admin)
- PUT `/productos/:id` (admin)
- DELETE `/productos/:id` (admin)

### Pedidos
- POST `/pedidos`
- GET `/pedidos/cliente/:id`
- GET `/pedidos` (admin)
- PUT `/pedidos/:id/estado` (admin)

### Pagos
- POST `/pago/preferencia`
- POST `/pago/webhook`

## 🚀 Despliegue
El proyecto está configurado para desplegarse en Railway con MySQL.