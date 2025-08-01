import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithGoogle, signOutUser } from '../config/firebase';
import { verifyToken, logout as apiLogout } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Escuchar cambios en Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Obtener token y verificar con el backend
          const idToken = await firebaseUser.getIdToken();
          const response = await verifyToken(idToken);
          
          if (response.success) {
            setUser(response.user);
            setIsAdmin(response.user.rol === 'admin');
            
            // Guardar datos en localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('isAdmin', response.user.rol === 'admin');
          }
        } catch (error) {
          console.error('Error verificando token:', error);
          toast.error('Error de autenticación');
          setUser(null);
          setIsAdmin(false);
          localStorage.removeItem('user');
          localStorage.removeItem('isAdmin');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAdmin(savedIsAdmin === 'true');
      } catch (error) {
        console.error('Error cargando usuario desde localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      }
    }
  }, []);

  /**
   * Iniciar sesión con Google
   */
  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      
      // Verificar token con el backend
      const response = await verifyToken(result.idToken);
      
      if (response.success) {
        setUser(response.user);
        setFirebaseUser(result.user);
        setIsAdmin(response.user.rol === 'admin');
        
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('isAdmin', response.user.rol === 'admin');
        
        toast.success(`¡Bienvenido, ${response.user.nombre}!`);
        return response.user;
      } else {
        throw new Error('Error verificando usuario');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      setLoading(true);
      
      // Notificar al backend
      try {
        await apiLogout();
      } catch (error) {
        console.warn('Error notificando logout al backend:', error);
      }
      
      // Cerrar sesión en Firebase
      await signOutUser();
      
      // Limpiar estado
      setUser(null);
      setFirebaseUser(null);
      setIsAdmin(false);
      
      // Limpiar localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('cart');
      
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar datos del usuario
   */
  const updateUser = (userData) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  /**
   * Verificar si el usuario está autenticado
   */
  const isAuthenticated = () => {
    return !!user && !!firebaseUser;
  };

  /**
   * Obtener token del usuario actual
   */
  const getToken = async () => {
    if (firebaseUser) {
      try {
        return await firebaseUser.getIdToken();
      } catch (error) {
        console.error('Error obteniendo token:', error);
        return null;
      }
    }
    return null;
  };

  /**
   * Refrescar datos del usuario
   */
  const refreshUser = async () => {
    if (firebaseUser) {
      try {
        const idToken = await firebaseUser.getIdToken(true); // Forzar refresh
        const response = await verifyToken(idToken);
        
        if (response.success) {
          setUser(response.user);
          setIsAdmin(response.user.rol === 'admin');
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('isAdmin', response.user.rol === 'admin');
        }
      } catch (error) {
        console.error('Error refrescando usuario:', error);
      }
    }
  };

  const value = {
    // Estado
    user,
    firebaseUser,
    loading,
    isAdmin,
    
    // Métodos
    login,
    logout,
    updateUser,
    isAuthenticated,
    getToken,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;