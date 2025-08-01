import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  // Estado para controlar qué preguntas están expandidas
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  // Función para alternar la expansión de una pregunta
  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter(item => item !== index));
    } else {
      setExpandedQuestions([...expandedQuestions, index]);
    }
  };

  // Lista de preguntas y respuestas
  const faqItems = [
    {
      question: '¿Cómo puedo realizar un pedido?',
      answer: 'Para realizar un pedido, simplemente navega a la sección de productos, selecciona los artículos que deseas y agrégalos a tu carrito. Una vez que hayas terminado de seleccionar, ve al carrito y procede al checkout para completar tu pedido.'
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos pagos con tarjetas de crédito (Visa, MasterCard, American Express), tarjetas de débito y MercadoPago. Todos los pagos se procesan de manera segura a través de nuestras plataformas de pago.'
    },
    {
      question: '¿Puedo modificar o cancelar mi pedido?',
      answer: 'Puedes modificar o cancelar tu pedido dentro de los primeros 5 minutos después de realizarlo. Para hacerlo, ve a la sección "Mis Pedidos" en tu perfil y selecciona la opción correspondiente. Después de este período, el pedido entra en preparación y no podrá ser modificado o cancelado.'
    },
    {
      question: '¿Cuánto tiempo tarda en estar listo mi pedido?',
      answer: 'El tiempo de preparación varía según la complejidad y volumen del pedido, pero generalmente los pedidos están listos para recoger entre 15-30 minutos después de la confirmación. Puedes verificar el estado de tu pedido en la sección "Mis Pedidos".'
    },
    {
      question: '¿Ofrecen servicio a domicilio?',
      answer: 'Actualmente ofrecemos servicio a domicilio en áreas seleccionadas. Durante el proceso de checkout podrás verificar si tu dirección está dentro de nuestra zona de cobertura. También puedes optar por recoger tu pedido directamente en nuestra tienda.'
    },
    {
      question: '¿Tienen opciones para personas con restricciones alimentarias?',
      answer: 'Sí, ofrecemos opciones para personas con diversas restricciones alimentarias, incluyendo opciones vegetarianas, veganas y sin gluten. Cada producto en nuestro menú está claramente etiquetado con los alérgenos que contiene. Si tienes alguna alergia o restricción específica, por favor indícalo en las notas de tu pedido.'
    },
    {
      question: '¿Cómo puedo obtener ayuda si tengo problemas con mi pedido?',
      answer: 'Si tienes algún problema con tu pedido, puedes contactarnos a través de la sección de "Contacto" en nuestra página web, llamarnos directamente al +57 300 123 4567, o enviarnos un correo electrónico a soporte@crepesandcoffee.com. Nuestro equipo de atención al cliente está disponible para ayudarte de lunes a domingo de 7:00 AM a 10:00 PM.'
    },
    {
      question: '¿Puedo hacer pedidos para eventos o grupos grandes?',
      answer: 'Sí, ofrecemos servicios de catering para eventos y grupos grandes. Para solicitar un presupuesto personalizado, por favor contáctanos con al menos 48 horas de anticipación a través de nuestro correo eventos@crepesandcoffee.com o llámanos al +57 300 123 4567.'
    },
    {
      question: '¿Tienen un programa de fidelidad o descuentos?',
      answer: 'Sí, contamos con un programa de fidelidad donde acumulas puntos por cada compra que realizas. Estos puntos pueden ser canjeados por descuentos en pedidos futuros. Además, ofrecemos promociones especiales para nuestros suscriptores de newsletter y seguidores en redes sociales.'
    },
    {
      question: '¿Cómo puedo crear una cuenta?',
      answer: 'Puedes crear una cuenta fácilmente haciendo clic en el botón "Registrarse" en la esquina superior derecha de nuestra página web. Te pediremos algunos datos básicos y podrás registrarte utilizando tu cuenta de Google para mayor comodidad.'
    },
    {
      question: '¿Qué hago si olvidé mi contraseña?',
      answer: 'Si olvidaste tu contraseña, puedes restablecerla haciendo clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Te enviaremos un enlace a tu correo electrónico para crear una nueva contraseña. Si utilizas el inicio de sesión con Google, no necesitas una contraseña separada.'
    },
    {
      question: '¿Cómo puedo actualizar mi información personal?',
      answer: 'Puedes actualizar tu información personal en cualquier momento accediendo a la sección "Mi Perfil" después de iniciar sesión. Allí podrás modificar tus datos de contacto, dirección de entrega y preferencias de comunicación.'
    }
  ];

  // Categorías de preguntas para la navegación rápida
  const categories = [
    { name: 'Pedidos', icon: 'fa-shopping-cart' },
    { name: 'Pagos', icon: 'fa-credit-card' },
    { name: 'Entrega', icon: 'fa-truck' },
    { name: 'Cuenta', icon: 'fa-user' },
    { name: 'Productos', icon: 'fa-coffee' },
    { name: 'Otros', icon: 'fa-question-circle' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
          </p>
        </div>
        
        {/* Navegación por categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <i className={`fas ${category.icon} text-amber-500 mr-2`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        
        {/* Barra de búsqueda */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Buscar pregunta..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
        
        {/* Lista de preguntas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <div key={index} className="p-0">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <span className="ml-6">
                    <i className={`fas ${expandedQuestions.includes(index) ? 'fa-chevron-up' : 'fa-chevron-down'} text-amber-500`}></i>
                  </span>
                </button>
                {expandedQuestions.includes(index) && (
                  <div className="px-6 pb-4 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Sección de contacto */}
        <div className="bg-amber-50 rounded-xl shadow-sm p-6 border border-amber-100">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">¿No encontraste lo que buscabas?</h2>
            <p className="text-gray-600 mb-4">
              Nuestro equipo de atención al cliente está listo para ayudarte con cualquier pregunta adicional que puedas tener.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a 
                href="mailto:soporte@crepesandcoffee.com" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                <i className="fas fa-envelope mr-2"></i>
                Enviar correo
              </a>
              <a 
                href="tel:+573001234567" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
        
        {/* Enlaces relacionados */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Enlaces relacionados</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/terminos-condiciones" 
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link 
              to="/politica-privacidad" 
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              to="/" 
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;