import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaHandsHelping, FaShoppingBag, FaUtensils, FaSeedling } from 'react-icons/fa';

const Sustainability = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuestra Política de Sostenibilidad</h1>
        <p className="text-gray-600">
          Comprometidos con el medio ambiente y la responsabilidad social en cada crepe que servimos.
        </p>
      </div>

      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-amber-600/80 z-10"></div>
        <div className="relative z-20 p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Crepes con Conciencia</h2>
          <p className="text-lg mb-6 max-w-2xl">
            En Crepes & Coffee creemos que la gastronomía de calidad debe ir de la mano con el respeto por nuestro planeta y comunidad. Cada decisión que tomamos está guiada por nuestro compromiso con la sostenibilidad.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaLeaf className="text-white mr-2" />
              <span>Ingredientes Sostenibles</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaRecycle className="text-white mr-2" />
              <span>Empaques Ecológicos</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaHandsHelping className="text-white mr-2" />
              <span>Comercio Justo</span>
            </div>
          </div>
        </div>
        <div className="h-64 md:h-80 bg-gray-200">
          {/* Aquí iría una imagen de fondo relacionada con sostenibilidad */}
        </div>
      </div>

      {/* Nuestros Compromisos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nuestros Compromisos con la Sostenibilidad</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Compromiso 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaSeedling className="text-green-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Ingredientes Locales y Orgánicos</h3>
            <p className="text-gray-700">
              Trabajamos con productores locales para obtener ingredientes frescos y de temporada, reduciendo nuestra huella de carbono y apoyando la economía local. Priorizamos productos orgánicos y de cultivo sostenible siempre que sea posible.
            </p>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>75% de nuestros ingredientes provienen de un radio de menos de 100 km</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Café de comercio justo certificado</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Huevos de gallinas libres de jaula</span>
              </li>
            </ul>
          </div>
          
          {/* Compromiso 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <FaRecycle className="text-amber-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Reducción de Residuos</h3>
            <p className="text-gray-700">
              Nos comprometemos a minimizar nuestro impacto ambiental mediante la reducción, reutilización y reciclaje de materiales. Hemos implementado un programa integral de gestión de residuos en todas nuestras operaciones.
            </p>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Empaques 100% compostables o reciclables</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Programa de compostaje para residuos orgánicos</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Eliminación de plásticos de un solo uso</span>
              </li>
            </ul>
          </div>
          
          {/* Compromiso 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaHandsHelping className="text-blue-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Responsabilidad Social</h3>
            <p className="text-gray-700">
              Creemos en construir un negocio que beneficie a nuestra comunidad. Ofrecemos condiciones laborales justas, apoyamos iniciativas locales y nos aseguramos de que nuestras prácticas comerciales sean éticas y transparentes.
            </p>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Salarios justos por encima del mínimo legal</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Programa de donación de alimentos a bancos locales</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Capacitación y oportunidades de desarrollo para empleados</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nuestras Iniciativas */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <FaLeaf className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Nuestras Iniciativas Sostenibles</h2>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="space-y-8">
            {/* Iniciativa 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-green-100 h-24 w-24 rounded-full flex items-center justify-center">
                  <FaShoppingBag className="text-green-600 text-3xl" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Programa "Trae Tu Propio Envase"</h3>
                <p className="text-gray-700 mb-3">
                  Incentivamos a nuestros clientes a traer sus propios envases reutilizables para llevar sus pedidos. Como agradecimiento por contribuir a reducir residuos, ofrecemos un 5% de descuento en su compra.
                </p>
                <div className="bg-green-50 border-l-4 border-green-400 p-3">
                  <p className="text-sm text-green-700">
                    <strong>Impacto:</strong> Hemos reducido en un 30% el uso de envases desechables desde la implementación de esta iniciativa.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Iniciativa 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-amber-100 h-24 w-24 rounded-full flex items-center justify-center">
                  <FaUtensils className="text-amber-600 text-3xl" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Menú de Temporada</h3>
                <p className="text-gray-700 mb-3">
                  Nuestro menú cambia trimestralmente para adaptarse a los ingredientes de temporada disponibles localmente. Esto nos permite ofrecer productos más frescos, reducir emisiones de transporte y apoyar a los agricultores de nuestra región.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3">
                  <p className="text-sm text-amber-700">
                    <strong>Impacto:</strong> Reducción del 40% en la huella de carbono asociada a nuestros ingredientes en comparación con un menú estático.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Iniciativa 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-blue-100 h-24 w-24 rounded-full flex items-center justify-center">
                  <FaHandsHelping className="text-blue-600 text-3xl" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Programa "Crepes Solidarios"</h3>
                <p className="text-gray-700 mb-3">
                  Por cada 10 crepes vendidos, donamos uno a organizaciones locales que trabajan con personas en situación de vulnerabilidad. Además, ofrecemos talleres gratuitos de cocina para jóvenes de comunidades desfavorecidas.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Impacto:</strong> Más de 5,000 crepes donados y 200 jóvenes capacitados desde el inicio del programa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos Futuros */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <FaSeedling className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Nuestros Objetivos para el Futuro</h2>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            Aunque estamos orgullosos de nuestros logros hasta ahora, reconocemos que la sostenibilidad es un viaje continuo. Estos son nuestros objetivos para los próximos años:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Corto Plazo (1-2 años)</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Alcanzar el 90% de ingredientes de origen local o sostenible</li>
                <li>Implementar un sistema de recolección de agua de lluvia</li>
                <li>Reducir el consumo energético en un 15% mediante mejoras en eficiencia</li>
                <li>Ampliar nuestro programa de compostaje para incluir a clientes</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Mediano Plazo (3-5 años)</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Lograr la certificación de Empresa B</li>
                <li>Transición a energía 100% renovable en todas nuestras instalaciones</li>
                <li>Establecer una cadena de suministro con cero emisiones netas</li>
                <li>Crear un programa de becas para jóvenes interesados en gastronomía sostenible</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Largo Plazo (5+ años)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Convertirse en un negocio de cero residuos</li>
              <li>Desarrollar un programa de cultivo propio para ingredientes clave</li>
              <li>Establecer un centro de innovación en gastronomía sostenible</li>
              <li>Expandir nuestro modelo de negocio sostenible a nuevas ubicaciones manteniendo nuestros principios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nuestras Certificaciones</h2>
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
              {/* Aquí iría el logo de la certificación */}
              <span className="text-gray-500 text-xs">Logo</span>
            </div>
            <span className="text-gray-800 font-medium">Comercio Justo</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
              {/* Aquí iría el logo de la certificación */}
              <span className="text-gray-500 text-xs">Logo</span>
            </div>
            <span className="text-gray-800 font-medium">Orgánico Certificado</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
              {/* Aquí iría el logo de la certificación */}
              <span className="text-gray-500 text-xs">Logo</span>
            </div>
            <span className="text-gray-800 font-medium">Empresa Verde</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
              {/* Aquí iría el logo de la certificación */}
              <span className="text-gray-500 text-xs">Logo</span>
            </div>
            <span className="text-gray-800 font-medium">Huella de Carbono Reducida</span>
          </div>
        </div>
        
        <p className="text-center text-gray-700">
          Estas certificaciones respaldan nuestro compromiso con prácticas sostenibles y éticas en toda nuestra cadena de valor.
        </p>
      </section>

      {/* Llamado a la acción */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Únete a Nuestro Compromiso</h2>
        <p className="text-gray-700 mb-4">
          La sostenibilidad es un esfuerzo colectivo. Te invitamos a ser parte de nuestro compromiso con el planeta y la comunidad. Pequeñas acciones como traer tu propio envase, elegir opciones vegetarianas ocasionalmente o compartir feedback sobre nuestras iniciativas pueden generar un gran impacto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/contacto" className="btn btn-primary">
            Comparte tus Ideas
          </Link>
          <Link to="/productos" className="btn btn-outline">
            Descubre Nuestros Productos Sostenibles
          </Link>
        </div>
      </div>

      {/* Enlaces relacionados */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/nosotros" className="text-gray-600 hover:text-primary transition-colors">Sobre Nosotros</Link>
        <span className="text-gray-400">|</span>
        <Link to="/contacto" className="text-gray-600 hover:text-primary transition-colors">Contacto</Link>
        <span className="text-gray-400">|</span>
        <Link to="/preguntas-frecuentes" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
      </div>
    </div>
  );
};

export default Sustainability;