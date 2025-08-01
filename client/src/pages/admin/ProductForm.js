import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { 
  getProduct, 
  createProduct, 
  updateProduct,
  uploadImage 
} from '../../services/api';

const ProductForm = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    isActive: true,
    category: '',
    ingredients: '',
    allergens: '',
    preparationTime: '',
    calories: '',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false
  });
  
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    'Crepes Dulces',
    'Crepes Salados',
    'Bebidas',
    'Postres',
    'Ensaladas',
    'Acompañamientos',
    'Especiales'
  ];

  useEffect(() => {
    if (isEditing && user && isAdmin) {
      loadProduct();
    }
  }, [id, user, isAdmin]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await getProduct(id);
      const product = response.data;
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        image: product.image || '',
        isActive: product.isActive !== false,
        category: product.category || '',
        ingredients: product.ingredients || '',
        allergens: product.allergens || '',
        preparationTime: product.preparationTime?.toString() || '',
        calories: product.calories?.toString() || '',
        isVegetarian: product.isVegetarian || false,
        isVegan: product.isVegan || false,
        isGlutenFree: product.isGlutenFree || false
      });
      
      setImagePreview(product.image || '');
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Error al cargar el producto');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen debe ser menor a 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProductImage = async () => {
    if (!imageFile) return formData.image;
    
    try {
      setUploadingImage(true);
      const uploadResponse = await uploadImage(imageFile, 'products');
      return uploadResponse.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser mayor o igual a 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }
    
    if (formData.preparationTime && parseInt(formData.preparationTime) <= 0) {
      newErrors.preparationTime = 'El tiempo de preparación debe ser mayor a 0';
    }
    
    if (formData.calories && parseInt(formData.calories) < 0) {
      newErrors.calories = 'Las calorías no pueden ser negativas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }
    
    try {
      setSaving(true);
      
      // Upload image if there's a new one
      const imageUrl = await uploadProductImage();
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        image: imageUrl
      };
      
      if (isEditing) {
        await updateProduct(id, productData);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProduct(productData);
        toast.success('Producto creado exitosamente');
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Error al ${isEditing ? 'actualizar' : 'crear'} el producto`);
    } finally {
      setSaving(false);
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

  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando producto..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/admin/products" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              <i className="fas fa-box mr-3 text-amber-600"></i>
              {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>
          </div>
          
          <nav className="text-sm text-gray-600">
            <Link to="/admin" className="hover:text-gray-900">Panel</Link>
            <span className="mx-2">/</span>
            <Link to="/admin/products" className="hover:text-gray-900">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{isEditing ? 'Editar' : 'Nuevo'}</span>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              <i className="fas fa-info-circle mr-2 text-amber-600"></i>
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                  placeholder="Ej: Crepe de Nutella y Plátano"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`input-field ${errors.description ? 'border-red-300' : ''}`}
                  placeholder="Describe el producto, sus ingredientes principales y características especiales..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`input-field pl-8 ${errors.price ? 'border-red-300' : ''}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className={`input-field ${errors.stock ? 'border-red-300' : ''}`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`input-field ${errors.category ? 'border-red-300' : ''}`}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Producto activo (visible para los clientes)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              <i className="fas fa-image mr-2 text-amber-600"></i>
              Imagen del Producto
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subir Imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-field"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Formatos: JPG, PNG, WebP. Máximo 5MB.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista Previa
                </label>
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-image text-2xl text-gray-400 mb-2"></i>
                      <p className="text-xs text-gray-500">Sin imagen</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              <i className="fas fa-list-ul mr-2 text-amber-600"></i>
              Detalles Adicionales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredientes
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  rows={2}
                  className="input-field"
                  placeholder="Lista los ingredientes principales separados por comas..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alérgenos
                </label>
                <input
                  type="text"
                  name="allergens"
                  value={formData.allergens}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Gluten, Lácteos, Frutos secos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Preparación (minutos)
                </label>
                <input
                  type="number"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleInputChange}
                  min="1"
                  className={`input-field ${errors.preparationTime ? 'border-red-300' : ''}`}
                  placeholder="15"
                />
                {errors.preparationTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.preparationTime}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calorías (aprox.)
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  min="0"
                  className={`input-field ${errors.calories ? 'border-red-300' : ''}`}
                  placeholder="350"
                />
                {errors.calories && (
                  <p className="mt-1 text-sm text-red-600">{errors.calories}</p>
                )}
              </div>
            </div>
            
            {/* Dietary Options */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Opciones Dietéticas
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Vegetariano</span>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Vegano</span>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isGlutenFree"
                    checked={formData.isGlutenFree}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Sin Gluten</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/admin/products"
              className="btn-secondary"
            >
              Cancelar
            </Link>
            
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="btn-primary flex items-center"
            >
              {(saving || uploadingImage) && (
                <LoadingSpinner size="sm" className="mr-2" />
              )}
              {uploadingImage ? 'Subiendo imagen...' : 
               saving ? 'Guardando...' : 
               isEditing ? 'Actualizar Producto' : 'Crear Producto'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;