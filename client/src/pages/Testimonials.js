import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonials = () => {
  // Datos de testimonios (en una aplicación real, estos vendrían de una API)
  const testimonialData = [
    {
      id: 1,
      name: 'Laura Sánchez',
      role: 'Cliente frecuente',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Las crepes de este lugar son simplemente increíbles. La masa es perfecta, los rellenos son generosos y el servicio es excelente. Vengo cada semana y nunca me decepciona.',
      date: '15/05/2023',
      product: 'Crepe de Nutella con Fresas'
    },
    {
      id: 2,
      name: 'Miguel Hernández',
      role: 'Foodie',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Como amante de la buena comida, puedo decir que estas son las mejores crepes que he probado en la ciudad. Los ingredientes son frescos y de calidad, y el ambiente del lugar es muy acogedor.',
      date: '03/06/2023',
      product: 'Crepe de Jamón y Queso'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      role: 'Influencer gastronómica',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4,
      text: 'He visitado muchos lugares especializados en crepes, y este definitivamente está entre los mejores. El café es excepcional y las crepes tienen ese toque casero que las hace especiales.',
      date: '22/07/2023',
      product: 'Café Latte y Crepe de Frutas'
    },
    {
      id: 4,
      name: 'Carlos Ramírez',
      role: 'Cliente nuevo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Primera vez que visito el lugar y quedé encantado. El servicio fue rápido y amable, y mi crepe estaba deliciosa. Definitivamente volveré pronto con amigos.',
      date: '10/08/2023',
      product: 'Crepe de Pollo y Champiñones'
    },
    {
      id: 5,
      name: 'Sofía López',
      role: 'Cliente habitual',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Me encanta este lugar para reunirme con amigas. Las crepes son deliciosas y tienen opciones para todos los gustos. El ambiente es perfecto para charlar y pasar un buen rato.',
      date: '05/09/2023',
      product: 'Crepe de Espinacas y Queso de Cabra'
    },
    {
      id: 6,
      name: 'Javier Torres',
      role: 'Crítico gastronómico',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4,
      text: 'Un lugar que sorprende por la calidad de sus productos. Las crepes tienen el punto exacto de cocción y los ingredientes son de primera. El café es de especialidad y se nota en cada sorbo.',
      date: '18/10/2023',
      product: 'Crepe Gourmet de Salmón'
    },
    {
      id: 7,
      name: 'Elena Gómez',
      role: 'Vegetariana',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Agradezco mucho que tengan tantas opciones vegetarianas deliciosas. No siempre es fácil encontrar lugares así. Las crepes de verduras son espectaculares y los postres divinos.',
      date: '02/11/2023',
      product: 'Crepe Vegetariana'
    },
    {
      id: 8,
      name: 'Roberto Díaz',
      role: 'Empresario',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 5,
      text: 'Excelente lugar para reuniones de negocios informales. El ambiente es tranquilo, el wifi funciona bien y la comida es deliciosa. El servicio es rápido y eficiente.',
      date: '20/11/2023',
      product: 'Combo Ejecutivo (Crepe Salada + Café)'
    }
  ];

  // Estado para el formulario de testimonios
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    product: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Manejar cambio en el rating
  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.product.trim()) {
      newErrors.product = 'El producto es requerido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulación de envío de formulario
      setSubmitStatus('loading');
      
      // Simulación de respuesta del servidor después de 1.5 segundos
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          rating: 5,
          product: '',
          message: ''
        });
        
        // Resetear el estado después de 5 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
    }
  };

  // Renderizar estrellas para el rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };

  // Renderizar estrellas interactivas para el formulario
  const renderInteractiveStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleRatingChange(i)}
          className="focus:outline-none"
        >
          <FaStar 
            className={i <= formData.rating ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'} 
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800/90 to-amber-600/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Clientes disfrutando crepes" 
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Testimonios de Clientes</h1>
          <p className="text-xl text-white max-w-3xl">
            Descubre lo que nuestros clientes dicen sobre su experiencia en Crepes & Coffee.
          </p>
        </div>
      </div>

      {/* Testimonios destacados */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Lo que dicen nuestros clientes</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Nos enorgullece compartir las experiencias de quienes han disfrutado de nuestras crepes y café. Sus opiniones son nuestro mayor tesoro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.slice(0, 6).map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="relative">
                  <FaQuoteLeft className="absolute top-0 left-0 text-primary/20 text-xl" />
                  <p className="text-gray-700 pl-6 pr-6 mb-3">
                    {testimonial.text}
                  </p>
                  <FaQuoteRight className="absolute bottom-0 right-0 text-primary/20 text-xl" />
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Fecha: {testimonial.date}</p>
                  <p className="text-sm text-primary font-medium">Producto: {testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonialData.length > 6 && (
          <div className="text-center mt-8">
            <button className="btn btn-outline-primary">
              Ver más testimonios
            </button>
          </div>
        )}
      </div>

      {/* Formulario para dejar testimonio */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comparte tu experiencia</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-700">
              Nos encantaría conocer tu opinión sobre nuestros productos y servicio. Tu feedback nos ayuda a mejorar cada día.
            </p>
          </div>
          
          {submitStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Testimonio enviado con éxito</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>¡Gracias por compartir tu experiencia! Tu opinión es muy valiosa para nosotros.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
                <div className="flex space-x-2">
                  {renderInteractiveStars()}
                </div>
              </div>
              
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Producto que probaste</label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.product ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ej: Crepe de Nutella, Café Latte, etc."
                />
                {errors.product && <p className="mt-1 text-sm text-red-600">{errors.product}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tu experiencia</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Cuéntanos qué te pareció nuestro producto y servicio..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar Testimonio'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-700">Calificación promedio</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-700">Reseñas positivas</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-gray-700">Clientes satisfechos</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <p className="text-gray-700">Crepes servidas</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para probar nuestras crepes?</h2>
          <p className="text-white text-lg mb-6">
            Ven a visitarnos y descubre por qué tantos clientes nos recomiendan. ¡Te esperamos con las mejores crepes y café de la ciudad!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/productos" 
              className="btn btn-secondary"
            >
              Ver Menú
            </Link>
            <Link 
              to="/contacto" 
              className="btn btn-outline text-white border-white hover:bg-white hover:text-primary"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/productos" className="text-gray-600 hover:text-primary transition-colors">Productos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/nosotros" className="text-gray-600 hover:text-primary transition-colors">Nosotros</Link>
        <span className="text-gray-400">|</span>
        <Link to="/contacto" className="text-gray-600 hover:text-primary transition-colors">Contacto</Link>
      </div>
    </div>
  );
};

export default Testimonials;