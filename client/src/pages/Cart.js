import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { formatPrice } from '../services/api';

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    validateStock 
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stockValidation, setStockValidation] = useState({});

  useEffect(() => {
    // Validate stock for all items when component mounts
    const validateAllStock = async () => {
      if (cartItems.length > 0) {
        setLoading(true);
        const validation = {};
        
        for (const item of cartItems) {
          try {
            const isValid = await validateStock(item.id, item.quantity);
            validation[item.id] = isValid;
          } catch (error) {
            validation[item.id] = false;
          }
        }
        
        setStockValidation(validation);
        setLoading(false);
      }
    };

    validateAllStock();
  }, [cartItems, validateStock]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const isValid = await validateStock(productId, newQuantity);
      if (isValid) {
        updateQuantity(productId, newQuantity);
        setStockValidation(prev => ({ ...prev, [productId]: true }));
      } else {
        toast.error('No hay suficiente stock disponible');
        setStockValidation(prev => ({ ...prev, [productId]: false }));
      }
    } catch (error) {
      toast.error('Error al validar el stock');
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito');
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
      toast.success('Carrito vaciado');
    }
  };

  const handleCheckout = () => {
    // Check if all items have valid stock
    const hasInvalidStock = Object.values(stockValidation).some(isValid => !isValid);
    
    if (hasInvalidStock) {
      toast.error('Algunos productos no tienen stock suficiente. Por favor, ajusta las cantidades.');
      return;
    }
    
    navigate('/checkout');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión para ver tu carrito</h2>
          <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu carrito de compras</p>
          <Link 
            to="/login" 
            className="btn-primary"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  if (loading && cartItems.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Validando stock..." />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto a tu carrito. 
              ¡Explora nuestro menú y encuentra tus crepes favoritos!
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link 
                to="/products" 
                className="btn-primary inline-block"
              >
                <i className="fas fa-utensils mr-2"></i>
                Ver Menú
              </Link>
              <Link 
                to="/" 
                className="btn-secondary inline-block"
              >
                <i className="fas fa-home mr-2"></i>
                Ir al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mi Carrito
          </h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Vaciar carrito
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const isStockValid = stockValidation[item.id] !== false;
                  
                  return (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || '/api/placeholder/80/80'}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/80/80';
                            }}
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              {item.description && (
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-amber-600">
                                  {formatPrice(item.price)}
                                </span>
                                {!isStockValid && (
                                  <span className="text-red-600 text-sm font-medium">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    Stock insuficiente
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              title="Eliminar producto"
                            >
                              <i className="fas fa-times text-lg"></i>
                            </button>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-700 font-medium">Cantidad:</span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <i className="fas fa-minus text-xs"></i>
                                </button>
                                
                                <span className="w-12 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <i className="fas fa-plus text-xs"></i>
                                </button>
                              </div>
                            </div>
                            
                            {/* Subtotal */}
                            <div className="text-right">
                              <span className="text-sm text-gray-600">Subtotal:</span>
                              <div className="text-xl font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Resumen del pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} productos)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-amber-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={Object.values(stockValidation).some(isValid => !isValid)}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                <i className="fas fa-credit-card mr-2"></i>
                Proceder al pago
              </button>
              
              <Link 
                to="/products" 
                className="w-full btn-secondary text-center block"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Seguir comprando
              </Link>
              
              {/* Security badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-3">Compra segura garantizada</p>
                  <div className="flex justify-center space-x-4">
                    <div className="flex items-center space-x-1 text-green-600">
                      <i className="fas fa-shield-alt text-sm"></i>
                      <span className="text-xs">SSL</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <i className="fas fa-lock text-sm"></i>
                      <span className="text-xs">Seguro</span>
                    </div>
                    <div className="flex items-center space-x-1 text-purple-600">
                      <i className="fas fa-credit-card text-sm"></i>
                      <span className="text-xs">Protegido</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;