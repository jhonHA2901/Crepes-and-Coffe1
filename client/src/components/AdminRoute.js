import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FullPageSpinner } from './LoadingSpinner';

const AdminRoute = ({ children, redirectTo = '/' }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return <FullPageSpinner text="Verificando permisos de administrador..." />;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Si el usuario no es administrador, redirigir a la página principal
  if (!isAdmin) {
    return (
      <Navigate 
        to={redirectTo} 
        replace 
      />
    );
  }

  // Si el usuario es administrador, mostrar el contenido
  return children;
};

export default AdminRoute;