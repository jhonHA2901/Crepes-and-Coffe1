import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaLeaf, FaUtensils, FaUsers, FaHandshake, FaAward } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800/90 to-amber-600/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Crepes y café" 
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestra Historia</h1>
          <p className="text-xl text-white max-w-3xl">
            Descubre quiénes somos, nuestra pasión por la gastronomía y nuestro compromiso con la calidad y el sabor.
          </p>
        </div>
      </div>

      {/* Nuestra Historia */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Cómo Comenzamos</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold text-primary">Crepes & Coffee</span> nació en 2010 como un pequeño puesto en un mercado local. Fundado por María y Carlos, dos amantes de la gastronomía con una pasión por las crepes y el buen café.
            </p>
            <p className="text-gray-700 mb-4">
              Lo que comenzó como un sueño compartido se ha convertido en una cadena de restaurantes reconocida por la calidad de sus ingredientes, la creatividad de sus recetas y el ambiente acogedor que ofrecemos a nuestros clientes.
            </p>
            <p className="text-gray-700">
              A lo largo de estos años, hemos crecido gracias al apoyo de nuestros fieles clientes, pero nunca hemos perdido nuestra esencia: ofrecer experiencias gastronómicas memorables con un toque casero y personal.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1484312152213-d713e8b7c053?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Fundadores" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Misión, Visión y Valores */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Misión, Visión y Valores</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaHeart className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Nuestra Misión</h3>
            <p className="text-gray-700 text-center">
              Crear experiencias gastronómicas memorables a través de crepes artesanales y café de especialidad, utilizando ingredientes frescos y de alta calidad, en un ambiente acogedor y familiar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaLeaf className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Nuestra Visión</h3>
            <p className="text-gray-700 text-center">
              Ser reconocidos como el referente en la gastronomía de crepes y café, expandiendo nuestra presencia a nivel nacional mientras mantenemos nuestros estándares de calidad, innovación y servicio excepcional.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaUtensils className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Nuestros Valores</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span>Calidad en cada ingrediente</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span>Innovación constante</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span>Servicio excepcional</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span>Responsabilidad social</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span>Trabajo en equipo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nuestro Equipo */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestro Equipo</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Detrás de cada crepe y cada taza de café hay un equipo apasionado y dedicado que trabaja con amor y profesionalismo para ofrecerte lo mejor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="María González" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">María González</h3>
              <p className="text-primary font-medium mb-2">Fundadora & Chef Ejecutiva</p>
              <p className="text-gray-700 text-sm">
                Con más de 15 años de experiencia en gastronomía francesa, María es el corazón creativo de nuestras recetas.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Carlos Rodríguez" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Carlos Rodríguez</h3>
              <p className="text-primary font-medium mb-2">Fundador & Barista Principal</p>
              <p className="text-gray-700 text-sm">
                Experto en café de especialidad, Carlos selecciona personalmente cada grano para garantizar el mejor sabor.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Ana Martínez" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Ana Martínez</h3>
              <p className="text-primary font-medium mb-2">Chef de Repostería</p>
              <p className="text-gray-700 text-sm">
                Especialista en postres, Ana es la responsable de nuestras deliciosas crepes dulces y pasteles artesanales.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Javier López" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Javier López</h3>
              <p className="text-primary font-medium mb-2">Director de Operaciones</p>
              <p className="text-gray-700 text-sm">
                Con su visión estratégica, Javier ha sido clave en la expansión y mejora continua de nuestros servicios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Por qué elegirnos */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por Qué Elegirnos?</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaLeaf className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Ingredientes Frescos</h3>
            <p className="text-gray-700 text-center">
              Seleccionamos cuidadosamente cada ingrediente, priorizando productos locales y de temporada para garantizar el mejor sabor y calidad.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Equipo Apasionado</h3>
            <p className="text-gray-700 text-center">
              Nuestro personal no solo está altamente capacitado, sino que comparte una pasión genuina por la gastronomía y el servicio al cliente.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaHandshake className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Compromiso Social</h3>
            <p className="text-gray-700 text-center">
              Colaboramos con productores locales y participamos en iniciativas comunitarias, buscando generar un impacto positivo en nuestra sociedad.
            </p>
          </div>
        </div>
      </div>

      {/* Reconocimientos */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Reconocimientos</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            A lo largo de nuestra trayectoria, hemos sido honrados con diversos reconocimientos que validan nuestro compromiso con la excelencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FaAward className="text-amber-600 text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mejor Café de Especialidad 2022</h3>
              <p className="text-gray-700 text-sm">
                Otorgado por la Asociación de Baristas Profesionales, reconociendo la calidad de nuestro café y la técnica de nuestros baristas.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FaAward className="text-amber-600 text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Premio a la Innovación Gastronómica 2021</h3>
              <p className="text-gray-700 text-sm">
                Por nuestra creativa carta de crepes que fusiona sabores tradicionales con propuestas contemporáneas.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FaAward className="text-amber-600 text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Certificación de Excelencia 2020-2023</h3>
              <p className="text-gray-700 text-sm">
                Otorgada por TripAdvisor durante cuatro años consecutivos, basada en las excelentes reseñas de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¡Ven a visitarnos!</h2>
          <p className="text-white text-lg mb-6">
            Te invitamos a vivir la experiencia Crepes & Coffee. Disfruta de nuestras deliciosas creaciones en un ambiente acogedor o pide a domicilio desde la comodidad de tu hogar.
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
        <Link to="/contacto" className="text-gray-600 hover:text-primary transition-colors">Contacto</Link>
        <span className="text-gray-400">|</span>
        <Link to="/preguntas-frecuentes" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
      </div>
    </div>
  );
};

export default AboutUs;