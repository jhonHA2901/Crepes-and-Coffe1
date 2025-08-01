import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

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
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
          subject: '',
          message: ''
        });
        
        // Resetear el estado después de 5 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contáctanos</h1>
        <p className="text-gray-600">
          Estamos aquí para responder tus preguntas y escuchar tus comentarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Información de contacto */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Información de Contacto</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaMapMarkerAlt className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Dirección</p>
                <p className="text-sm text-gray-600">Av. Siempre Viva 123, Springfield</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaPhone className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Teléfono</p>
                <p className="text-sm text-gray-600">+52 (55) 1234-5678</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaEnvelope className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">info@crepesywaffle.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaClock className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Horario de Atención</p>
                <p className="text-sm text-gray-600">Lunes - Viernes: 9:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-600">Sábado - Domingo: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://wa.me/5212345678" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Envíanos un Mensaje</h2>
          
          {submitStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Mensaje enviado con éxito</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
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
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Nuestra Ubicación</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661913905089!2d-99.16869708509426!3d19.427023986887467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20Angel%20de%20la%20Independencia!5e0!3m2!1ses-419!2smx!4v1623164394096!5m2!1ses-419!2smx" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Mapa de ubicación"
          ></iframe>
        </div>
      </div>

      {/* Preguntas frecuentes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Preguntas Frecuentes</h2>
        <p className="text-gray-600 mb-4">
          ¿Tienes alguna pregunta? Consulta nuestra sección de preguntas frecuentes o contáctanos directamente.  
        </p>
        <Link 
          to="/preguntas-frecuentes" 
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          Ver todas las preguntas frecuentes
          <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* Enlaces rápidos */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/productos" className="text-gray-600 hover:text-primary transition-colors">Productos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/preguntas-frecuentes" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
        <span className="text-gray-400">|</span>
        <Link to="/terminos-condiciones" className="text-gray-600 hover:text-primary transition-colors">Términos y Condiciones</Link>
        <span className="text-gray-400">|</span>
        <Link to="/politica-privacidad" className="text-gray-600 hover:text-primary transition-colors">Política de Privacidad</Link>
      </div>
    </div>
  );
};

export default Contact;