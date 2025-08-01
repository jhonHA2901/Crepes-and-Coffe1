import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, debounce } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner, { ProductSkeleton } from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Products = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    activo: true,
    enStock: false,
    minPrice: '',
    maxPrice: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [sortBy, setSortBy] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      loadProducts(1, term);
    }, 500),
    [filters, sortBy, sortOrder]
  );

  useEffect(() => {
    loadProducts();
  }, [filters, sortBy, sortOrder]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      loadProducts(1);
    }
  }, [searchTerm, debouncedSearch]);

  const loadProducts = async (page = 1, search = searchTerm) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        search: search || undefined,
        activo: filters.activo,
        enStock: filters.enStock || undefined,
        sortBy,
        sortOrder
      };

      // Add price filters if specified
      if (filters.minPrice) {
        params.minPrice = parseFloat(filters.minPrice);
      }
      if (filters.maxPrice) {
        params.maxPrice = parseFloat(filters.maxPrice);
      }

      const response = await getProductos(params);
      if (response.success) {
        setProducts(response.productos);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages
        });
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      toast.error('Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    addItem(product, 1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setFilters({
      activo: true,
      enStock: false,
      minPrice: '',
      maxPrice: ''
    });
    setSearchTerm('');
    setSortBy('nombre');
    setSortOrder('asc');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadProducts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra deliciosa selección de crepes y bebidas artesanales.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="form-label">
                <i className="fas fa-search mr-2"></i>
                Buscar productos
              </label>
              <input
                type="text"
                className="input"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div>
              <label className="form-label">
                <i className="fas fa-sort mr-2"></i>
                Ordenar por
              </label>
              <select
                className="input"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="nombre-asc">Nombre (A-Z)</option>
                <option value="nombre-desc">Nombre (Z-A)</option>
                <option value="precio-asc">Precio (Menor a Mayor)</option>
                <option value="precio-desc">Precio (Mayor a Menor)</option>
                <option value="fecha_creacion-desc">Más Recientes</option>
                <option value="fecha_creacion-asc">Más Antiguos</option>
              </select>
            </div>

            {/* Filters Toggle */}
            <div className="flex items-end">
              <button
                onClick={() => setFilters(prev => ({ ...prev, showAdvanced: !prev.showAdvanced }))}
                className="btn btn-secondary w-full"
              >
                <i className="fas fa-filter mr-2"></i>
                Filtros Avanzados
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {filters.showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stock Filter */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.enStock}
                      onChange={(e) => handleFilterChange('enStock', e.target.checked)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Solo productos en stock
                    </span>
                  </label>
                </div>

                {/* Price Range */}
                <div>
                  <label className="form-label text-sm">Precio mínimo</label>
                  <input
                    type="number"
                    className="input text-sm"
                    placeholder="$0.00"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="form-label text-sm">Precio máximo</label>
                  <input
                    type="number"
                    className="input text-sm"
                    placeholder="$999.99"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn btn-secondary btn-sm w-full"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            {loading ? (
              <div className="skeleton-text w-32 h-5"></div>
            ) : (
              <span>
                Mostrando {products.length} de {pagination.total} productos
                {searchTerm && (
                  <span className="ml-2">
                    para "<span className="font-semibold">{searchTerm}</span>"
                  </span>
                )}
              </span>
            )}
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-500">Vista:</span>
            <button className="p-2 text-amber-700 bg-amber-100 rounded">
              <i className="fas fa-th-large"></i>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No hay productos que coincidan con "${searchTerm}"`
                : 'No hay productos disponibles con los filtros seleccionados'
              }
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              <i className="fas fa-refresh mr-2"></i>
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.imagen_url || '/api/placeholder/300/200'} 
                    alt={product.nombre}
                    className="product-image group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Imagen no disponible</text></svg>';
                    }}
                  />
                  
                  {/* Stock badge */}
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Agotado
                    </div>
                  )}
                  
                  {/* Stock low badge */}
                  {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Últimas {product.stock}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                
                <div className="card-body">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {product.nombre}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {product.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-amber-700">
                      ${product.precio.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/producto/${product.id}`}
                      className="btn btn-secondary btn-sm flex-1"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      Ver
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary btn-sm flex-1"
                      disabled={!user || product.stock === 0}
                    >
                      <i className="fas fa-cart-plus mr-1"></i>
                      {product.stock === 0 ? 'Agotado' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="btn btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`btn btn-sm ${
                    pagination.page === pageNum 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="btn btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;