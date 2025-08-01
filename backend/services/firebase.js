const admin = require('firebase-admin');
require('dotenv').config();

// Configuración de Firebase Admin - Deshabilitado temporalmente para desarrollo
/*
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}
*/

// Mock de Firebase Admin para desarrollo
const mockAdmin = {
  auth: () => ({
    verifyIdToken: async (token) => {
      // Simular un usuario autenticado para desarrollo
      return {
        uid: 'mock-user-id',
        email: 'usuario@ejemplo.com',
        name: 'Usuario de Prueba'
      };
    },
    getUser: async (uid) => {
      // Simular datos de usuario para desarrollo
      return {
        uid: uid || 'mock-user-id',
        email: 'usuario@ejemplo.com',
        displayName: 'Usuario de Prueba',
        photoURL: null,
        emailVerified: true,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        }
      };
    },
    createUser: async (userData) => {
      // Simular creación de usuario
      return {
        uid: 'new-mock-user-id',
        email: userData.email,
        displayName: userData.displayName
      };
    },
    deleteUser: async (uid) => {
      // Simular eliminación de usuario
      console.log(`Mock: Usuario ${uid} eliminado`);
      return true;
    }
  })
};

// Usar el mock en desarrollo o admin en producción
const firebaseAdmin = process.env.NODE_ENV === 'production' ? admin : mockAdmin;

/**
 * Verificar token de Firebase
 * @param {Object} req - Objeto de solicitud Express o token directo
 * @returns {Promise<Object>} - Datos del usuario decodificados
 */
const verifyFirebaseToken = async (req) => {
  try {
    // Determinar si se pasó un objeto req o un token directo
    let idToken;
    
    if (typeof req === 'object' && req.headers) {
      // Es un objeto req
      idToken = req.headers.authorization;
    } else {
      // Es un token directo
      idToken = req;
    }
    
    if (!idToken) {
      throw new Error('Token no proporcionado');
    }

    // Remover 'Bearer ' si está presente
    const token = idToken.replace('Bearer ', '');
    
    // Verificar el token usando el admin real o el mock
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    
    return decodedToken;
  } catch (error) {
    console.error('Error al verificar token:', error);
    throw error;
  }
};

/**
 * Middleware para autenticar solicitudes
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }
    
    // Verificar el token
    const user = await verifyFirebaseToken(authHeader);
    
    // Adjuntar el usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

/**
 * Obtener usuario por UID
 * @param {string} uid - UID del usuario en Firebase
 * @returns {Promise<Object>} - Datos del usuario
 */
const getUserByUid = async (uid) => {
  try {
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName || userRecord.email?.split('@')[0],
      picture: userRecord.photoURL,
      email_verified: userRecord.emailVerified,
      created_at: userRecord.metadata.creationTime,
      last_sign_in: userRecord.metadata.lastSignInTime
    };
  } catch (error) {
    console.error('Error obteniendo usuario por UID:', error);
    throw new Error('Usuario no encontrado');
  }
};

/**
 * Crear usuario personalizado en Firebase
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<Object>} - Usuario creado
 */
const createFirebaseUser = async (userData) => {
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email: userData.email,
      displayName: userData.name,
      password: userData.password || Math.random().toString(36).slice(-8),
      emailVerified: false
    });
    
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName
    };
  } catch (error) {
    console.error('Error creando usuario en Firebase:', error);
    throw new Error('Error al crear usuario');
  }
};

/**
 * Eliminar usuario de Firebase
 * @param {string} uid - UID del usuario
 * @returns {Promise<void>}
 */
const deleteFirebaseUser = async (uid) => {
  try {
    await firebaseAdmin.auth().deleteUser(uid);
    console.log(`Usuario ${uid} eliminado de Firebase`);
  } catch (error) {
    console.error('Error eliminando usuario de Firebase:', error);
    throw new Error('Error al eliminar usuario');
  }
};

/**
 * Verificar si un usuario tiene rol de administrador
 * @param {string} uid - UID del usuario
 * @returns {Promise<boolean>} - true si es admin, false si no
 */
const isUserAdmin = async (uid) => {
  try {
    // En un entorno real, aquí verificaríamos en la base de datos
    // si el usuario tiene rol de administrador
    // Para desarrollo, simulamos que ciertos usuarios son admin
    
    // En desarrollo, consideramos admin a un ID específico o al mock
    if (process.env.NODE_ENV !== 'production') {
      return uid === 'mock-user-id' || uid === 'admin-user-id';
    }
    
    // En producción, aquí iría la lógica real para verificar
    // el rol del usuario en la base de datos
    // Por ahora, retornamos false para todos en producción
    return false;
  } catch (error) {
    console.error('Error verificando rol de administrador:', error);
    return false;
  }
};

/**
 * Middleware para verificar rol de administrador
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const requireAdmin = async (req, res, next) => {
  try {
    // Primero verificar autenticación
    await authenticateToken(req, res, () => {});
    
    // Verificar si el usuario es administrador
    const isAdmin = await isUserAdmin(req.user.uid);
    
    if (isAdmin) {
      next();
    } else {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'Se requiere rol de administrador'
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: 'Error de autenticación',
      message: error.message
    });
  }
};

module.exports = {
  verifyFirebaseToken,
  authenticateToken,
  getUserByUid,
  createFirebaseUser,
  deleteFirebaseUser,
  requireAdmin,
  isUserAdmin,
  firebaseAdmin
};