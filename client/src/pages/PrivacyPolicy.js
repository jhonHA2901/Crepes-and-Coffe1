import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="border-b border-gray-200 pb-5 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
            <p className="mt-2 text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-amber max-w-none">
            <h2>1. Introducción</h2>
            <p>
              En Crepes & Coffee, respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
              Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita 
              nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
            </p>
            <p>
              Por favor, lea detenidamente esta política de privacidad para entender nuestras políticas y prácticas 
              con respecto a sus datos personales y cómo los trataremos.
            </p>
            
            <h2>2. Datos que Recopilamos</h2>
            <p>
              Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:
            </p>
            <ul>
              <li><strong>Datos de Identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador similar.</li>
              <li><strong>Datos de Contacto:</strong> incluye dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.</li>
              <li><strong>Datos de Transacción:</strong> incluye detalles sobre pagos hacia y desde usted, y otros detalles de productos y servicios que ha comprado de nosotros.</li>
              <li><strong>Datos Técnicos:</strong> incluye dirección de protocolo de Internet (IP), datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utiliza para acceder a este sitio web.</li>
              <li><strong>Datos de Perfil:</strong> incluye su nombre de usuario y contraseña, compras o pedidos realizados por usted, sus intereses, preferencias, comentarios y respuestas a encuestas.</li>
              <li><strong>Datos de Uso:</strong> incluye información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
              <li><strong>Datos de Marketing y Comunicaciones:</strong> incluye sus preferencias para recibir marketing de nosotros y de nuestros terceros, y sus preferencias de comunicación.</li>
            </ul>
            
            <h2>3. Cómo Recopilamos sus Datos Personales</h2>
            <p>
              Utilizamos diferentes métodos para recopilar datos de y sobre usted, incluyendo:
            </p>
            <ul>
              <li>
                <strong>Interacciones directas:</strong> Puede proporcionarnos sus datos de identidad, contacto y financieros al completar formularios o al comunicarse con nosotros por correo postal, teléfono, correo electrónico o de otra manera.
              </li>
              <li>
                <strong>Tecnologías o interacciones automatizadas:</strong> A medida que interactúa con nuestro sitio web, podemos recopilar automáticamente datos técnicos sobre su equipo, acciones de navegación y patrones. Recopilamos estos datos personales mediante el uso de cookies, registros del servidor y otras tecnologías similares.
              </li>
              <li>
                <strong>Terceros o fuentes disponibles públicamente:</strong> Podemos recibir datos personales sobre usted de varios terceros y fuentes públicas, como proveedores de análisis, proveedores de búsqueda, proveedores de publicidad.
              </li>
            </ul>
            
            <h2>4. Cómo Utilizamos sus Datos Personales</h2>
            <p>
              Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus datos personales en las siguientes circunstancias:
            </p>
            <ul>
              <li>Donde necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.</li>
              <li>Donde sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y derechos fundamentales no anulen esos intereses.</li>
              <li>Donde necesitemos cumplir con una obligación legal o regulatoria.</li>
            </ul>
            <p>
              En general, no confiamos en el consentimiento como base legal para procesar sus datos personales, excepto en relación con el envío de comunicaciones de marketing directo de terceros a usted a través de correo electrónico o mensaje de texto.
            </p>
            
            <h2>5. Divulgación de sus Datos Personales</h2>
            <p>
              Podemos compartir sus datos personales con las partes establecidas a continuación para los fines establecidos en la sección 4 anterior:
            </p>
            <ul>
              <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas.</li>
              <li>Asesores profesionales que incluyen abogados, banqueros, auditores y aseguradoras.</li>
              <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
              <li>Terceros a quienes podemos elegir vender, transferir o fusionar partes de nuestro negocio o nuestros activos.</li>
            </ul>
            <p>
              Requerimos que todos los terceros respeten la seguridad de sus datos personales y los traten de acuerdo con la ley. No permitimos que nuestros proveedores de servicios externos utilicen sus datos personales para sus propios fines y solo les permitimos procesar sus datos personales para fines específicos y de acuerdo con nuestras instrucciones.
            </p>
            
            <h2>6. Seguridad de Datos</h2>
            <p>
              Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan, usen o accedan accidentalmente de manera no autorizada, se alteren o divulguen. Además, limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de saber. Solo procesarán sus datos personales según nuestras instrucciones y están sujetos a un deber de confidencialidad.
            </p>
            <p>
              Hemos implementado procedimientos para tratar cualquier sospecha de violación de datos personales y le notificaremos a usted y a cualquier regulador aplicable de una violación donde estamos legalmente obligados a hacerlo.
            </p>
            
            <h2>7. Retención de Datos</h2>
            <p>
              Solo conservaremos sus datos personales durante el tiempo que sea necesario para cumplir con los fines para los que los recopilamos, incluso para satisfacer cualquier requisito legal, contable o de informes.
            </p>
            <p>
              Para determinar el período de retención apropiado para los datos personales, consideramos la cantidad, naturaleza y sensibilidad de los datos personales, el riesgo potencial de daño por uso o divulgación no autorizados de sus datos personales, los fines para los cuales procesamos sus datos personales y si podemos lograr esos fines a través de otros medios, y los requisitos legales aplicables.
            </p>
            
            <h2>8. Sus Derechos Legales</h2>
            <p>
              Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación con sus datos personales:
            </p>
            <ul>
              <li>Solicitar acceso a sus datos personales.</li>
              <li>Solicitar la corrección de sus datos personales.</li>
              <li>Solicitar la eliminación de sus datos personales.</li>
              <li>Oponerse al procesamiento de sus datos personales.</li>
              <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
              <li>Solicitar la transferencia de sus datos personales.</li>
              <li>Derecho a retirar el consentimiento.</li>
            </ul>
            <p>
              Si desea ejercer cualquiera de los derechos establecidos anteriormente, contáctenos.
            </p>
            
            <h2>9. Cookies</h2>
            <p>
              Puede configurar su navegador para rechazar todas o algunas cookies del navegador, o para alertarlo cuando los sitios web configuran o acceden a cookies. Si deshabilita o rechaza las cookies, tenga en cuenta que algunas partes de este sitio web pueden volverse inaccesibles o no funcionar correctamente.
            </p>
            
            <h2>10. Cambios a la Política de Privacidad</h2>
            <p>
              Cualquier cambio que podamos hacer a nuestra política de privacidad en el futuro se publicará en esta página. 
              Por favor, revise esta página con frecuencia para ver si hay actualizaciones o cambios en nuestra política de privacidad.
            </p>
            
            <h2>11. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en:
            </p>
            <ul>
              <li>Email: privacidad@crepesandcoffee.com</li>
              <li>Teléfono: +57 300 123 4567</li>
              <li>Dirección: Calle Principal #123, Bogotá, Colombia</li>
            </ul>
          </div>
          
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <Link to="/terminos-condiciones" className="text-amber-600 hover:text-amber-800 font-medium">
                <i className="fas fa-arrow-left mr-2"></i> Términos y Condiciones
              </Link>
              <Link to="/" className="text-amber-600 hover:text-amber-800 font-medium">
                Volver al inicio <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;