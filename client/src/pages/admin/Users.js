import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  formatDate,
  formatPrice
} from '../../services/api';

const AdminUsers = () => {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [roleUpdateConfirm, setRoleUpdateConfirm] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(null);

  useEffect(() => {
    if (user && isAdmin) {
      loadUsers();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, roleFilter, sortBy]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Mock data for users since getUsers API doesn't exist
      const mockUsers = [
        {
          id: '1',
          displayName: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true,
          createdAt: new Date().toISOString(),
          phone: '+51 987654321'
        },
        {
          id: '2',
          displayName: 'Customer User',
          email: 'customer@example.com',
          isAdmin: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          phone: '+51 123456789'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      );
    }

    // Apply role filter
    switch (roleFilter) {
      case 'admin':
        filtered = filtered.filter(user => user.isAdmin);
        break;
      case 'customer':
        filtered = filtered.filter(user => !user.isAdmin);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'name_asc':
          return (a.displayName || '').localeCompare(b.displayName || '');
        case 'name_desc':
          return (b.displayName || '').localeCompare(a.displayName || '');
        case 'email_asc':
          return (a.email || '').localeCompare(b.email || '');
        case 'email_desc':
          return (b.email || '').localeCompare(a.email || '');
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    setFilteredUsers(filtered);
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      setUpdatingRole(userId);
      // Mock implementation since updateUserRole API doesn't exist
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user in state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? {...user, isAdmin: newRole} : user
        )
      );
      
      toast.success(`Rol de usuario ${newRole ? 'promovido a administrador' : 'cambiado a cliente'}`);
      setRoleUpdateConfirm(null);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error al actualizar el rol del usuario');
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Mock implementation since deleteUser API doesn't exist
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove user from state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast.success('Usuario eliminado exitosamente');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error al eliminar el usuario');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      toast.warning('Selecciona al menos un usuario');
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update users in state based on action
      switch (action) {
        case 'promote':
          setUsers(prevUsers => 
            prevUsers.map(user => 
              selectedUsers.includes(user.id) ? {...user, isAdmin: true} : user
            )
          );
          break;
        case 'demote':
          setUsers(prevUsers => 
            prevUsers.map(user => 
              selectedUsers.includes(user.id) ? {...user, isAdmin: false} : user
            )
          );
          break;
        case 'delete':
          setUsers(prevUsers => 
            prevUsers.filter(user => !selectedUsers.includes(user.id))
          );
          break;
        default:
          break;
      }
      
      toast.success(`Acción aplicada a ${selectedUsers.length} usuarios`);
      setSelectedUsers([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error in bulk action:', error);
      toast.error('Error al aplicar la acción masiva');
    }
  };

  const getUserStats = (userData) => {
    return {
      totalOrders: userData.orders?.length || 0,
      totalSpent: userData.orders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0,
      lastOrderDate: userData.orders?.length > 0 
        ? Math.max(...userData.orders.map(order => new Date(order.createdAt).getTime()))
        : null
    };
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-shield-alt text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso denegado</h2>
          <p className="text-gray-600 mb-6">No tienes permisos para acceder a esta página</p>
          <Link to="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-users mr-3 text-amber-600"></i>
                Gestión de Usuarios
              </h1>
              <p className="text-gray-600">
                {filteredUsers.length} de {users.length} usuarios
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={loadUsers}
                className="btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Actualizar
              </button>
              
              {selectedUsers.length > 0 && (
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="btn-primary"
                >
                  <i className="fas fa-tasks mr-2"></i>
                  Acciones ({selectedUsers.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && selectedUsers.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedUsers.length} usuarios seleccionados
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('promote')}
                  className="btn-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  <i className="fas fa-user-shield mr-1"></i>
                  Promover a Admin
                </button>
                <button
                  onClick={() => handleBulkAction('demote')}
                  className="btn-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  <i className="fas fa-user mr-1"></i>
                  Cambiar a Cliente
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="btn-sm bg-red-100 text-red-800 hover:bg-red-200"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="customer">Clientes</option>
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="name_asc">Nombre A-Z</option>
                <option value="name_desc">Nombre Z-A</option>
                <option value="email_asc">Email A-Z</option>
                <option value="email_desc">Email Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <SkeletonLoader key={index} type="table" />
                ))}
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-users text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
              <p className="text-gray-600">
                {searchTerm || roleFilter !== 'all'
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Los usuarios aparecerán aquí cuando se registren'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estadísticas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((userData) => {
                    const stats = getUserStats(userData);
                    
                    return (
                      <tr key={userData.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(userData.id)}
                            onChange={() => handleSelectUser(userData.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                            disabled={userData.id === user.uid} // Can't select current user
                          />
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={userData.photoURL || '/api/placeholder/40/40'}
                              alt={userData.displayName}
                              className="w-10 h-10 rounded-full mr-4"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/40/40';
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {userData.displayName || 'Sin nombre'}
                                {userData.id === user.uid && (
                                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    Tú
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">{userData.email}</p>
                              {userData.phone && (
                                <p className="text-xs text-gray-400">{userData.phone}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            userData.isAdmin 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <i className={`fas fa-${userData.isAdmin ? 'user-shield' : 'user'} mr-1`}></i>
                            {userData.isAdmin ? 'Administrador' : 'Cliente'}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-900">
                              {stats.totalOrders} pedidos
                            </p>
                            <p className="text-gray-500">
                              {formatPrice(stats.totalSpent)} gastado
                            </p>
                            {stats.lastOrderDate && (
                              <p className="text-xs text-gray-400">
                                Último: {formatDate(new Date(stats.lastOrderDate))}
                              </p>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(userData.createdAt)}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/admin/orders?search=${userData.email}`}
                              className="text-amber-600 hover:text-amber-700 transition-colors"
                              title="Ver pedidos"
                            >
                              <i className="fas fa-shopping-cart"></i>
                            </Link>
                            
                            {userData.id !== user.uid && (
                              <>
                                <button
                                  onClick={() => setRoleUpdateConfirm({
                                    user: userData,
                                    newRole: !userData.isAdmin
                                  })}
                                  disabled={updatingRole === userData.id}
                                  className={`transition-colors disabled:opacity-50 ${
                                    userData.isAdmin 
                                      ? 'text-yellow-600 hover:text-yellow-700' 
                                      : 'text-blue-600 hover:text-blue-700'
                                  }`}
                                  title={userData.isAdmin ? 'Quitar admin' : 'Hacer admin'}
                                >
                                  {updatingRole === userData.id ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <i className={`fas fa-${userData.isAdmin ? 'user-minus' : 'user-plus'}`}></i>
                                  )}
                                </button>
                                
                                <button
                                  onClick={() => setDeleteConfirm(userData)}
                                  className="text-red-600 hover:text-red-700 transition-colors"
                                  title="Eliminar usuario"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Role Update Confirmation Modal */}
      {roleUpdateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <i className={`fas fa-${roleUpdateConfirm.newRole ? 'user-shield' : 'user'} text-4xl text-amber-600 mb-4`}></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {roleUpdateConfirm.newRole ? 'Promover a Administrador' : 'Cambiar a Cliente'}
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres {roleUpdateConfirm.newRole ? 'promover' : 'cambiar'} a 
                <strong> {roleUpdateConfirm.user.displayName || roleUpdateConfirm.user.email}</strong> 
                {roleUpdateConfirm.newRole ? ' a administrador' : ' a cliente'}?
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setRoleUpdateConfirm(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleRoleUpdate(roleUpdateConfirm.user.id, roleUpdateConfirm.newRole)}
                  className="flex-1 btn-primary"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <i className="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Eliminar usuario?
              </h3>
              <p className="text-gray-600 mb-6">
                Esta acción no se puede deshacer. El usuario 
                <strong> {deleteConfirm.displayName || deleteConfirm.email}</strong> 
                y todos sus datos serán eliminados permanentemente.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;