import React from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaLock, FaQuestionCircle, FaExclamationTriangle, FaInfoCircle, FaMoneyBillWave } from 'react-icons/fa';

const PaymentMethods = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Métodos de Pago</h1>
        <p className="text-gray-600">
          Información sobre las formas de pago aceptadas, proceso de pago y seguridad en las transacciones.
        </p>
      </div>

      {/* Navegación de la página */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <nav className="flex flex-wrap gap-2">
          <a href="#metodos" className="text-primary hover:underline">Métodos Aceptados</a>
          <span className="text-gray-400">|</span>
          <a href="#proceso" className="text-primary hover:underline">Proceso de Pago</a>
          <span className="text-gray-400">|</span>
          <a href="#seguridad" className="text-primary hover:underline">Seguridad</a>
          <span className="text-gray-400">|</span>
          <a href="#problemas" className="text-primary hover:underline">Solución de Problemas</a>
          <span className="text-gray-400">|</span>
          <a href="#preguntas" className="text-primary hover:underline">Preguntas Frecuentes</a>
        </nav>
      </div>

      {/* Métodos de Pago Aceptados */}
      <section id="metodos" className="mb-12">
        <div className="flex items-center mb-4">
          <FaCreditCard className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Métodos de Pago Aceptados</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            En Crepes & Coffee, nos esforzamos por ofrecer múltiples opciones de pago para hacer tu experiencia de compra lo más conveniente posible. Actualmente aceptamos los siguientes métodos de pago:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Tarjetas de Crédito/Débito */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <i className="fas fa-credit-card text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Tarjetas de Crédito y Débito</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Aceptamos las principales tarjetas de crédito y débito para tu comodidad.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-2 w-16 h-10">
                  <i className="fab fa-cc-visa text-blue-800 text-2xl"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-2 w-16 h-10">
                  <i className="fab fa-cc-mastercard text-red-600 text-2xl"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-2 w-16 h-10">
                  <i className="fab fa-cc-amex text-blue-500 text-2xl"></i>
                </div>
              </div>
            </div>
            
            {/* Pagos Digitales */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <i className="fas fa-mobile-alt text-green-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Pagos Digitales</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Utilizamos plataformas seguras para procesar pagos digitales.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-2 h-10 px-3">
                  <span className="font-semibold text-amber-600">MercadoPago</span>
                </div>
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-2 h-10 px-3">
                  <span className="font-semibold text-blue-600">PayPal</span>
                </div>
              </div>
            </div>
            
            {/* Efectivo */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 p-3 rounded-full mr-3">
                  <i className="fas fa-money-bill-wave text-yellow-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Efectivo</h3>
              </div>
              <p className="text-gray-700">
                Aceptamos pagos en efectivo para pedidos en tienda y para entregas a domicilio (pago contra entrega). Para pedidos a domicilio, te recomendamos tener el monto exacto para facilitar la transacción.
              </p>
            </div>
            
            {/* Transferencia Bancaria */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-3 rounded-full mr-3">
                  <i className="fas fa-university text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Transferencia Bancaria</h3>
              </div>
              <p className="text-gray-700">
                Para pedidos grandes o eventos, aceptamos transferencias bancarias. Este método requiere confirmación previa y los detalles se proporcionarán al momento de la compra. El pedido se procesará una vez confirmado el pago.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> Algunos métodos de pago pueden tener restricciones según el tipo de pedido o ubicación. Durante el proceso de checkout, se mostrarán las opciones disponibles para tu pedido específico.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso de Pago */}
      <section id="proceso" className="mb-12">
        <div className="flex items-center mb-4">
          <FaMoneyBillWave className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Proceso de Pago</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            Nuestro proceso de pago está diseñado para ser simple, transparente y seguro. A continuación, te explicamos cómo funciona:
          </p>
          
          <div className="relative">
            {/* Línea de tiempo vertical */}
            <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {/* Paso 1 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  1
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Selección de productos</h3>
                  <p className="text-gray-700">
                    Navega por nuestro menú, selecciona los productos que deseas y agrégalos a tu carrito de compras. Puedes revisar y modificar tu pedido en cualquier momento antes de proceder al pago.
                  </p>
                </div>
              </div>
              
              {/* Paso 2 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  2
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Checkout</h3>
                  <p className="text-gray-700">
                    Una vez que hayas finalizado tu selección, haz clic en "Proceder al pago". Si ya tienes una cuenta, inicia sesión; de lo contrario, puedes crear una cuenta o continuar como invitado proporcionando la información necesaria para la entrega.
                  </p>
                </div>
              </div>
              
              {/* Paso 3 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  3
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Información de entrega</h3>
                  <p className="text-gray-700">
                    Proporciona tu dirección de entrega y selecciona el método de entrega preferido (a domicilio o recogida en tienda). En esta etapa, se calculará el costo de envío si aplica.
                  </p>
                </div>
              </div>
              
              {/* Paso 4 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  4
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Selección del método de pago</h3>
                  <p className="text-gray-700">
                    Elige tu método de pago preferido entre las opciones disponibles. Dependiendo del método seleccionado, se te pedirá que proporciones la información necesaria (detalles de la tarjeta, cuenta de PayPal, etc.).
                  </p>
                </div>
              </div>
              
              {/* Paso 5 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  5
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Revisión y confirmación</h3>
                  <p className="text-gray-700">
                    Revisa el resumen de tu pedido, incluyendo productos, cantidades, dirección de entrega y método de pago. Verifica que toda la información sea correcta antes de confirmar tu pedido.
                  </p>
                </div>
              </div>
              
              {/* Paso 6 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-none flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-4 md:mb-0 z-10">
                  6
                </div>
                <div className="md:ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Procesamiento del pago</h3>
                  <p className="text-gray-700">
                    Una vez confirmado el pedido, serás redirigido a la plataforma de pago correspondiente para completar la transacción. Después de procesar el pago, recibirás una confirmación por correo electrónico con los detalles de tu pedido.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-sm text-green-700">
              <strong>Consejo:</strong> Para una experiencia de compra más rápida en el futuro, considera crear una cuenta y guardar tus métodos de pago preferidos y direcciones de entrega.
            </p>
          </div>
        </div>
      </section>

      {/* Seguridad en los Pagos */}
      <section id="seguridad" className="mb-12">
        <div className="flex items-center mb-4">
          <FaLock className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Seguridad en los Pagos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            La seguridad de tus datos y transacciones es nuestra prioridad. Implementamos múltiples medidas para proteger tu información financiera y personal:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <i className="fas fa-shield-alt text-green-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Encriptación SSL</h3>
              </div>
              <p className="text-gray-700">
                Utilizamos encriptación SSL (Secure Socket Layer) de 256 bits para proteger todas las transacciones. Esto garantiza que toda la información transmitida entre tu navegador y nuestro servidor esté cifrada y sea ilegible para terceros.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <i className="fas fa-credit-card text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Cumplimiento PCI DSS</h3>
              </div>
              <p className="text-gray-700">
                Cumplimos con los estándares PCI DSS (Payment Card Industry Data Security Standard), lo que significa que seguimos estrictos protocolos de seguridad para el manejo de información de tarjetas de crédito y débito.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-3 rounded-full mr-3">
                  <i className="fas fa-user-shield text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">No Almacenamiento de Datos Sensibles</h3>
              </div>
              <p className="text-gray-700">
                No almacenamos información completa de tarjetas de crédito en nuestros servidores. Todos los datos sensibles son procesados directamente por nuestros proveedores de servicios de pago, que cuentan con las más altas certificaciones de seguridad.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-3 rounded-full mr-3">
                  <i className="fas fa-fingerprint text-red-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Autenticación de Dos Factores</h3>
              </div>
              <p className="text-gray-700">
                Para pagos con tarjeta, implementamos la autenticación de dos factores (3D Secure) cuando está disponible, añadiendo una capa adicional de seguridad al requerir verificación por parte del banco emisor.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex items-center space-x-4">
              <i className="fas fa-lock text-green-600 text-2xl"></i>
              <span className="text-gray-700 font-medium">Sitio Seguro</span>
              <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
              <span className="text-gray-700 font-medium">Pagos Protegidos</span>
              <i className="fas fa-user-shield text-green-600 text-2xl"></i>
              <span className="text-gray-700 font-medium">Datos Encriptados</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-700">
              <strong>Importante:</strong> Nunca te solicitaremos información sensible como contraseñas o números completos de tarjeta por correo electrónico o teléfono. Si recibes alguna comunicación sospechosa, por favor contáctanos inmediatamente.
            </p>
          </div>
        </div>
      </section>

      {/* Solución de Problemas */}
      <section id="problemas" className="mb-12">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Solución de Problemas con Pagos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            Si experimentas algún problema durante el proceso de pago, aquí encontrarás soluciones a los inconvenientes más comunes:
          </p>
          
          <div className="space-y-6 mb-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Pago rechazado</h3>
              <p className="text-gray-700 mb-2">
                Si tu pago es rechazado, puede deberse a varias razones:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Fondos insuficientes en la cuenta o tarjeta</li>
                <li>Límite de crédito excedido</li>
                <li>Información incorrecta (número de tarjeta, fecha de vencimiento, código CVV)</li>
                <li>Restricciones del banco para compras en línea o internacionales</li>
                <li>Problemas técnicos temporales con el procesador de pagos</li>
              </ul>
              <p className="text-gray-700 mt-2">
                <strong>Solución:</strong> Verifica la información proporcionada, contacta a tu banco para confirmar que no hay restricciones en tu cuenta, o intenta con un método de pago alternativo.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Doble cargo</h3>
              <p className="text-gray-700 mb-2">
                En raras ocasiones, puede aparecer un cargo duplicado en tu estado de cuenta.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Solución:</strong> Contacta a nuestro servicio al cliente con los detalles de tu pedido y la información del cargo duplicado. Investigaremos el caso y, si se confirma el doble cargo, procesaremos el reembolso correspondiente en un plazo de 3-5 días hábiles.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Pago realizado pero pedido no confirmado</h3>
              <p className="text-gray-700 mb-2">
                Si has realizado un pago pero no has recibido confirmación de tu pedido, puede haber ocurrido un problema de comunicación entre el sistema de pagos y nuestra plataforma.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Solución:</strong> Espera unos minutos y verifica tu correo electrónico, incluyendo la carpeta de spam. Si después de 15 minutos no has recibido confirmación, contacta a nuestro servicio al cliente proporcionando el número de referencia de la transacción (si lo tienes) o los detalles del pago.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Error en la página de pago</h3>
              <p className="text-gray-700 mb-2">
                Si encuentras un error técnico durante el proceso de pago, puede deberse a problemas temporales con el servidor o incompatibilidades con tu navegador.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Solución:</strong> Intenta refrescar la página, utiliza otro navegador, o borra la caché y las cookies. Si el problema persiste, contacta a nuestro soporte técnico describiendo el error y, si es posible, adjunta una captura de pantalla.
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">
              <strong>Atención:</strong> Si experimentas problemas recurrentes con los pagos o detectas cargos no autorizados, contacta inmediatamente a tu banco para proteger tu cuenta y luego infórmanos para que podamos investigar posibles vulnerabilidades en nuestro sistema.
            </p>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section id="preguntas" className="mb-12">
        <div className="flex items-center mb-4">
          <FaQuestionCircle className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Preguntas Frecuentes sobre Pagos</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Es seguro ingresar los datos de mi tarjeta en su sitio web?</h3>
              <p className="text-gray-700">
                Sí, utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para proteger tu información. Además, los datos sensibles de tu tarjeta son procesados directamente por nuestros proveedores de servicios de pago certificados, no se almacenan en nuestros servidores.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Cuándo se realiza el cargo a mi tarjeta?</h3>
              <p className="text-gray-700">
                El cargo a tu tarjeta se realiza inmediatamente después de confirmar tu pedido. En el caso de pedidos programados para una fecha futura, el cargo se realizará igualmente al momento de la confirmación, no en la fecha de entrega.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Puedo usar más de un método de pago para un solo pedido?</h3>
              <p className="text-gray-700">
                Actualmente, nuestro sistema no permite dividir el pago entre múltiples métodos. Debes completar la transacción utilizando un solo método de pago. Sin embargo, para pedidos corporativos o eventos especiales, puedes contactarnos para discutir opciones personalizadas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Ofrecen la opción de pago contra entrega?</h3>
              <p className="text-gray-700">
                Sí, ofrecemos la opción de pago contra entrega en efectivo para pedidos dentro de nuestra zona de cobertura principal. Para zonas extendidas o pedidos de gran volumen, podríamos requerir un depósito previo. Esta opción se mostrará durante el proceso de checkout si está disponible para tu ubicación.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">¿Emiten facturas para mis compras?</h3>
              <p className="text-gray-700">
                Sí, emitimos facturas electrónicas para todas las compras. Durante el proceso de checkout, puedes indicar si necesitas factura y proporcionar tus datos fiscales. La factura será enviada al correo electrónico registrado en un plazo de 24 horas después de completar tu pedido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto para dudas */}
      <section id="contacto" className="mb-12">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">¿Necesitas ayuda adicional?</h2>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Si tienes alguna duda adicional sobre nuestros métodos de pago o has experimentado algún problema durante el proceso, nuestro equipo de atención al cliente está disponible para ayudarte.
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
      </section>

      {/* Enlaces relacionados */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/politica-privacidad" className="text-gray-600 hover:text-primary transition-colors">Política de Privacidad</Link>
        <span className="text-gray-400">|</span>
        <Link to="/terminos-condiciones" className="text-gray-600 hover:text-primary transition-colors">Términos y Condiciones</Link>
        <span className="text-gray-400">|</span>
        <Link to="/politica-envios" className="text-gray-600 hover:text-primary transition-colors">Política de Envíos</Link>
      </div>
    </div>
  );
};

export default PaymentMethods;