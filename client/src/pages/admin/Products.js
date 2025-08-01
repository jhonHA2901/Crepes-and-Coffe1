import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { SkeletonLoader } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  getProducts, 
  deleteProduct, 
  updateProduct,
  formatPrice 
} from '../../services/api';

const AdminProducts = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (user && isAdmin) {
      loadProducts();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, filterStatus, sortBy, sortOrder]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({ includeInactive: true });
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filterStatus) {
      case 'active':
        filtered = filtered.filter(product => product.isActive);
        break;
      case 'inactive':
        filtered = filtered.filter(product => !product.isActive);
        break;
      case 'low_stock':
        filtered = filtered.filter(product => product.stock <= 5);
        break;
      case 'out_of_stock':
        filtered = filtered.filter(product => product.stock === 0);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'stock':
          aValue = a.stock || 0;
          bValue = b.stock || 0;
          break;
        case 'created':
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success('Producto eliminado exitosamente');
      loadProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar el producto');
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await updateProduct(product.id, {
        ...product,
        isActive: !product.isActive
      });
      toast.success(`Producto ${!product.isActive ? 'activado' : 'desactivado'} exitosamente`);
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar el producto');
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      toast.warning('Selecciona al menos un producto');
      return;
    }

    try {
      const promises = selectedProducts.map(productId => {
        const product = products.find(p => p.id === productId);
        if (!product) return Promise.resolve();

        switch (action) {
          case 'activate':
            return updateProduct(productId, { ...product, isActive: true });
          case 'deactivate':
            return updateProduct(productId, { ...product, isActive: false });
          case 'delete':
            return deleteProduct(productId);
          default:
            return Promise.resolve();
        }
      });

      await Promise.all(promises);
      toast.success(`Acción aplicada a ${selectedProducts.length} productos`);
      setSelectedProducts([]);
      setShowBulkActions(false);
      loadProducts();
    } catch (error) {
      console.error('Error in bulk action:', error);
      toast.error('Error al aplicar la acción masiva');
    }
  };

  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <span className="badge bg-red-100 text-red-800">Sin stock</span>;
    } else if (stock <= 5) {
      return <span className="badge bg-yellow-100 text-yellow-800">Stock bajo</span>;
    } else {
      return <span className="badge bg-green-100 text-green-800">En stock</span>;
    }
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
                <i className="fas fa-box mr-3 text-amber-600"></i>
                Gestión de Productos
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} de {products.length} productos
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link to="/admin/products/new" className="btn-primary">
                <i className="fas fa-plus mr-2"></i>
                Nuevo Producto
              </Link>
              
              {selectedProducts.length > 0 && (
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="btn-secondary"
                >
                  <i className="fas fa-tasks mr-2"></i>
                  Acciones ({selectedProducts.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && selectedProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedProducts.length} productos seleccionados
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                >
                  <i className="fas fa-check mr-1"></i>
                  Activar
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="btn-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  <i className="fas fa-pause mr-1"></i>
                  Desactivar
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">Todos los productos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="low_stock">Stock bajo</option>
                <option value="out_of_stock">Sin stock</option>
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="input-field"
              >
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
                <option value="price-asc">Precio menor</option>
                <option value="price-desc">Precio mayor</option>
                <option value="stock-asc">Stock menor</option>
                <option value="stock-desc">Stock mayor</option>
                <option value="created-desc">Más recientes</option>
                <option value="created-asc">Más antiguos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <SkeletonLoader key={index} type="table" />
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-box-open text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza agregando tu primer producto'
                }
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <Link to="/admin/products/new" className="btn-primary">
                  <i className="fas fa-plus mr-2"></i>
                  Agregar Producto
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={product.image || '/api/placeholder/60/60'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/60/60';
                            }}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900">{product.stock}</span>
                          {getStockBadge(product.stock)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="text-amber-600 hover:text-amber-700 transition-colors"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          
                          <button
                            onClick={() => handleToggleActive(product)}
                            className={`transition-colors ${
                              product.isActive 
                                ? 'text-yellow-600 hover:text-yellow-700' 
                                : 'text-green-600 hover:text-green-700'
                            }`}
                            title={product.isActive ? 'Desactivar' : 'Activar'}
                          >
                            <i className={`fas fa-${product.isActive ? 'pause' : 'play'}`}></i>
                          </button>
                          
                          <button
                            onClick={() => setDeleteConfirm(product)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <i className="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Eliminar producto?
              </h3>
              <p className="text-gray-600 mb-6">
                Esta acción no se puede deshacer. El producto "{deleteConfirm.name}" será eliminado permanentemente.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteProduct(deleteConfirm.id)}
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

export default AdminProducts;