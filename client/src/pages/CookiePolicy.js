import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="border-b border-gray-200 pb-5 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Política de Cookies</h1>
            <p className="mt-2 text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-amber max-w-none">
            <h2>1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o móvil) 
              cuando visita un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen, 
              o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
            </p>
            
            <h2>2. ¿Cómo utilizamos las cookies?</h2>
            <p>
              Utilizamos cookies por varias razones que se detallan a continuación. Desafortunadamente, en la mayoría de los casos, 
              no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar por completo la funcionalidad 
              y características que agregan a este sitio. Se recomienda que deje activadas todas las cookies si no está seguro de si las 
              necesita o no, en caso de que se utilicen para proporcionar un servicio que usted utiliza.
            </p>
            
            <h2>3. Tipos de cookies que utilizamos</h2>
            
            <h3>3.1. Cookies estrictamente necesarias</h3>
            <p>
              Estas cookies son necesarias para el funcionamiento del sitio web y no pueden ser desactivadas en nuestros sistemas. 
              Generalmente solo se establecen en respuesta a acciones realizadas por usted que equivalen a una solicitud de servicios, 
              como establecer sus preferencias de privacidad, iniciar sesión o completar formularios. Puede configurar su navegador 
              para bloquear o alertar sobre estas cookies, pero algunas partes del sitio no funcionarán correctamente.
            </p>
            
            <h3>3.2. Cookies de rendimiento</h3>
            <p>
              Estas cookies nos permiten contar las visitas y fuentes de tráfico para que podamos medir y mejorar el rendimiento de 
              nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares y ver cómo los visitantes se mueven por el sitio. 
              Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima. Si no permite estas cookies, no sabremos 
              cuándo ha visitado nuestro sitio.
            </p>
            
            <h3>3.3. Cookies de funcionalidad</h3>
            <p>
              Estas cookies permiten que el sitio proporcione una funcionalidad y personalización mejoradas. Pueden ser establecidas por 
              nosotros o por proveedores externos cuyos servicios hemos agregado a nuestras páginas. Si no permite estas cookies, 
              algunos o todos estos servicios pueden no funcionar correctamente.
            </p>
            
            <h3>3.4. Cookies de publicidad</h3>
            <p>
              Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas 
              por esas empresas para construir un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios. No almacenan 
              directamente información personal, sino que se basan en la identificación única de su navegador y dispositivo de Internet. 
              Si no permite estas cookies, experimentará publicidad menos dirigida.
            </p>
            
            <h2>4. Control de cookies</h2>
            <p>
              Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su dispositivo y 
              puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que 
              tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y algunos servicios y funcionalidades 
              pueden no funcionar.
            </p>
            
            <h3>4.1. Cómo deshabilitar las cookies en los principales navegadores</h3>
            <ul>
              <li>
                <strong>Google Chrome:</strong> Configuración &gt; Mostrar opciones avanzadas &gt; Privacidad &gt; Configuración de contenido &gt; Cookies &gt; Bloquear los datos de sitios y las cookies de terceros
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad &gt; Historial &gt; Usar configuración personalizada para el historial &gt; Desmarcar Aceptar cookies de sitios
              </li>
              <li>
                <strong>Internet Explorer:</strong> Herramientas &gt; Opciones de Internet &gt; Privacidad &gt; Configuración &gt; Mover el control deslizante hacia arriba para bloquear todas las cookies o hacia abajo para permitir todas las cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies y datos de sitios web &gt; Bloquear siempre
              </li>
              <li>
                <strong>Edge:</strong> Configuración &gt; Configuración avanzada &gt; Cookies &gt; Bloquear todas las cookies
              </li>
            </ul>
            
            <h2>5. Cookies de terceros</h2>
            <p>
              En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección 
              detalla qué cookies de terceros puede encontrar a través de este sitio.
            </p>
            <ul>
              <li>
                Este sitio utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y confiables en la web, 
                para ayudarnos a comprender cómo usa el sitio y las formas en que podemos mejorar su experiencia. Estas cookies pueden 
                rastrear cosas como cuánto tiempo pasa en el sitio y las páginas que visita para que podamos continuar produciendo 
                contenido atractivo.
              </li>
              <li>
                También utilizamos cookies de redes sociales para permitirle compartir contenido directamente en las plataformas de 
                redes sociales. Las cookies que utilizan estas plataformas se establecen solo cuando usted elige compartir contenido 
                y acepta sus términos y condiciones.
              </li>
              <li>
                Utilizamos cookies de proveedores de servicios de pago para procesar transacciones seguras cuando realiza un pedido 
                en nuestro sitio.
              </li>
            </ul>
            
            <h2>6. Más información</h2>
            <p>
              Esperamos que esto haya aclarado las cosas para usted y, como se mencionó anteriormente, si hay algo que no está seguro 
              de si necesita o no, generalmente es más seguro dejar las cookies habilitadas en caso de que interactúen con una de las 
              funciones que utiliza en nuestro sitio.
            </p>
            <p>
              Sin embargo, si todavía está buscando más información, puede contactarnos a través de uno de nuestros métodos de contacto preferidos:
            </p>
            <ul>
              <li>Email: privacidad@crepesandcoffee.com</li>
              <li>Teléfono: +57 300 123 4567</li>
            </ul>
          </div>
          
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <Link to="/politica-privacidad" className="text-amber-600 hover:text-amber-800 font-medium">
                <i className="fas fa-arrow-left mr-2"></i> Política de Privacidad
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

export default CookiePolicy;