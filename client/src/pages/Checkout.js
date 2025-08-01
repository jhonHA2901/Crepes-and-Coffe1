import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { formatPrice, createPedido, simulatePayment } from '../services/api';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart, getCartSummary } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Argentina',
      phone: '',
      notes: ''
    },
    paymentMethod: 'mercadopago',
    specialInstructions: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, cartItems, navigate]);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setOrderData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { street, city, state, zipCode, phone } = orderData.deliveryAddress;
        return street && city && state && zipCode && phone;
      case 2:
        return orderData.paymentMethod;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error('Por favor, completa todos los campos requeridos');
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(2)) {
      toast.error('Por favor, selecciona un método de pago');
      return;
    }

    setLoading(true);
    
    try {
      // Prepare order data
      const cartSummary = getCartSummary();
      const order = {
        items: cartSummary.items,
        totalAmount: cartSummary.total,
        deliveryAddress: orderData.deliveryAddress,
        paymentMethod: orderData.paymentMethod,
        specialInstructions: orderData.specialInstructions
      };

      // Create order
      const createdOrder = await createPedido(order);
      
      // Process payment
      if (orderData.paymentMethod === 'mercadopago') {
        const paymentResult = await simulatePayment(createdOrder.id);
        
        if (paymentResult.success) {
          clearCart();
          toast.success('¡Pedido realizado con éxito!');
          navigate(`/orders/${createdOrder.id}`);
        } else {
          toast.error('Error al procesar el pago. Inténtalo de nuevo.');
        }
      } else {
        // For cash on delivery
        clearCart();
        toast.success('¡Pedido realizado con éxito!');
        navigate(`/orders/${createdOrder.id}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al crear el pedido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Dirección de entrega', icon: 'fas fa-map-marker-alt' },
    { number: 2, title: 'Método de pago', icon: 'fas fa-credit-card' },
    { number: 3, title: 'Confirmación', icon: 'fas fa-check-circle' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Pedido</h1>
          <p className="text-gray-600">Completa tu información para procesar el pedido</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-amber-600 border-amber-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <i className={`${step.icon} text-sm`}></i>
                </div>
                <div className="ml-3 mr-8">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.number ? 'bg-amber-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Step 1: Delivery Address */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    <i className="fas fa-map-marker-alt mr-2 text-amber-600"></i>
                    Dirección de Entrega
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={orderData.deliveryAddress.street}
                        onChange={(e) => handleInputChange('deliveryAddress', 'street', e.target.value)}
                        className="input-field"
                        placeholder="Calle y número"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={orderData.deliveryAddress.city}
                        onChange={(e) => handleInputChange('deliveryAddress', 'city', e.target.value)}
                        className="input-field"
                        placeholder="Ciudad"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia *
                      </label>
                      <input
                        type="text"
                        value={orderData.deliveryAddress.state}
                        onChange={(e) => handleInputChange('deliveryAddress', 'state', e.target.value)}
                        className="input-field"
                        placeholder="Provincia"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        value={orderData.deliveryAddress.zipCode}
                        onChange={(e) => handleInputChange('deliveryAddress', 'zipCode', e.target.value)}
                        className="input-field"
                        placeholder="Código postal"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={orderData.deliveryAddress.phone}
                        onChange={(e) => handleInputChange('deliveryAddress', 'phone', e.target.value)}
                        className="input-field"
                        placeholder="Número de teléfono"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas adicionales
                      </label>
                      <textarea
                        value={orderData.deliveryAddress.notes}
                        onChange={(e) => handleInputChange('deliveryAddress', 'notes', e.target.value)}
                        className="input-field"
                        rows="3"
                        placeholder="Referencias adicionales para la entrega (opcional)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    <i className="fas fa-credit-card mr-2 text-amber-600"></i>
                    Método de Pago
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mercadopago"
                          checked={orderData.paymentMethod === 'mercadopago'}
                          onChange={(e) => handleInputChange(null, 'paymentMethod', e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MP</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">MercadoPago</p>
                            <p className="text-sm text-gray-600">Paga con tarjeta de crédito, débito o efectivo</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={orderData.paymentMethod === 'cash'}
                          onChange={(e) => handleInputChange(null, 'paymentMethod', e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center">
                            <i className="fas fa-money-bill-wave text-white text-sm"></i>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Efectivo contra entrega</p>
                            <p className="text-sm text-gray-600">Paga en efectivo cuando recibas tu pedido</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instrucciones especiales
                    </label>
                    <textarea
                      value={orderData.specialInstructions}
                      onChange={(e) => handleInputChange(null, 'specialInstructions', e.target.value)}
                      className="input-field"
                      rows="3"
                      placeholder="Alguna instrucción especial para tu pedido (opcional)"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    <i className="fas fa-check-circle mr-2 text-amber-600"></i>
                    Confirmar Pedido
                  </h2>
                  
                  {/* Order Summary */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Productos</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image || '/api/placeholder/40/40'}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Dirección de entrega</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-900">{orderData.deliveryAddress.street}</p>
                        <p className="text-gray-600">
                          {orderData.deliveryAddress.city}, {orderData.deliveryAddress.state} {orderData.deliveryAddress.zipCode}
                        </p>
                        <p className="text-gray-600">Tel: {orderData.deliveryAddress.phone}</p>
                        {orderData.deliveryAddress.notes && (
                          <p className="text-gray-600 mt-2">Notas: {orderData.deliveryAddress.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Método de pago</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-900">
                          {orderData.paymentMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo contra entrega'}
                        </p>
                      </div>
                    </div>
                    
                    {orderData.specialInstructions && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Instrucciones especiales</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-900">{orderData.specialInstructions}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Anterior
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="btn-primary"
                  >
                    Siguiente
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check mr-2"></i>
                        Confirmar Pedido
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h3>
              
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;