const { verifyFirebaseToken, isUserAdmin } = require('../services/firebase');

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = async (req, res, next) => {
  try {
    // Verificar el token de Firebase
    const decodedToken = await verifyFirebaseToken(req);
    
    if (!decodedToken) {
      return res.status(401).json({ error: 'No autorizado. Token inválido o expirado.' });
    }
    
    // Añadir el usuario decodificado a la solicitud para uso posterior
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ error: 'No autorizado. Error de autenticación.' });
  }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
  try {
    // Primero verificar que el usuario esté autenticado
    const decodedToken = await verifyFirebaseToken(req);
    
    if (!decodedToken) {
      return res.status(401).json({ error: 'No autorizado. Token inválido o expirado.' });
    }
    
    // Verificar si el usuario es administrador
    const userIsAdmin = await isUserAdmin(decodedToken.uid);
    
    if (!userIsAdmin) {
      return res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
    }
    
    // Añadir el usuario decodificado a la solicitud para uso posterior
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error de verificación de administrador:', error);
    res.status(403).json({ error: 'Acceso denegado. Error de verificación de privilegios.' });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin
};