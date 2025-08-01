import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { getProfile, updateProfile } from '../services/api';

const Profile = () => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Argentina'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      promotions: true
    }
  });
  const [originalData, setOriginalData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  useEffect(() => {
    // Check if there are changes
    const hasChanged = JSON.stringify(profileData) !== JSON.stringify(originalData);
    setHasChanges(hasChanged);
  }, [profileData, originalData]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      const data = {
        displayName: response.data.displayName || user.displayName || '',
        email: response.data.email || user.email || '',
        phone: response.data.phone || '',
        address: {
          street: response.data.address?.street || '',
          city: response.data.address?.city || '',
          state: response.data.address?.state || '',
          zipCode: response.data.address?.zipCode || '',
          country: response.data.address?.country || 'Argentina'
        },
        preferences: {
          notifications: response.data.preferences?.notifications ?? true,
          newsletter: response.data.preferences?.newsletter ?? true,
          promotions: response.data.preferences?.promotions ?? true
        }
      };
      setProfileData(data);
      setOriginalData(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error('Error loading profile:', error);
      // If profile doesn't exist, use user data from Firebase
      const data = {
        displayName: user.displayName || '',
        email: user.email || '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Argentina'
        },
        preferences: {
          notifications: true,
          newsletter: true,
          promotions: true
        }
      };
      setProfileData(data);
      setOriginalData(JSON.parse(JSON.stringify(data)));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(profileData);
      await updateUserData(profileData);
      setOriginalData(JSON.parse(JSON.stringify(profileData)));
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData(JSON.parse(JSON.stringify(originalData)));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-user text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión para ver tu perfil</h2>
          <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu perfil</p>
          <Link to="/login" className="btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <i className="fas fa-user text-3xl text-amber-600"></i>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {profileData.displayName || 'Usuario'}
                </h2>
                <p className="text-gray-600 text-sm">{profileData.email}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <i className="fas fa-check-circle"></i>
                  <span>Cuenta verificada</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <i className="fab fa-google"></i>
                  <span>Conectado con Google</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                <i className="fas fa-user mr-2 text-amber-600"></i>
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => handleInputChange(null, 'displayName', e.target.value)}
                    className="input-field"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="input-field bg-gray-50 cursor-not-allowed"
                    placeholder="tu@email.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El email no se puede cambiar ya que está vinculado a tu cuenta de Google
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                    className="input-field"
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                <i className="fas fa-map-marker-alt mr-2 text-amber-600"></i>
                Dirección
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={profileData.address.street}
                    onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                    className="input-field"
                    placeholder="Calle y número"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={profileData.address.city}
                    onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                    className="input-field"
                    placeholder="Ciudad"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia
                  </label>
                  <input
                    type="text"
                    value={profileData.address.state}
                    onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                    className="input-field"
                    placeholder="Provincia"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={profileData.address.zipCode}
                    onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                    className="input-field"
                    placeholder="Código postal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País
                  </label>
                  <select
                    value={profileData.address.country}
                    onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                    className="input-field"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Brasil">Brasil</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                <i className="fas fa-cog mr-2 text-amber-600"></i>
                Preferencias
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Notificaciones de pedidos</h4>
                    <p className="text-sm text-gray-600">Recibe notificaciones sobre el estado de tus pedidos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.notifications}
                      onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Newsletter</h4>
                    <p className="text-sm text-gray-600">Recibe noticias y actualizaciones por email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.newsletter}
                      onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Promociones y ofertas</h4>
                    <p className="text-sm text-gray-600">Recibe información sobre descuentos y promociones especiales</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.promotions}
                      onChange={(e) => handleInputChange('preferences', 'promotions', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  {hasChanges ? (
                    <span className="text-amber-600 font-medium">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      Tienes cambios sin guardar
                    </span>
                  ) : (
                    <span className="text-green-600">
                      <i className="fas fa-check-circle mr-1"></i>
                      Todos los cambios guardados
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    disabled={!hasChanges || saving}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancelar
                  </button>
                  
                  <button
                    onClick={handleSave}
                    disabled={!hasChanges || saving}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;