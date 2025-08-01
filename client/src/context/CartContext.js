import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Error cargando carrito desde localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  /**
   * Agregar producto al carrito
   */
  const addItem = (product, quantity = 1) => {
    if (!product || !product.id) {
      toast.error('Producto inválido');
      return;
    }

    if (quantity <= 0) {
      toast.error('La cantidad debe ser mayor a 0');
      return;
    }

    if (product.stock < quantity) {
      toast.error('Stock insuficiente');
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > product.stock) {
          toast.error(`Solo hay ${product.stock} unidades disponibles`);
          return prevItems;
        }
        
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        
        toast.success(`${product.nombre} actualizado en el carrito`);
        return updatedItems;
      } else {
        const newItem = {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen_url: product.imagen_url,
          stock: product.stock,
          quantity: quantity
        };
        
        toast.success(`${product.nombre} agregado al carrito`);
        return [...prevItems, newItem];
      }
    });
  };

  /**
   * Remover producto del carrito
   */
  const removeItem = (productId) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        toast.success(`${item.nombre} removido del carrito`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  /**
   * Actualizar cantidad de un producto
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          if (quantity > item.stock) {
            toast.error(`Solo hay ${item.stock} unidades disponibles`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  /**
   * Limpiar carrito
   */
  const clearCart = () => {
    setItems([]);
    toast.success('Carrito vaciado');
  };

  /**
   * Obtener cantidad total de items
   */
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Obtener precio total
   */
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  /**
   * Verificar si un producto está en el carrito
   */
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  /**
   * Obtener cantidad de un producto específico
   */
  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  /**
   * Abrir/cerrar carrito
   */
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  /**
   * Validar stock antes de proceder al checkout
   */
  const validateStock = async (products) => {
    const invalidItems = [];
    
    for (const cartItem of items) {
      const product = products.find(p => p.id === cartItem.id);
      
      if (!product) {
        invalidItems.push({
          ...cartItem,
          error: 'Producto no disponible'
        });
      } else if (!product.activo) {
        invalidItems.push({
          ...cartItem,
          error: 'Producto no activo'
        });
      } else if (product.stock < cartItem.quantity) {
        invalidItems.push({
          ...cartItem,
          error: `Solo hay ${product.stock} unidades disponibles`,
          availableStock: product.stock
        });
      }
    }
    
    return {
      isValid: invalidItems.length === 0,
      invalidItems
    };
  };

  /**
   * Actualizar stock de productos en el carrito
   */
  const updateCartStock = (products) => {
    setItems(prevItems => {
      return prevItems.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
          return {
            ...cartItem,
            stock: product.stock,
            // Ajustar cantidad si excede el stock disponible
            quantity: Math.min(cartItem.quantity, product.stock)
          };
        }
        return cartItem;
      }).filter(item => {
        // Remover productos que ya no existen o no están activos
        const product = products.find(p => p.id === item.id);
        return product && product.activo;
      });
    });
  };

  /**
   * Obtener resumen del carrito para el checkout
   */
  const getCartSummary = () => {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    
    return {
      items: items.map(item => ({
        producto_id: item.id,
        cantidad: item.quantity,
        precio_unitario: item.precio
      })),
      totalItems,
      totalPrice,
      isEmpty: items.length === 0
    };
  };

  const value = {
    // Estado
    items,
    isOpen,
    
    // Métodos de manipulación
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    
    // Métodos de información
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    
    // Métodos de UI
    toggleCart,
    openCart,
    closeCart,
    
    // Métodos de validación
    validateStock,
    updateCartStock,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;