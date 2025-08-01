import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Verificar si estamos en modo desarrollo
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'crepes-ad923.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'crepes-ad923',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'crepes-ad923.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000'
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Configurar proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Iniciar sesión con Google
 * @returns {Promise<Object>} - Usuario autenticado
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Obtener token de ID
    const idToken = await user.getIdToken();
    
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      },
      idToken
    };
  } catch (error) {
    console.error('Error en login con Google:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Cerrar sesión
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    throw new Error('Error al cerrar sesión');
  }
};

/**
 * Obtener token del usuario actual
 * @returns {Promise<string|null>} - Token de ID o null
 */
export const getCurrentUserToken = async () => {
  // Si estamos en desarrollo, podemos devolver un token mock
  if (isDevelopment) {
    console.log('Usando token mock para desarrollo');
    return 'mock-firebase-token-for-development';
  }
  
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Obtener usuario actual
 * @returns {Object|null} - Usuario actual o null
 */
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
  }
  return null;
};

/**
 * Escuchar cambios en el estado de autenticación
 * @param {Function} callback - Función callback
 * @returns {Function} - Función para cancelar la suscripción
 */
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      });
    } else {
      callback(null);
    }
  });
};

/**
 * Obtener mensaje de error legible
 * @param {string} errorCode - Código de error de Firebase
 * @returns {string} - Mensaje de error
 */
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada.';
    case 'auth/user-not-found':
      return 'No se encontró una cuenta con este email.';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este email.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-email':
      return 'Email inválido.';
    case 'auth/popup-closed-by-user':
      return 'Ventana de login cerrada por el usuario.';
    case 'auth/cancelled-popup-request':
      return 'Solicitud de login cancelada.';
    case 'auth/popup-blocked':
      return 'Popup bloqueado por el navegador.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet.';
    default:
      return 'Error de autenticación. Intenta de nuevo.';
  }
};

export default app;