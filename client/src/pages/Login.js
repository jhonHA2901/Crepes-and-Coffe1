import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Login = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect path after login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // If user is already logged in, redirect
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleGoogleLogin = async () => {
    try {
      await login();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Error en login:', error);
      // Error is already handled in the login function
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Verificando autenticación..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 text-amber-700">
            <i className="fas fa-coffee text-4xl"></i>
            <span className="text-2xl font-bold">Crepes & Coffee</span>
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Accede a tu cuenta para realizar pedidos y gestionar tu perfil
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          {/* Welcome message */}
          <div className="mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-circle text-2xl text-amber-700"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¡Bienvenido de vuelta!
              </h3>
              <p className="text-gray-600 text-sm">
                Inicia sesión con tu cuenta de Google para continuar
              </p>
            </div>
          </div>

          {/* Google Login Button */}
          <div>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-3" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Por qué iniciar sesión?</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-shopping-cart text-green-600 text-sm"></i>
                </div>
                <span className="text-sm text-gray-700">Realizar pedidos y gestionar tu carrito</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-history text-blue-600 text-sm"></i>
                </div>
                <span className="text-sm text-gray-700">Ver el historial de tus pedidos</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-purple-600 text-sm"></i>
                </div>
                <span className="text-sm text-gray-700">Personalizar tu perfil y preferencias</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-star text-amber-600 text-sm"></i>
                </div>
                <span className="text-sm text-gray-700">Acceder a ofertas y promociones exclusivas</span>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <i className="fas fa-shield-alt text-green-500 mt-0.5"></i>
              <div>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Seguro y confiable:</span> Utilizamos Google OAuth para garantizar la seguridad de tu cuenta. No almacenamos tu contraseña y tu información está protegida.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="font-medium text-amber-600 hover:text-amber-500">
              Regístrate aquí
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            ¿Problemas para iniciar sesión?{' '}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              Contacta con soporte
            </a>
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-amber-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-amber-200 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Login;