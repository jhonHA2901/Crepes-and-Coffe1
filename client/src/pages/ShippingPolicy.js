import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaExchangeAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Política de Envíos y Devoluciones</h1>
        <p className="text-gray-600">
          Información importante sobre nuestros servicios de entrega, tiempos de envío y proceso de devoluciones.
        </p>
      </div>

      {/* Navegación de la página */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <nav className="flex flex-wrap gap-2">
          <a href="#envios" className="text-primary hover:underline">Envíos</a>
          <span className="text-gray-400">|</span>
          <a href="#zonas" className="text-primary hover:underline">Zonas de Cobertura</a>
          <span className="text-gray-400">|</span>
          <a href="#tiempos" className="text-primary hover:underline">Tiempos de Entrega</a>
          <span className="text-gray-400">|</span>
          <a href="#costos" className="text-primary hover:underline">Costos de Envío</a>
          <span className="text-gray-400">|</span>
          <a href="#devoluciones" className="text-primary hover:underline">Devoluciones</a>
          <span className="text-gray-400">|</span>
          <a href="#preguntas" className="text-primary hover:underline">Preguntas Frecuentes</a>
        </nav>
      </div>

      {/* Sección de Envíos */}
      <section id="envios" className="mb-12">
        <div className="flex items-center mb-4">
          <FaTruck className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Política de Envíos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            En Crepes & Coffee nos comprometemos a entregar nuestros productos frescos y en perfectas condiciones. Trabajamos con un equipo de repartidores propios y colaboramos con servicios de entrega externos para garantizar que tu pedido llegue a tiempo y en óptimas condiciones.
          </p>
          <p className="text-gray-700 mb-4">
            Todos nuestros envíos incluyen:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Empaque especial para mantener la temperatura adecuada</li>
            <li>Sellado de seguridad para garantizar que el producto no ha sido manipulado</li>
            <li>Etiquetado con información nutricional y de alérgenos</li>
            <li>Seguimiento en tiempo real del estado de tu pedido (cuando aplique)</li>
          </ul>
          <p className="text-gray-700">
            Para realizar un pedido a domicilio, puedes hacerlo a través de nuestra página web, aplicación móvil o llamando directamente a nuestro número de atención al cliente.
          </p>
        </div>
      </section>

      {/* Zonas de Cobertura */}
      <section id="zonas" className="mb-12">
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Zonas de Cobertura</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Actualmente ofrecemos servicio de entrega a domicilio en las siguientes zonas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Zona Centro:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Centro Histórico</li>
                <li>Condesa</li>
                <li>Roma Norte y Sur</li>
                <li>Polanco</li>
                <li>Juárez</li>
                <li>Cuauhtémoc</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Zona Sur:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Del Valle</li>
                <li>Narvarte</li>
                <li>Coyoacán</li>
                <li>San Ángel</li>
                <li>Tlalpan (zonas seleccionadas)</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Si tu ubicación no aparece en la lista, te invitamos a contactarnos para verificar si podemos atenderte. Estamos constantemente ampliando nuestras zonas de cobertura para llegar a más clientes.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-700">
              <strong>Nota:</strong> Para pedidos fuera de nuestras zonas de cobertura habituales, puede aplicarse un cargo adicional por distancia y el tiempo de entrega podría ser mayor.
            </p>
          </div>
        </div>
      </section>

      {/* Tiempos de Entrega */}
      <section id="tiempos" className="mb-12">
        <div className="flex items-center mb-4">
          <FaClock className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Tiempos de Entrega</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Nos esforzamos por entregar tu pedido lo más rápido posible, manteniendo la calidad y frescura de nuestros productos. Los tiempos estimados de entrega son:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Tipo de Pedido</th>
                  <th className="py-3 px-4 text-left">Tiempo Estimado</th>
                  <th className="py-3 px-4 text-left">Observaciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3 px-4">Pedido Estándar</td>
                  <td className="py-3 px-4">30-45 minutos</td>
                  <td className="py-3 px-4">Para zonas cercanas en horario regular</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Hora Pico</td>
                  <td className="py-3 px-4">45-60 minutos</td>
                  <td className="py-3 px-4">Durante horarios de alta demanda (12:00-14:00 y 19:00-21:00)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Zonas Extendidas</td>
                  <td className="py-3 px-4">60-75 minutos</td>
                  <td className="py-3 px-4">Para ubicaciones en los límites de nuestra zona de cobertura</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Pedidos Programados</td>
                  <td className="py-3 px-4">Hora acordada</td>
                  <td className="py-3 px-4">Pedidos realizados con al menos 3 horas de anticipación</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mb-4">
            Los tiempos de entrega pueden variar dependiendo de factores como el tráfico, condiciones climáticas o alta demanda. En caso de que prevemos un retraso significativo, nos comunicaremos contigo para informarte.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-700">
              <strong>Consejo:</strong> Para asegurar una entrega más rápida, te recomendamos realizar tu pedido en horarios de menor demanda y proporcionar instrucciones claras de entrega (edificio, piso, referencias, etc.).
            </p>
          </div>
        </div>
      </section>

      {/* Costos de Envío */}
      <section id="costos" className="mb-12">
        <div className="flex items-center mb-4">
          <FaMoneyBillWave className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Costos de Envío</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Nuestros costos de envío se calculan en base a la distancia entre nuestro establecimiento y tu ubicación:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Distancia</th>
                  <th className="py-3 px-4 text-left">Costo de Envío</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3 px-4">0-3 km</td>
                  <td className="py-3 px-4">$30 MXN</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3-5 km</td>
                  <td className="py-3 px-4">$45 MXN</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5-7 km</td>
                  <td className="py-3 px-4">$60 MXN</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Más de 7 km</td>
                  <td className="py-3 px-4">Consultar disponibilidad</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <p className="text-sm text-green-700">
              <strong>¡Envío gratis!</strong> En pedidos superiores a $350 MXN dentro de un radio de 5 km.
            </p>
          </div>
          <p className="text-gray-700">
            El costo exacto de envío se calculará automáticamente en el proceso de checkout, antes de confirmar tu pedido. Para pedidos corporativos o eventos especiales, contáctanos para obtener una cotización personalizada.
          </p>
        </div>
      </section>

      {/* Política de Devoluciones */}
      <section id="devoluciones" className="mb-12">
        <div className="flex items-center mb-4">
          <FaExchangeAlt className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Política de Devoluciones</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            En Crepes & Coffee nos esforzamos por ofrecer productos de la más alta calidad. Si por alguna razón no estás satisfecho con tu pedido, ofrecemos las siguientes opciones:
          </p>
          <h3 className="font-semibold text-gray-800 mb-2">Productos Dañados o Incorrectos:</h3>
          <p className="text-gray-700 mb-4">
            Si recibes un producto dañado, incompleto o diferente al que ordenaste, por favor contáctanos dentro de los 30 minutos posteriores a la entrega. Puedes hacerlo a través de:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Llamada telefónica al número que aparece en tu recibo</li>
            <li>WhatsApp al número de atención al cliente</li>
            <li>Sección de contacto en nuestra página web</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Dependiendo del caso, ofreceremos:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Reemplazo del producto (sujeto a disponibilidad)</li>
            <li>Reembolso total o parcial</li>
            <li>Crédito para tu próxima compra</li>
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2">Cancelaciones:</h3>
          <p className="text-gray-700 mb-4">
            Las cancelaciones de pedidos solo se aceptarán si el pedido aún no ha entrado en preparación. Una vez que tu pedido comienza a prepararse, no es posible cancelarlo debido a la naturaleza perecedera de nuestros productos.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">
              <strong>Importante:</strong> Por razones de seguridad alimentaria, no aceptamos devoluciones de productos que hayan sido parcialmente consumidos o que hayan estado fuera de nuestro control por más de 30 minutos, a menos que se demuestre un problema de calidad inherente al producto.
            </p>
          </div>
          <p className="text-gray-700">
            Cada caso será evaluado individualmente por nuestro equipo de atención al cliente, quienes buscarán la mejor solución para garantizar tu satisfacción.
          </p>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section id="preguntas" className="mb-12">
        <div className="flex items-center mb-4">
          <FaShieldAlt className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Preguntas Frecuentes</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Puedo modificar mi pedido después de realizarlo?</h3>
              <p className="text-gray-700">
                Puedes modificar tu pedido dentro de los primeros 5 minutos después de realizarlo, contactando directamente a nuestro servicio al cliente. Una vez que el pedido entra en preparación, no es posible realizar cambios.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Qué hago si mi pedido llega con retraso?</h3>
              <p className="text-gray-700">
                Si tu pedido se retrasa más de 15 minutos del tiempo estimado, contáctanos para verificar el estado. En caso de retrasos significativos, ofreceremos compensación como descuento en tu próxima compra o envío gratuito.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Puedo programar un pedido para una fecha u hora específica?</h3>
              <p className="text-gray-700">
                Sí, ofrecemos la opción de programar pedidos con al menos 3 horas de anticipación. Para eventos especiales o pedidos grandes, recomendamos hacerlo con 24 horas de antelación.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Cómo puedo hacer seguimiento de mi pedido?</h3>
              <p className="text-gray-700">
                Una vez confirmado tu pedido, recibirás un enlace de seguimiento por SMS o correo electrónico. También puedes verificar el estado de tu pedido en la sección "Mis Pedidos" de tu cuenta.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Qué medidas toman para garantizar la seguridad alimentaria?</h3>
              <p className="text-gray-700">
                Todos nuestros productos se preparan siguiendo estrictos protocolos de higiene. Utilizamos empaques especiales que mantienen la temperatura adecuada y sellos de seguridad para garantizar que tu pedido llegue en perfectas condiciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto para dudas */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">¿Tienes más preguntas?</h2>
        <p className="text-gray-700 mb-4">
          Si tienes alguna duda adicional sobre nuestras políticas de envío o devoluciones, no dudes en contactarnos. Nuestro equipo de atención al cliente estará encantado de ayudarte.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/contacto" className="btn btn-primary">
            Contactar Servicio al Cliente
          </Link>
          <Link to="/preguntas-frecuentes" className="btn btn-outline">
            Ver Preguntas Frecuentes
          </Link>
        </div>
      </div>

      {/* Enlaces relacionados */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/productos" className="text-gray-600 hover:text-primary transition-colors">Productos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/terminos-condiciones" className="text-gray-600 hover:text-primary transition-colors">Términos y Condiciones</Link>
        <span className="text-gray-400">|</span>
        <Link to="/politica-privacidad" className="text-gray-600 hover:text-primary transition-colors">Política de Privacidad</Link>
      </div>
    </div>
  );
};

export default ShippingPolicy;