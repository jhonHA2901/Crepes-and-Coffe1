import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="border-b border-gray-200 pb-5 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
            <p className="mt-2 text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-amber max-w-none">
            <h2>1. Introducción</h2>
            <p>
              Bienvenido a Crepes & Coffee. Estos Términos y Condiciones rigen el uso de nuestro sitio web y servicios. 
              Al acceder o utilizar nuestro sitio, usted acepta estar sujeto a estos términos. Si no está de acuerdo con 
              alguna parte de estos términos, no podrá acceder al sitio web ni utilizar nuestros servicios.
            </p>
            
            <h2>2. Definiciones</h2>
            <ul>
              <li><strong>"Sitio"</strong> se refiere a Crepes & Coffee, accesible desde www.crepesandcoffee.com</li>
              <li><strong>"Servicio"</strong> se refiere a nuestro sitio web y los servicios de pedidos en línea que ofrecemos.</li>
              <li><strong>"Usuario"</strong>, "Usted" y "Su" se refiere a la persona que accede o utiliza el Servicio.</li>
              <li><strong>"Nosotros"</strong>, "Nos" y "Nuestro" se refiere a Crepes & Coffee.</li>
              <li><strong>"Contenido"</strong> se refiere a texto, imágenes, videos, audio y datos que pueden ser creados, cargados, publicados o distribuidos en el Sitio.</li>
            </ul>
            
            <h2>3. Uso del Servicio</h2>
            <p>
              Nuestro servicio permite a los usuarios realizar pedidos de alimentos y bebidas para recoger en nuestra ubicación física. 
              Al utilizar nuestro servicio, usted declara y garantiza que:
            </p>
            <ul>
              <li>Tiene al menos 18 años de edad o está accediendo al Servicio bajo la supervisión de un padre o tutor legal.</li>
              <li>Proporcionará información precisa, actualizada y completa durante el proceso de registro y pedido.</li>
              <li>Mantendrá y actualizará rápidamente su información para mantenerla precisa, actualizada y completa.</li>
              <li>Es responsable de mantener la confidencialidad de su cuenta y contraseña.</li>
              <li>Es responsable de todas las actividades que ocurran bajo su cuenta.</li>
            </ul>
            
            <h2>4. Pedidos y Pagos</h2>
            <p>
              Al realizar un pedido a través de nuestro Servicio, usted acepta proporcionar información de pago actual, completa y precisa. 
              Nos reservamos el derecho de rechazar o cancelar su pedido en cualquier momento por razones que incluyen, pero no se limitan a:
            </p>
            <ul>
              <li>Disponibilidad del producto</li>
              <li>Errores en la descripción o precio del producto</li>
              <li>Errores en su pedido</li>
              <li>Sospecha de fraude o actividad ilegal</li>
            </ul>
            <p>
              Los precios de nuestros productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar 
              o descontinuar el Servicio sin previo aviso en cualquier momento.
            </p>
            
            <h2>5. Política de Cancelación y Reembolso</h2>
            <p>
              Una vez confirmado un pedido, puede ser cancelado dentro de los primeros 5 minutos después de realizarlo. 
              Después de este período, no podemos garantizar la cancelación ya que el pedido puede haber entrado en preparación.
            </p>
            <p>
              Los reembolsos se procesarán en los siguientes casos:
            </p>
            <ul>
              <li>Cancelación dentro del período permitido</li>
              <li>Productos no disponibles que no pudieron ser sustituidos</li>
              <li>Error demostrable en la preparación del pedido</li>
            </ul>
            <p>
              Los reembolsos se procesarán utilizando el mismo método de pago utilizado para la compra original.
            </p>
            
            <h2>6. Cuenta de Usuario</h2>
            <p>
              Para acceder a ciertas funciones del Servicio, es posible que deba registrarse para obtener una cuenta. 
              Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y acepta la responsabilidad 
              de todas las actividades que ocurran bajo su cuenta.
            </p>
            
            <h2>7. Propiedad Intelectual</h2>
            <p>
              El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva 
              de Crepes & Coffee y sus licenciantes. El Servicio está protegido por derechos de autor, marcas comerciales y 
              otras leyes de propiedad intelectual. Nuestras marcas comerciales y imagen comercial no pueden ser utilizadas 
              en relación con ningún producto o servicio sin el consentimiento previo por escrito de Crepes & Coffee.
            </p>
            
            <h2>8. Enlaces a Otros Sitios Web</h2>
            <p>
              Nuestro Servicio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Crepes & Coffee. 
              Crepes & Coffee no tiene control ni asume ninguna responsabilidad por el contenido, políticas de privacidad o prácticas 
              de sitios web de terceros. Además, reconoce y acepta que Crepes & Coffee no será responsable, directa o indirectamente, 
              por cualquier daño o pérdida causados o supuestamente causados por o en conexión con el uso o la confianza en dicho contenido, 
              bienes o servicios disponibles en o a través de dichos sitios web.
            </p>
            
            <h2>9. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso Crepes & Coffee, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables 
              por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, pérdida de beneficios, 
              datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de (i) su acceso o uso o incapacidad para acceder o usar el 
              Servicio; (ii) cualquier conducta o contenido de terceros en el Servicio; (iii) cualquier contenido obtenido del Servicio; y (iv) 
              acceso no autorizado, uso o alteración de sus transmisiones o contenido, ya sea basado en garantía, contrato, agravio (incluyendo 
              negligencia) o cualquier otra teoría legal, ya sea que hayamos sido informados o no de la posibilidad de tal daño.
            </p>
            
            <h2>10. Indemnización</h2>
            <p>
              Usted acepta defender, indemnizar y mantener indemne a Crepes & Coffee, sus afiliados, licenciantes y proveedores de servicios, 
              y sus respectivos funcionarios, directores, empleados, contratistas, agentes, licenciantes, proveedores, sucesores y cesionarios 
              de y contra cualquier reclamación, responsabilidad, daño, juicio, premio, pérdida, costo, gasto o tarifa (incluyendo honorarios 
              razonables de abogados) que surjan de o estén relacionados con su violación de estos Términos y Condiciones.
            </p>
            
            <h2>11. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de Colombia, sin tener en cuenta sus disposiciones sobre 
              conflictos de leyes.
            </p>
            
            <h2>12. Cambios a los Términos y Condiciones</h2>
            <p>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. 
              Si una revisión es material, proporcionaremos un aviso de al menos 30 días antes de que los nuevos términos entren en vigor. 
              Lo que constituye un cambio material será determinado a nuestra sola discreción.
            </p>
            
            <h2>13. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos en:
            </p>
            <ul>
              <li>Email: info@crepesandcoffee.com</li>
              <li>Teléfono: +57 300 123 4567</li>
              <li>Dirección: Calle Principal #123, Bogotá, Colombia</li>
            </ul>
          </div>
          
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-amber-600 hover:text-amber-800 font-medium">
                <i className="fas fa-arrow-left mr-2"></i> Volver al inicio
              </Link>
              <Link to="/politica-privacidad" className="text-amber-600 hover:text-amber-800 font-medium">
                Política de Privacidad <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;