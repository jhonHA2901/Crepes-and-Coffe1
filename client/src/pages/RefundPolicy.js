import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaExchangeAlt, FaClipboardCheck, FaCalendarAlt, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Política de Reembolsos</h1>
        <p className="text-gray-600">
          Información detallada sobre nuestro proceso de reembolsos, cancelaciones y devoluciones de dinero.
        </p>
      </div>

      {/* Navegación de la página */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <nav className="flex flex-wrap gap-2">
          <a href="#elegibilidad" className="text-primary hover:underline">Elegibilidad</a>
          <span className="text-gray-400">|</span>
          <a href="#proceso" className="text-primary hover:underline">Proceso de Reembolso</a>
          <span className="text-gray-400">|</span>
          <a href="#plazos" className="text-primary hover:underline">Plazos</a>
          <span className="text-gray-400">|</span>
          <a href="#metodos" className="text-primary hover:underline">Métodos de Reembolso</a>
          <span className="text-gray-400">|</span>
          <a href="#excepciones" className="text-primary hover:underline">Excepciones</a>
          <span className="text-gray-400">|</span>
          <a href="#preguntas" className="text-primary hover:underline">Preguntas Frecuentes</a>
        </nav>
      </div>

      {/* Sección de Elegibilidad */}
      <section id="elegibilidad" className="mb-12">
        <div className="flex items-center mb-4">
          <FaClipboardCheck className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Elegibilidad para Reembolsos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            En Crepes & Coffee, nos esforzamos por ofrecer productos de la más alta calidad. Sin embargo, entendemos que en ocasiones puede ser necesario solicitar un reembolso. A continuación, detallamos las situaciones en las que un pedido es elegible para reembolso:
          </p>
          
          <h3 className="font-semibold text-gray-800 mb-2">Reembolsos Completos:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Pedido no entregado (después de un tiempo razonable y verificación)</li>
            <li>Producto recibido significativamente diferente a la descripción</li>
            <li>Producto dañado o en mal estado al momento de la entrega</li>
            <li>Error en el pedido por parte de nuestro personal</li>
            <li>Problemas de calidad evidentes (contaminación, ingredientes en mal estado)</li>
            <li>Cancelación del pedido antes de que entre en preparación</li>
          </ul>
          
          <h3 className="font-semibold text-gray-800 mb-2">Reembolsos Parciales:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Entrega significativamente retrasada (más de 60 minutos del tiempo estimado)</li>
            <li>Pedido incompleto (se reembolsará el valor de los productos faltantes)</li>
            <li>Calidad por debajo de nuestros estándares, pero el producto es consumible</li>
            <li>Problemas menores con el pedido que no afectan la totalidad del mismo</li>
          </ul>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-yellow-700">
              <strong>Importante:</strong> Todas las solicitudes de reembolso deben realizarse dentro de los plazos establecidos y estar debidamente documentadas para su evaluación.
            </p>
          </div>
          
          <p className="text-gray-700">
            Nos reservamos el derecho de evaluar cada caso individualmente y solicitar evidencia (como fotografías) para verificar los problemas reportados antes de proceder con el reembolso.
          </p>
        </div>
      </section>

      {/* Proceso de Reembolso */}
      <section id="proceso" className="mb-12">
        <div className="flex items-center mb-4">
          <FaExchangeAlt className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Proceso de Solicitud de Reembolso</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Para solicitar un reembolso, sigue estos pasos:
          </p>
          
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-4">
            <li>
              <strong>Contacta a nuestro servicio al cliente</strong> a través de uno de estos canales:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Llamada telefónica: +1 (555) 123-4567</li>
                <li>WhatsApp: +1 (555) 987-6543</li>
                <li>Correo electrónico: reembolsos@crepesandcoffee.com</li>
                <li>Formulario de contacto en nuestra página web</li>
              </ul>
            </li>
            <li>
              <strong>Proporciona la información necesaria:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Número de pedido o referencia</li>
                <li>Fecha y hora del pedido</li>
                <li>Descripción detallada del problema</li>
                <li>Evidencia fotográfica (si aplica)</li>
                <li>Método de pago utilizado</li>
              </ul>
            </li>
            <li>
              <strong>Revisión de la solicitud:</strong> Nuestro equipo evaluará tu caso en un plazo máximo de 48 horas hábiles.
            </li>
            <li>
              <strong>Resolución:</strong> Te notificaremos por correo electrónico sobre la decisión tomada y, en caso de aprobación, los detalles del reembolso.
            </li>
            <li>
              <strong>Procesamiento del reembolso:</strong> Si tu solicitud es aprobada, procesaremos el reembolso según los plazos y métodos detallados en las siguientes secciones.
            </li>
          </ol>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-700">
              <strong>Consejo:</strong> Para agilizar el proceso, te recomendamos tener a mano toda la información relacionada con tu pedido y, si es posible, incluir fotografías que evidencien el problema reportado.
            </p>
          </div>
        </div>
      </section>

      {/* Plazos de Reembolso */}
      <section id="plazos" className="mb-12">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Plazos de Reembolso</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Es importante tener en cuenta los siguientes plazos relacionados con nuestro proceso de reembolso:
          </p>
          
          <h3 className="font-semibold text-gray-800 mb-2">Plazos para Solicitar un Reembolso:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Productos dañados o incorrectos:</strong> Dentro de los 30 minutos posteriores a la recepción del pedido</li>
            <li><strong>Pedido no entregado:</strong> Después de 60 minutos del tiempo de entrega estimado</li>
            <li><strong>Problemas de calidad:</strong> Dentro de las 2 horas posteriores a la recepción del pedido</li>
            <li><strong>Cancelaciones:</strong> Solo antes de que el pedido entre en preparación</li>
          </ul>
          
          <h3 className="font-semibold text-gray-800 mb-2">Plazos de Procesamiento:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Revisión de la solicitud:</strong> 24-48 horas hábiles</li>
            <li><strong>Aprobación o rechazo:</strong> 1-2 días hábiles después de la revisión</li>
            <li><strong>Procesamiento del reembolso:</strong> 1-3 días hábiles después de la aprobación</li>
          </ul>
          
          <h3 className="font-semibold text-gray-800 mb-2">Tiempo de Acreditación:</h3>
          <p className="text-gray-700 mb-4">
            Una vez procesado el reembolso, el tiempo que tarda en reflejarse en tu cuenta depende del método de pago original:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Tarjetas de crédito:</strong> 5-10 días hábiles</li>
            <li><strong>Tarjetas de débito:</strong> 3-7 días hábiles</li>
            <li><strong>Transferencia bancaria:</strong> 3-5 días hábiles</li>
            <li><strong>Monederos electrónicos:</strong> 1-2 días hábiles</li>
            <li><strong>Crédito en tienda:</strong> Inmediato</li>
          </ul>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">
              <strong>Importante:</strong> Las solicitudes realizadas fuera de los plazos establecidos serán evaluadas caso por caso, sin garantía de aprobación. Te recomendamos reportar cualquier problema con tu pedido lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Métodos de Reembolso */}
      <section id="metodos" className="mb-12">
        <div className="flex items-center mb-4">
          <FaMoneyBillWave className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Métodos de Reembolso</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Ofrecemos diferentes opciones para procesar tu reembolso. Por lo general, el reembolso se realizará a través del mismo método de pago utilizado en la compra original, pero también puedes solicitar alguna de las siguientes alternativas:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Método de Reembolso</th>
                  <th className="py-3 px-4 text-left">Descripción</th>
                  <th className="py-3 px-4 text-left">Tiempo de Procesamiento</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3 px-4">Reembolso a tarjeta</td>
                  <td className="py-3 px-4">El monto se devuelve a la tarjeta utilizada en la compra</td>
                  <td className="py-3 px-4">5-10 días hábiles</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Crédito en tienda</td>
                  <td className="py-3 px-4">El monto se acredita a tu cuenta para futuras compras</td>
                  <td className="py-3 px-4">Inmediato</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Reemplazo de producto</td>
                  <td className="py-3 px-4">Envío de un nuevo producto en sustitución</td>
                  <td className="py-3 px-4">Siguiente pedido o entrega especial</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Cupón de descuento</td>
                  <td className="py-3 px-4">Cupón con valor superior al monto del reembolso</td>
                  <td className="py-3 px-4">Inmediato</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-700 mb-4">
            En caso de reembolsos parciales, puedes elegir entre recibir el monto proporcional o un crédito/cupón de mayor valor para compensar la inconveniencia.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-sm text-green-700">
              <strong>Recomendación:</strong> El crédito en tienda o cupón de descuento suele ser la opción más rápida y, en muchos casos, ofrecemos un valor adicional como compensación por la inconveniencia.
            </p>
          </div>
        </div>
      </section>

      {/* Excepciones */}
      <section id="excepciones" className="mb-12">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Excepciones y Casos Especiales</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Existen algunas situaciones en las que nuestra política de reembolsos puede tener excepciones o consideraciones especiales:
          </p>
          
          <h3 className="font-semibold text-gray-800 mb-2">Casos No Elegibles para Reembolso:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Insatisfacción con el sabor o preferencias personales cuando el producto cumple con su descripción</li>
            <li>Pedidos personalizados o modificados según especificaciones del cliente</li>
            <li>Productos consumidos en más del 25% de su totalidad</li>
            <li>Solicitudes realizadas fuera de los plazos establecidos sin justificación válida</li>
            <li>Problemas no reportados en el momento de la entrega cuando era evidente el daño o error</li>
          </ul>
          
          <h3 className="font-semibold text-gray-800 mb-2">Consideraciones Especiales:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Clientes frecuentes:</strong> Evaluación más flexible para clientes con historial de compras regulares</li>
            <li><strong>Eventos de fuerza mayor:</strong> Consideraciones especiales en caso de problemas causados por condiciones climáticas extremas, cortes de energía u otros eventos fuera de nuestro control</li>
            <li><strong>Problemas recurrentes:</strong> Compensación adicional para clientes que han experimentado problemas en pedidos anteriores</li>
            <li><strong>Pedidos de gran volumen:</strong> Políticas adaptadas para pedidos corporativos o eventos especiales</li>
          </ul>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <p className="text-sm text-purple-700">
              <strong>Nota:</strong> Nos reservamos el derecho de modificar estas excepciones según cada caso particular. Nuestro objetivo principal es mantener la satisfacción del cliente mientras garantizamos prácticas comerciales justas y sostenibles.
            </p>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section id="preguntas" className="mb-12">
        <div className="flex items-center mb-4">
          <FaQuestionCircle className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Preguntas Frecuentes sobre Reembolsos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Puedo solicitar un reembolso después de haber consumido parte del producto?</h3>
              <p className="text-gray-700">
                Sí, pero solo si descubres un problema de calidad o seguridad después de haber iniciado el consumo. En estos casos, deberás conservar el resto del producto para su verificación y el reembolso estará sujeto a evaluación.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Qué sucede si no estoy disponible para recibir un pedido programado?</h3>
              <p className="text-gray-700">
                Si no estás disponible en el momento de la entrega y no has notificado con al menos 30 minutos de anticipación, podríamos aplicar un cargo por servicio antes de procesar cualquier reembolso.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Cómo puedo comprobar el estado de mi solicitud de reembolso?</h3>
              <p className="text-gray-700">
                Puedes verificar el estado de tu solicitud iniciando sesión en tu cuenta y visitando la sección "Mis Pedidos" o contactando directamente a nuestro servicio al cliente con tu número de referencia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Ofrecen compensación adicional por inconvenientes graves?</h3>
              <p className="text-gray-700">
                Sí, en casos de inconvenientes significativos (como retrasos extremos o problemas de calidad graves), podemos ofrecer compensaciones adicionales como cupones de descuento, productos gratuitos en tu próximo pedido o envío gratuito.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Qué ocurre si mi método de pago original ya no está disponible?</h3>
              <p className="text-gray-700">
                Si tu método de pago original ya no está disponible (tarjeta vencida, cuenta cerrada, etc.), te ofreceremos métodos alternativos como transferencia bancaria, crédito en tienda o cupones de descuento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto para dudas */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">¿Necesitas ayuda con un reembolso?</h2>
        <p className="text-gray-700 mb-4">
          Si tienes alguna duda adicional sobre nuestra política de reembolsos o necesitas asistencia con una solicitud específica, nuestro equipo de atención al cliente está disponible para ayudarte.
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
        <Link to="/politica-envios" className="text-gray-600 hover:text-primary transition-colors">Política de Envíos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/terminos-condiciones" className="text-gray-600 hover:text-primary transition-colors">Términos y Condiciones</Link>
        <span className="text-gray-400">|</span>
        <Link to="/politica-privacidad" className="text-gray-600 hover:text-primary transition-colors">Política de Privacidad</Link>
      </div>
    </div>
  );
};

export default RefundPolicy;