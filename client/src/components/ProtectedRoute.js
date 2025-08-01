import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FullPageSpinner } from './LoadingSpinner';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return <FullPageSpinner text="Verificando autenticación..." />;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Si el usuario está autenticado, mostrar el contenido
  return children;
};

export default ProtectedRoute;