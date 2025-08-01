import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProducto, getProductos } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner, { FullPageSpinner, ProductSkeleton } from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await getProducto(id);
      
      if (response.success) {
        setProduct(response.producto);
        loadRelatedProducts();
      } else {
        toast.error('Producto no encontrado');
        navigate('/productos');
      }
    } catch (error) {
      console.error('Error cargando producto:', error);
      toast.error('Error cargando producto');
      navigate('/productos');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    try {
      const response = await getProductos({ 
        limit: 4, 
        activo: true, 
        enStock: true,
        exclude: id 
      });
      
      if (response.success) {
        setRelatedProducts(response.productos);
      }
    } catch (error) {
      console.error('Error cargando productos relacionados:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    if (!product || product.stock === 0) {
      toast.error('Producto no disponible');
      return;
    }

    if (quantity <= 0) {
      toast.error('La cantidad debe ser mayor a 0');
      return;
    }

    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity + quantity > product.stock) {
      toast.error(`Solo puedes agregar ${product.stock - currentQuantity} unidades más`);
      return;
    }

    try {
      setAddingToCart(true);
      addItem(product, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Error agregando al carrito:', error);
      toast.error('Error agregando producto al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const currentCartQuantity = product ? getItemQuantity(product.id) : 0;
  const maxQuantity = product ? product.stock - currentCartQuantity : 0;

  if (loading) {
    return <FullPageSpinner text="Cargando producto..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o no está disponible.</p>
          <Link to="/productos" className="btn btn-primary">
            <i className="fas fa-arrow-left mr-2"></i>
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  // Mock images for demonstration (in real app, these would come from the product)
  const productImages = [
    product.imagen_url || '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-amber-700 transition-colors">
            Inicio
          </Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <Link to="/productos" className="hover:text-amber-700 transition-colors">
            Productos
          </Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-gray-900 font-medium">{product.nombre}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="p-6">
              <div className="mb-4">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.nombre}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f3f4f6"/><text x="300" y="200" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial, sans-serif" font-size="18">Imagen no disponible</text></svg>';
                  }}
                />
              </div>
              
              {/* Image thumbnails */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-amber-500 ring-2 ring-amber-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.nombre} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f3f4f6"/><text x="40" y="40" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial, sans-serif" font-size="10">N/A</text></svg>';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.nombre}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl font-bold text-amber-700">
                    ${product.precio.toFixed(2)}
                  </span>
                  
                  {/* Stock status */}
                  <div className="flex items-center space-x-2">
                    {product.stock > 0 ? (
                      <>
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span className="text-green-600 font-medium">
                          En stock ({product.stock} disponibles)
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-times-circle text-red-500"></i>
                        <span className="text-red-600 font-medium">Agotado</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Stock warning */}
                {product.stock > 0 && product.stock <= 5 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                      <span className="text-yellow-800 text-sm font-medium">
                        ¡Últimas {product.stock} unidades disponibles!
                      </span>
                    </div>
                  </div>
                )}
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              {user && product.stock > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Cantidad:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <i className="fas fa-minus text-sm"></i>
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={maxQuantity}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-0 focus:outline-none"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= maxQuantity}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <i className="fas fa-plus text-sm"></i>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Máximo: {maxQuantity}
                    </span>
                  </div>
                  
                  {currentCartQuantity > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <i className="fas fa-shopping-cart text-blue-600 mr-2"></i>
                        <span className="text-blue-800 text-sm">
                          Ya tienes {currentCartQuantity} unidades en tu carrito
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart || maxQuantity === 0}
                      className="btn btn-primary btn-lg flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToCart ? (
                        <>
                          <LoadingSpinner size="sm" color="white" className="mr-2" />
                          Agregando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-cart-plus mr-2"></i>
                          Agregar al Carrito
                        </>
                      )}
                    </button>
                    
                    <button className="btn btn-outline btn-lg">
                      <i className="fas fa-heart mr-2"></i>
                      Favoritos
                    </button>
                  </div>
                </div>
              )}
              
              {!user && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-info-circle text-amber-600 mr-2"></i>
                      <span className="text-amber-800 text-sm">
                        Inicia sesión para agregar productos al carrito
                      </span>
                    </div>
                  </div>
                  <Link to="/login" className="btn btn-primary btn-lg w-full">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Iniciar Sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-leaf text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ingredientes Frescos</h3>
                <p className="text-gray-600 text-sm">Preparado con ingredientes de la mejor calidad</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Preparación Rápida</h3>
                <p className="text-gray-600 text-sm">Listo en pocos minutos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <i className="fas fa-award text-amber-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Calidad Premium</h3>
                <p className="text-gray-600 text-sm">Garantía de satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="product-card group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.imagen_url || '/api/placeholder/300/200'} 
                      alt={relatedProduct.nombre}
                      className="product-image group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Imagen no disponible</text></svg>';
                      }}
                    />
                  </div>
                  
                  <div className="card-body">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {relatedProduct.nombre}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {relatedProduct.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-700">
                        ${relatedProduct.precio.toFixed(2)}
                      </span>
                      <Link 
                        to={`/producto/${relatedProduct.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Ver Producto
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;